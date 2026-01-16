---
author: Sat Naing
pubDatetime: 2024-01-04T09:30:41.816Z
title: AstroPaper 4.0
slug: "astro-paper-v4"
featured: false
ogImage: ../../../assets/images/AstroPaper-v4.png
tags:
  - release
description: "AstroPaper v4：确保更流畅、功能更丰富的博客体验。"
---

大家好！祝您新年快乐 🎉，2024 年一切顺利！我们很高兴宣布 AstroPaper v4 的发布，这是一个重大更新，引入了许多新功能、改进和错误修复，以提升您的博客体验。非常感谢所有贡献者为版本 4 所做的宝贵贡献和努力！

![AstroPaper v4](@/assets/images/AstroPaper-v4.png)

## 目录

## Major Changes

### Upgrade to Astro v4 [#202](https://github.com/satnaing/astro-paper/pull/202)

AstroPaper now leverages the power and capabilities of Astro v4. However, it’s a subtle upgrade and won’t break most Astro users.

![Astro v4](https://astro.build/_astro/header-astro-4.YunweN9V_OmV0l.webp)

### Replace `postSlug` with Astro Content `slug` [#197](https://github.com/satnaing/astro-paper/pull/197)

The `postSlug` in the blog content schema is no longer available in AstroPaper v4. Initially Astro doesn't have a `slug` mechanism and thus we have to figure it out on our own. Since Astro v3, it supports content collection and slug features. Now, we believe it's time to adopt Astro's out-of-the-box `slug` feature.

**_file: src/content/blog/astro-paper-4.md_**

```bash
---
author: Sat Naing
pubDatetime: 2024-01-01T04:35:33.428Z
title: AstroPaper 4.0
slug: "astro-paper-v4" # if slug is not specified, it will be 'astro-paper-4' (file name).
# slug: "" ❌ cannot be an empty string
---
```

`slug` 的行为现在略有不同。在 AstroPaper 的先前版本中，如果博客文章（markdown 文件）中未指定 `postSlug`，该博客文章的标题将被 slug 化并用作 `slug`。但是，在 AstroPaper v4 中，如果未指定 `slug` 字段，markdown 文件名将用作 `slug`。需要记住的一件事是 `slug` 字段可以省略，但不能是空字符串（slug: "" ❌）。

如果您正在从 v3 升级 AstroPaper 到 v4，请确保将 `src/content/blog/*.md` 文件中的 `postSlug` 替换为 `slug`。

## 新功能

### 添加用于内容创建的代码片段 [#206](https://github.com/satnaing/astro-paper/pull/206)

AstroPaper 现在包含用于新博客文章的 VSCode 片段，消除了手动复制/粘贴 frontmatter 和内容结构（目录、标题、摘要等）的需要。

在此处了解有关 VSCode 片段的更多信息](https://code.visualstudio.com/docs/editor/userdefinedsnippets#:~:text=In%20Visual%20Studio%20Code%2C%20snippets,Snippet%20in%20the%20Command%20Palette)。

<video autoplay muted="muted" controls plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/136f1903-bade-40a2-b6bb-285a3c726350" type="video/mp4">
</video>

### 在博客文章中添加修改日期时间 [#195](https://github.com/satnaing/astro-paper/pull/195)

通过在博客文章中显示修改日期时间，让读者了解最新更新。这不仅增强了用户对文章新鲜度的信任，还有助于改善博客的 SEO。

![AstroPaper 中的最后修改日期功能](https://github.com/satnaing/astro-paper/assets/53733092/cc89585e-148e-444d-9da1-0d496e867175)

如果您进行了修改，可以在博客文章中添加 `modDatetime`。现在，文章的排序行为略有不同。所有文章都按 `pubDatetime` 和 `modDatetime` 排序。如果文章同时具有 `pubDatetime` 和 `modDatetime`，其排序位置将由 `modDatetime` 确定。如果没有，则仅考虑 `pubDatetime` 来确定文章的排序顺序。

### 实现返回顶部按钮 [#188](https://github.com/satnaing/astro-paper/pull/188)

使用新实现的返回顶部按钮增强博客详细文章的用户导航。

![AstroPaper 中的返回顶部按钮](https://github.com/satnaing/astro-paper/assets/53733092/79854957-7877-4f19-936e-ad994b772074)

### 在标签文章中添加分页 [#201](https://github.com/satnaing/astro-paper/pull/201)

通过在标签文章中添加分页来改善内容组织和导航，使用户更容易浏览相关内容。这确保了如果标签有很多文章，读者不会被所有与标签相关的文章所淹没。

<video autoplay loop="loop" muted="muted" plays-inline="true" class="border border-skin-line">
  <source src="https://github.com/satnaing/astro-paper/assets/53733092/9bad87f5-dcf5-4b79-b67a-d6c7244cd616" type="video/mp4">
</video>

### 动态生成 robots.txt [#130](https://github.com/satnaing/astro-paper/pull/130)

AstroPaper v4 现在动态生成 robots.txt 文件，让您更好地控制搜索引擎索引和网络爬虫。此外，站点地图 URL 也将添加到 `robot.txt` 文件中。

### 添加 Docker-Compose 文件 [#174](https://github.com/satnaing/astro-paper/pull/174)

通过添加 Docker-Compose 文件，管理您的 AstroPaper 环境现在比以往任何时候都更容易，简化了部署和配置。

## 重构和错误修复

### 用非 Slug 化的标签名称替换 Slug 化的标题 [#198](https://github.com/satnaing/astro-paper/pull/198)

为了提高清晰度、用户体验和 SEO，标签页面中的标题（`Tag: some-tag`）不再被 slug 化（`Tag: Some Tag`）。

![非 Slug 化的标签名称](https://github.com/satnaing/astro-paper/assets/53733092/2fe90d6e-ec52-467b-9c44-95009b3ae0b7)

### 实现 100svh 最小高度 ([79d569d](https://github.com/satnaing/astro-paper/commit/79d569d053036f2113519f41b0d257523d035b76))

我们已将 body 上的最小高度更新为使用 100svh，为移动用户提供更好的 UX。

### 将站点 URL 更新为单一事实来源 [#143](https://github.com/satnaing/astro-paper/pull/143)

站点 URL 现在是单一事实来源，简化了配置并避免不一致。在此 [PR](https://github.com/satnaing/astro-paper/pull/143) 及其相关问题中了解更多信息。

### 解决浅色模式中不可见文本代码块问题 [#163](https://github.com/satnaing/astro-paper/pull/163)

我们已修复浅色模式中不可见文本代码块的问题。

### 在面包屑中解码 Unicode 标签字符 [#175](https://github.com/satnaing/astro-paper/pull/175)

面包屑中标签的最后一部分现在已解码，使非英语 Unicode 字符显示得更好。

### 更新 LOCALE 配置以覆盖所有区域设置 ([cd02b04](https://github.com/satnaing/astro-paper/commit/cd02b047d2b5e3b4a2940c0ff30568cdebcec0b8))

LOCALE 配置已更新以覆盖更广泛的区域设置，满足更多样化的受众。

## 结语

我们相信这些更新将显著提升您的 AstroPaper 体验。感谢所有贡献、解决问题并为 AstroPaper 加星的人。我们期待看到您使用 AstroPaper v4 创建的精彩内容！

祝您博客愉快！

[Sat Naing](https://satnaing.dev) <br/>
AstroPaper 的创建者
