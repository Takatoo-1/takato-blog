---
author: Sat Naing
pubDatetime: 2022-09-23T15:22:00Z
modDatetime: 2025-06-13T16:52:45.934Z
title: 在 AstroPaper 主题中添加新文章
slug: adding-new-posts-in-astropaper-theme
featured: true
draft: false
tags:
  - docs
description: 使用 AstroPaper 主题创建或添加新文章的一些规则和建议。
---

以下是在 AstroPaper 博客主题中创建新文章的一些规则/建议、提示和技巧。

<figure>
  <img
    src="https://images.pexels.com/photos/159618/still-life-school-retro-ink-159618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    alt="Free Classic wooden desk with writing materials, vintage clock, and a leather bag. Stock Photo"
  />
    <figcaption class="text-center">
    Photo by <a href="https://www.pexels.com/photo/brown-wooden-desk-159618/">Pixabay</a>
  </figcaption>
</figure>

## 目录

## 创建博客文章

要编写新的博客文章，请在 `src/data/blog/` 目录内创建一个 markdown 文件。

> 在 AstroPaper v5.1.0 之前，所有博客文章都必须在 `src/data/blog/` 中，这意味着您无法将它们组织到子目录中。

从 AstroPaper v5.1.0 开始，您现在可以将博客文章组织到子目录中，使内容管理更加容易。

例如，如果您想将文章分组到 `2025` 下，可以将它们放在 `src/data/blog/2025/` 中。这也会影响文章 URL，因此 `src/data/blog/2025/example-post.md` 将在 `/posts/2025/example-post` 可用。

如果您不希望子目录影响文章 URL，只需在文件夹名称前加下划线 `_`。

```bash
# 示例：博客文章结构和 URL
src/data/blog/very-first-post.md          -> mysite.com/posts/very-first-post
src/data/blog/2025/example-post.md        -> mysite.com/posts/2025/example-post
src/data/blog/_2026/another-post.md       -> mysite.com/posts/another-post
src/data/blog/docs/_legacy/how-to.md      -> mysite.com/posts/docs/how-to
src/data/blog/Example Dir/Dummy Post.md   -> mysite.com/posts/example-dir/dummy-post
```

> 💡 提示：您也可以在 frontmatter 中覆盖博客文章的 slug。有关更多详细信息，请参阅下一节。

如果子目录 URL 没有出现在构建输出中，请删除 node_modules，重新安装包，然后重新构建。

## Frontmatter

Frontmatter 是存储博客文章（文章）一些重要信息的主要位置。Frontmatter 位于文章顶部，以 YAML 格式编写。有关 frontmatter 及其用法的更多信息，请参阅 [astro 文档](https://docs.astro.build/en/guides/markdown-content/)。

以下是每篇文章的 frontmatter 属性列表。

| 属性               | 描述                                                                                         | 备注                                       |
| ------------------ | -------------------------------------------------------------------------------------------- | ------------------------------------------ |
| **_title_**        | 文章标题 (h1)                                                                                | 必需<sup>\*</sup>                          |
| **_description_**  | 文章描述。用于文章摘要和文章站点描述。                                                       | 必需<sup>\*</sup>                          |
| **_pubDatetime_**  | 以 ISO 8601 格式发布的日期时间。                                                             | 必需<sup>\*</sup>                          |
| **_modDatetime_**  | 以 ISO 8601 格式修改的日期时间。（仅在修改博客文章时添加此属性）                             | 可选                                       |
| **_author_**       | 文章作者。                                                                                   | 默认 = SITE.author                         |
| **_slug_**         | 文章的 slug。此字段是可选的。                                                                | 默认 = 文件名 slug 化                      |
| **_featured_**     | 是否在首页的精选部分显示此文章                                                               | 默认 = false                               |
| **_draft_**        | 将此文章标记为"未发布"。                                                                     | 默认 = false                               |
| **_tags_**         | 此文章的相关关键词。以数组 yaml 格式编写。                                                   | 默认 = others                              |
| **_ogImage_**      | 文章的 OG 图片。对社交媒体分享和 SEO 很有用。这可以是远程 URL 或相对于当前文件夹的图片路径。 | 默认 = `SITE.ogImage` 或生成的 OG 图片     |
| **_canonicalURL_** | 规范 URL（绝对路径），以防文章已存在于其他来源。                                             | 默认 = `Astro.site` + `Astro.url.pathname` |
| **_hideEditPost_** | 隐藏博客标题下的编辑按钮。这仅适用于当前博客文章。                                           | 默认 = false                               |
| **_timezone_**     | 为当前博客文章指定 IANA 格式的时区。这将覆盖当前博客文章的 `SITE.timezone` 配置。            | 默认 = `SITE.timezone`                     |

> 提示！您可以通过在控制台中运行 `new Date().toISOString()` 来获取 ISO 8601 日期时间。但请确保删除引号。

frontmatter 中必须指定 `title`、`description` 和 `pubDatetime` 字段。

标题和描述（摘要）对搜索引擎优化（SEO）很重要，因此 AstroPaper 鼓励在博客文章中包含这些内容。

`slug` 是 URL 的唯一标识符。因此，`slug` 必须是唯一的，并且与其他文章不同。`slug` 的空格应该用 `-` 或 `_` 分隔，但建议使用 `-`。Slug 是使用博客文章文件名自动生成的。但是，您可以在博客文章的 frontmatter 中定义您的 `slug`。

例如，如果博客文件名是 `adding-new-post.md` 并且您没有在 frontmatter 中指定 slug，Astro 将使用文件名自动为博客文章创建 slug。因此，slug 将是 `adding-new-post`。但如果您在 frontmatter 中指定了 `slug`，这将覆盖默认 slug。您可以在 [Astro 文档](https://docs.astro.build/en/guides/content-collections/#defining-custom-slugs) 中了解更多信息。

如果您在博客文章中省略 `tags`（换句话说，如果未指定标签），默认标签 `others` 将用作该文章的标签。您可以在 `content.config.ts` 文件中设置默认标签。

```ts file="src/content.config.ts"
export const blogSchema = z.object({
  // ...
  draft: z.boolean().optional(),
  // [!code highlight:1]
  tags: z.array(z.string()).default(["others"]), // 将 "others" 替换为您想要的任何内容
  // ...
});
```

### Frontmatter 示例

以下是文章的 frontmatter 示例。

```yaml file="src/data/blog/sample-post.md"
---
title: 文章标题
author: 您的名字
pubDatetime: 2022-09-21T05:17:19Z
slug: the-title-of-the-post
featured: true
draft: false
tags:
  - some
  - example
  - tags
ogImage: ../../assets/images/example.png # src/assets/images/example.png
# ogImage: "https://example.org/remote-image.png" # 远程 URL
description: 这是示例文章的示例描述。
canonicalURL: https://example.org/my-article-was-already-posted-here
---
```

## 添加目录

默认情况下，文章（文章）不包含任何目录（toc）。要包含目录，您必须以特定方式指定它。

以 h2 格式（markdown 中的 ##）编写 `Table of contents`，并将其放在您希望它在文章中出现的位置。

例如，如果您想将目录放在介绍段落下方（就像我通常做的那样），可以按以下方式操作。

<!-- prettier-ignore-start -->
```md
---
# frontmatter
---

以下是在 AstroPaper 博客主题中创建新文章的一些规则/建议、提示和技巧。

<!-- [!code ++] -->
## 目录

<!-- the rest of the post -->
```
<!-- prettier-ignore-end -->

## 标题

关于标题需要注意一件事。AstroPaper 博客文章使用标题（frontmatter 中的 title）作为文章的主标题。因此，文章中的其余标题应使用 h2 \~ h6。

此规则不是强制性的，但强烈建议用于视觉、无障碍和 SEO 目的。

## 语法高亮

AstroPaper 使用 [Shiki](https://shiki.style/) 作为默认语法高亮。从 AstroPaper v5.4 开始，使用 [@shikijs/transformers](https://shiki.style/packages/transformers) 来增强更好的代码块。如果您不想使用它，可以像这样简单地删除它

```bash
pnpm remove @shikijs/transformers
```

```js file="astro.config.ts"
// ...
// [!code --:5]
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default defineConfig({
  // ...
  markdown: {
    remarkPlugins: [remarkToc, [remarkCollapse, { test: "Table of contents" }]],
    shikiConfig: {
      // 更多主题，请访问 https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName(),
      // [!code --:3]
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  // ...
}
```

## 存储博客内容的图片

以下是在 markdown 文件中存储和显示图片的两种方法。

> 注意！如果需要在 markdown 中设置优化图片的样式，您应该[使用 MDX](https://docs.astro.build/en/guides/images/#images-in-mdx-files)。

### 在 `src/assets/` 目录内（推荐）

您可以将图片存储在 `src/assets/` 目录内。这些图片将通过 [Image Service API](https://docs.astro.build/en/reference/image-service-reference/) 由 Astro 自动优化。

您可以使用相对路径或别名路径（`@/assets/`）来提供这些图片。

示例：假设您想显示路径为 `/src/assets/images/example.jpg` 的 `example.jpg`。

```md
![something](@/assets/images/example.jpg)

<!-- OR -->

![something](../../assets/images/example.jpg)

<!-- Using img tag or Image component won't work ❌ -->
<img src="@/assets/images/example.jpg" alt="something">
<!-- ^^ This is wrong -->
```

> 从技术上讲，您可以将图片存储在 `src` 下的任何目录中。在这里，`src/assets` 只是一个建议。

### 在 `public` 目录内

您可以将图片存储在 `public` 目录内。请记住，存储在 `public` 目录中的图片不会被 Astro 处理，这意味着它们不会被优化，您需要自己处理图片优化。

对于这些图片，您应该使用绝对路径；这些图片可以使用 [markdown 注释](https://www.markdownguide.org/basic-syntax/#images-1) 或 [HTML img 标签](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) 显示。

示例：假设 `example.jpg` 位于 `/public/assets/images/example.jpg`。

```md
![something](/assets/images/example.jpg)

<!-- OR -->

<img src="/assets/images/example.jpg" alt="something">
```

## 额外提示

### 图片压缩

当您在博客文章中添加图片时（特别是 `public` 目录下的图片），建议压缩图片。这将影响网站的整体性能。

我推荐的图片压缩网站。

- [TinyPng](https://tinypng.com/)
- [TinyJPG](https://tinyjpg.com/)

### OG 图片

如果文章未指定 OG 图片，将使用默认 OG 图片。虽然不是必需的，但应在 frontmatter 中指定与文章相关的 OG 图片。OG 图片的推荐尺寸为 **_1200 X 640_** 像素。

> 自 AstroPaper v1.4.0 起，如果未指定，OG 图片将自动生成。查看[公告](https://astro-paper.pages.dev/posts/dynamic-og-image-generation-in-astropaper-blog-posts/)。
