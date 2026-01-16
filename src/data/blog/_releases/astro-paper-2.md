---
author: Sat Naing
pubDatetime: 2023-01-30T15:57:52.737Z
title: AstroPaper 2.0
slug: astro-paper-2
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - release
description: 具有 Astro v2 增强功能的 AstroPaper。类型安全的 markdown 内容、错误修复和更好的开发体验等。
---

Astro 2.0 已经发布，带来了一些很酷的功能、破坏性更改、DX 改进、更好的错误覆盖等。AstroPaper 利用了这些很酷的功能，特别是内容集合 API。

<!-- ![Introducing AstroPaper 2.0](https://user-images.githubusercontent.com/53733092/215683840-dc2502f5-8c5a-44f0-a26c-4e7180455056.png) -->

![Introducing AstroPaper 2.0](https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png)

## 目录

## Features & Changes

### Type-safe Frontmatters and Redefined Blog Schema

Frontmatter of AstroPaper 2.0 markdown contents are now type-safe thanks to Astro’s Content Collections. Blog schema is defined inside the `src/content/_schemas.ts` file.

### New Home for Blog contents

All the blog posts were moved from `src/contents` to `src/content/blog` directory.

### New Fetch API

Contents are now fetched with `getCollection` function. No relative path to the content needs to be specified anymore.

```ts
// old content fetching method
- const postImportResult = import.meta.glob<MarkdownInstance<Frontmatter>>(
  "../contents/**/**/*.md",);

// new content fetching method
+ const postImportResult = await getCollection("blog");
```

### 修改搜索逻辑以获得更好的搜索结果

在旧版本的 AstroPaper 中，当有人搜索某些文章时，将搜索的搜索条件键是 `title`、`description` 和 `headings`（标题意味着博客文章的所有标题 h1 ~ h6）。在 AstroPaper v2 中，当用户输入时，只会搜索 `title` 和 `description`。

### 重命名的 Frontmatter 属性

以下 frontmatter 属性已重命名。

| 旧名称   | 新名称      |
| -------- | ----------- |
| datetime | pubDatetime |
| slug     | postSlug    |

### 博客文章的默认标签

如果博客文章没有任何标签（换句话说，未指定 frontmatter 属性 `tags`），该博客文章将使用默认标签 `others`。但您可以在 `/src/content/_schemas.ts` 文件中设置默认标签。

```ts
// src/contents/_schemas.ts
export const blogSchema = z.object({
  // ---
  // replace "others" with whatever you want
  tags: z.array(z.string()).default(["others"]),
  ogImage: z.string().optional(),
  description: z.string(),
});
```

### 新的预定义深色配色方案

AstroPaper v2 有一个新的深色配色方案（高对比度和低对比度），它基于 Astro 的深色 logo。查看[此链接](https://astro-paper.pages.dev/posts/predefined-color-schemes#astro-dark)了解更多信息。

![新的预定义深色配色方案](https://user-images.githubusercontent.com/53733092/215680520-59427bb0-f4cb-48c0-bccc-f182a428d72d.svg)

### 自动类排序

AstroPaper 2.0 包含使用 [TailwindCSS Prettier 插件](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier)的自动类排序

### 更新的文档和 README

所有 [#docs](https://astro-paper.pages.dev/tags/docs/) 博客文章和 [README](https://github.com/satnaing/astro-paper#readme) 都已针对此 AstroPaper v2 进行了更新。

## 错误修复

- 修复博客文章页面中损坏的标签
- 在标签页面中，面包屑的最后一部分现在更新为小写以保持一致性
- 在标签页面中排除草稿文章
- 修复页面重新加载后 'onChange 值不更新问题'
