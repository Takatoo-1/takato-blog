---
author: Simon Smale
pubDatetime: 2024-01-03T20:40:08Z
modDatetime: 2024-01-08T18:59:05Z
title: 如何使用 Git Hooks 设置创建和修改日期
featured: false
draft: false
tags:
  - docs
  - FAQ
canonicalURL: https://smale.codes/posts/setting-dates-via-git-hooks/
description: 如何使用 Git Hooks 在 AstroPaper 中设置创建和修改日期
---

在这篇文章中，我将解释如何使用 pre-commit Git hook 来自动化 AstroPaper 博客主题 frontmatter 中创建日期（`pubDatetime`）和修改日期（`modDatetime`）的输入。

## 目录

## 随处可用

[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) 非常适合自动化任务，比如在提交消息中[添加](https://gist.github.com/SSmale/3b380e5bbed3233159fb7031451726ea)或[检查](https://itnext.io/using-git-hooks-to-enforce-branch-naming-policy-ffd81fa01e5e)分支名称，或[阻止您提交纯文本秘密](https://gist.github.com/SSmale/367deee757a9b2e119d241e120249000)。它们最大的缺点是客户端 hooks 是按机器设置的。

您可以通过创建一个 `hooks` 目录并手动将它们复制到 `.git/hooks` 目录或设置符号链接来解决这个问题，但这都需要您记住设置，而这不是我擅长做的事情。

由于这个项目使用 npm，我们能够使用一个名为 [Husky](https://typicode.github.io/husky/) 的包（AstroPaper 中已安装）来自动为我们安装 hooks。

> 更新！在 AstroPaper [v4.3.0](https://github.com/satnaing/astro-paper/releases/tag/v4.3.0) 中，pre-commit hook 已被移除，转而使用 GitHub Actions。但是，您可以轻松地[自己安装 Husky](https://typicode.github.io/husky/get-started.html)。

## Hook

由于我们希望这个 hook 在提交代码时运行以更新日期，然后将其作为我们更改的一部分，我们将使用 `pre-commit` hook。这已经由 AstroPaper 项目设置好了，但如果没有，您可以运行 `npx husky add .husky/pre-commit 'echo "This is our new pre-commit hook"'`。

导航到 `hooks/pre-commit` 文件，我们将添加以下一个或两个代码片段。

### 编辑文件时更新修改日期

---

更新：

此部分已更新为更智能的新版本 hook。它现在不会在文章发布之前增加 `modDatetime`。在首次发布时，将草稿状态设置为 `first`，然后见证奇迹的发生。

---

```shell
# 修改的文件，更新 modDatetime
git diff --cached --name-status |
grep -i '^M.*\.md$' |
while read _ file; do
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
  if [ "$draft" = "false" ]; then
    echo "$file modDateTime updated"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
    mv tmp $file
    git add $file
  fi
  if [ "$draft" = "first" ]; then
    echo "First release of $file, draft set to false and modDateTime removed"
    cat $file | sed "/---.*/,/---.*/s/^modDatetime:.*$/modDatetime:/" | sed "/---.*/,/---.*/s/^draft:.*$/draft: false/" > tmp
    mv tmp $file
    git add $file
  fi
done
```

`git diff --cached --name-status` 从 git 获取已暂存准备提交的文件。输出如下：

```shell
A       src/content/blog/setting-dates-via-git-hooks.md
```

开头的字母表示已执行的操作，在上面的示例中，文件已被添加。修改的文件带有 `M`。

我们将该输出通过管道传递给 grep 命令，查找每一行中被修改的文件。该行需要以 `M` 开头（`^(M)`），之后可以有任意数量的字符（`.*`），并以 `.md` 文件扩展名结尾（`.(md)$`）。这将过滤掉不是修改过的 markdown 文件的行 `egrep -i "^(M).*\.(md)$"`。

---

#### 改进 - 更明确

可以添加此功能，仅在 `blog` 目录中查找 markdown 文件，因为这些是唯一具有正确 frontmatter 的文件。

---

正则表达式将捕获两部分：字母和文件路径。我们将此列表通过管道传递给 while 循环，遍历匹配的行，并将字母分配给 `a`，路径分配给 `b`。我们现在暂时忽略 `a`。

要了解文件的草稿状态，我们需要它的 frontmatter。在以下代码中，我们使用 `cat` 获取文件内容，然后使用 `awk` 在 frontmatter 分隔符（`---`）上拆分文件，并获取第二个块（frontmatter，`---` 之间的部分）。然后我们再次使用 `awk` 查找 draft 键并打印其值。

```shell
  filecontent=$(cat "$file")
  frontmatter=$(echo "$filecontent" | awk -v RS='---' 'NR==2{print}')
  draft=$(echo "$frontmatter" | awk '/^draft: /{print $2}')
```

现在我们有了 `draft` 的值，我们将执行 3 种操作之一：将 modDatetime 设置为现在（当 draft 为 false 时 `if [ "$draft" = "false" ]; then`），清除 modDatetime 并将 draft 设置为 false（当 draft 设置为 first 时 `if [ "$draft" = "first" ]; then`），或者什么都不做（在任何其他情况下）。

带有 sed 命令的下一部分对我来说有点神奇，因为我不经常使用它，它来自[另一篇关于做类似事情的博客文章](https://mademistakes.com/notes/adding-last-modified-timestamps-with-git/)。本质上，它正在文件的前置元数据标签（`---`）内查找 `pubDatetime:` 键，获取整行并用 `pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/"` 再次替换相同的键和正确格式的当前日期时间。

此替换是在整个文件的上下文中进行的，因此我们将其放入临时文件（`> tmp`），然后将新文件移动（`mv`）到旧文件的位置，覆盖它。然后将其添加到 git，准备提交，就像我们自己进行了更改一样。

---

#### 注意

为了使 `sed` 工作，frontmatter 中需要已经具有 `modDatetime` 键。您还需要进行一些其他更改才能使应用程序使用空日期构建，请参阅[下方](#empty-moddatetime-changes)。

---

### 为新文件添加日期

为新文件添加日期的过程与上面相同，但这次我们查找已添加的行（`A`），并将替换 `pubDatetime` 值。

```shell
# 新文件，添加/更新 pubDatetime
git diff --cached --name-status | egrep -i "^(A).*\.(md)$" | while read a b; do
  cat $b | sed "/---.*/,/---.*/s/^pubDatetime:.*$/pubDatetime: $(date -u "+%Y-%m-%dT%H:%M:%SZ")/" > tmp
  mv tmp $b
  git add $b
done
```

---

#### 改进 - 只循环一次

我们可以使用 `a` 变量在循环内切换，并在一个循环中更新 `modDatetime` 或添加 `pubDatetime`。

---

## 填充 frontmatter

如果您的 IDE 支持代码片段，则可以选择创建自定义代码片段来填充 frontmatter。[AstroPaper v4 将默认包含一个 VSCode 的代码片段。](https://github.com/satnaing/astro-paper/pull/206)

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/17761689/e13babbc-2d78-405d-8758-ca31915e41b0" type="video/mp4">
</video>

## 空 `modDatetime` 更改

为了允许 Astro 编译 markdown 并执行其操作，它需要知道 frontmatter 中期望的内容。它通过 `src/content/config.ts` 中的配置来做到这一点。

为了允许键存在但没有值，我们需要编辑第 10 行以添加 `.nullable()` 函数。

```ts
const blog = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      author: z.string().default(SITE.author),
      pubDatetime: z.date(),
      modDatetime: z.date().optional(), // [!code --]
      modDatetime: z.date().optional().nullable(), // [!code ++]
      title: z.string(),
      featured: z.boolean().optional(),
      draft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      ogImage: image().or(z.string()).optional(),
      description: z.string(),
      canonicalURL: z.string().optional(),
      readingTime: z.string().optional(),
    }),
});
```

为了阻止 IDE 在博客引擎文件中报错，我还做了以下操作：

1. 在 `src/layouts/Layout.astro` 的第 15 行添加了 `| null`，使其看起来像这样：

   ```typescript
   export interface Props {
     title?: string;
     author?: string;
     description?: string;
     ogImage?: string;
     canonicalURL?: string;
     pubDatetime?: Date;
     modDatetime?: Date | null;
   }
   ```

2. 在 `src/components/Datetime.tsx` 的第 5 行添加了 `| null`，使其看起来像这样：

   ```typescript
   interface DatetimesProps {
     pubDatetime: string | Date;
     modDatetime: string | Date | undefined | null;
   }
   ```
