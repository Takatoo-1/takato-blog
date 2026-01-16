---
author: Sat Naing
pubDatetime: 2022-12-28T04:59:04.866Z
modDatetime: 2025-03-12T13:39:20.763Z
title: AstroPaper 博客文章中的动态 OG 图片生成
slug: dynamic-og-image-generation-in-astropaper-blog-posts
featured: false
draft: false
tags:
  - docs
  - release
description: AstroPaper v1.4.0 中的新功能，为博客文章引入动态 OG 图片生成。
---

AstroPaper v1.4.0 中的新功能，为博客文章引入动态 OG 图片生成。

## 目录

## 介绍

OG 图片（也称为社交图片）在社交媒体互动中发挥着重要作用。如果您不知道 OG 图片是什么意思，它是在 Facebook、Discord 等社交媒体上分享网站 URL 时显示的图片。

> 用于 Twitter 的社交图片在技术上不称为 OG 图片。但是，在这篇文章中，我将使用术语 OG 图片来指代所有类型的社交图片。

## 默认/静态 OG 图片（旧方式）

AstroPaper 已经提供了一种向博客文章添加 OG 图片的方法。作者可以在 frontmatter `ogImage` 中指定 OG 图片。即使作者没有在 frontmatter 中定义 OG 图片，默认 OG 图片也会用作后备（在这种情况下是 `public/astropaper-og.jpg`）。但问题是默认 OG 图片是静态的，这意味着每个在 frontmatter 中不包含 OG 图片的博客文章将始终使用相同的默认 OG 图片，尽管每篇文章的标题/内容都与其他文章不同。

## 动态 OG 图片

为每篇文章生成动态 OG 图片允许作者避免为每篇博客文章指定 OG 图片。此外，这将防止后备 OG 图片与所有博客文章相同。

在 AstroPaper v1.4.0 中，使用 Vercel 的 [Satori](https://github.com/vercel/satori) 包进行动态 OG 图片生成。

将在构建时为以下博客文章生成动态 OG 图片：

- 在 frontmatter 中不包含 OG 图片
- 未标记为草稿。

## AstroPaper 动态 OG 图片的构成

AstroPaper 的动态 OG 图片包括*博客文章标题*、*作者姓名*和*网站标题*。作者姓名和网站标题将通过 **"src/config.ts"** 文件的 `SITE.author` 和 `SITE.title` 获取。标题从博客文章 frontmatter `title` 生成。  
![动态 OG 图片示例链接](https://user-images.githubusercontent.com/53733092/209704501-e9c2236a-3f4d-4c67-bab3-025aebd63382.png)

### 非拉丁字符问题

带有非拉丁字符的标题开箱即用无法正确显示。要解决此问题，我们必须用您首选的字体替换 `loadGoogleFont.ts` 内的 `fontsConfig`。

```ts file=src/utils/loadGoogleFont.ts
async function loadGoogleFonts(
  text: string
): Promise<
  Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>
> {
  const fontsConfig = [
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP",
      weight: 400,
      style: "normal",
    },
    {
      name: "Noto Sans JP",
      font: "Noto+Sans+JP:wght@700",
      weight: 700,
      style: "normal",
    },
    { name: "Noto Sans", font: "Noto+Sans", weight: 400, style: "normal" },
    {
      name: "Noto Sans",
      font: "Noto+Sans:wght@700",
      weight: 700,
      style: "normal",
    },
  ];
  // ...
}
```

> 查看[此 PR](https://github.com/satnaing/astro-paper/pull/318) 了解更多信息。

## 权衡

虽然这是一个很好的功能，但有一个权衡。每个 OG 图片大约需要一秒钟来生成。这在最初可能不会很明显，但随着博客文章数量的增长，您可能想要禁用此功能。由于每个 OG 图片都需要时间生成，拥有很多图片将线性增加构建时间。

例如：如果一个 OG 图片需要一秒钟生成，那么 60 个图片将需要大约一分钟，600 个图片将需要大约 10 分钟。随着您的内容扩展，这可能会显著影响构建时间。

相关问题：[#428](https://github.com/satnaing/astro-paper/issues/428)

## 限制

在撰写本文时，[Satori](https://github.com/vercel/satori) 还相当新，尚未达到主要版本。因此，此动态 OG 图片功能仍有一些限制。

- 此外，还不支持 RTL 语言。
- 在标题中[使用 emoji](https://github.com/vercel/satori#emojis) 可能有点棘手。
