---
author: Sat Naing
pubDatetime: 2022-09-25T15:20:35Z
modDatetime: 2026-01-09T15:00:15.170Z
title: 自定义 AstroPaper 主题配色方案
featured: false
draft: false
tags:
  - color-schemes
  - docs
description: 如何启用/禁用明暗模式；以及自定义 AstroPaper 主题的配色方案。
---

这篇文章将解释如何为网站启用/禁用明暗模式。此外，您还将学习如何自定义整个网站的配色方案。

## 目录

## 启用/禁用明暗模式

AstroPaper 主题默认包含明暗模式。换句话说，将有两个配色方案\_一个用于浅色模式，另一个用于深色模式。可以在 `SITE` 配置对象中禁用此默认行为。

```js file="src/config.ts"
export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Sat Naing",
  profile: "https://satnaing.dev/",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "AstroPaper",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true, // [!code highlight]
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/satnaing/astro-paper/edit/main/",
  },
  dynamicOgImage: true,
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
```

要禁用 `明暗模式`，请将 `SITE.lightAndDarkMode` 设置为 `false`。

## 选择初始配色方案

默认情况下，如果我们禁用 `SITE.lightAndDarkMode`，我们只会获得系统的 prefers-color-scheme。

因此，要选择初始配色方案而不是 prefers-color-scheme，我们必须在 `theme.ts` 内的 `initialColorScheme` 变量中设置配色方案。

```ts file="src/scripts/theme.ts"
// 初始配色方案
// 可以是 "light"、"dark"，或空字符串表示系统的 prefers-color-scheme
const initialColorScheme = ""; // "light" | "dark" // [!code hl]

function getPreferTheme(): string {
  // 从本地存储获取主题数据（用户的明确选择）
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme) return currentTheme;

  // 如果设置了初始配色方案，则返回它（站点默认值）
  if (initialColorScheme) return initialColorScheme;

  // 返回用户设备的首选配色方案（系统后备）
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// ...
```

**initialColorScheme** 变量可以保存两个值\_ `"light"`、`"dark"`。如果您不想指定初始配色方案，可以保留空字符串（默认值）。

- `""` - 系统的 prefers-color-scheme。（默认）
- `"light"` - 使用浅色模式作为初始配色方案。
- `"dark"` - 使用深色模式作为初始配色方案。

<details>
<summary>为什么 initialColorScheme 不在 config.ts 中？</summary>
为了避免页面重新加载时的颜色闪烁，我们必须在页面加载时尽可能早地放置主题初始化 JavaScript 代码。主题脚本分为两部分：在 `<head>` 中的最小内联脚本，立即设置主题；以及异步加载的完整脚本。这种方法在保持最佳性能的同时防止 FOUC（无样式内容闪烁）。
</details>

## 自定义配色方案

AstroPaper 主题的浅色和深色配色方案都可以在 `global.css` 文件中自定义。

```css file="src/styles/global.css"
@import "tailwindcss";
@import "./typography.css";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

:root,
html[data-theme="light"] {
  --background: #fdfdfd;
  --foreground: #282728;
  --accent: #006cac;
  --muted: #e6e6e6;
  --border: #ece9e9;
}

html[data-theme="dark"] {
  --background: #212737;
  --foreground: #eaedf3;
  --accent: #ff6b01;
  --muted: #343f60bf;
  --border: #ab4b08;
}
/* ... */
```

在 AstroPaper 主题中，`:root` 和 `html[data-theme="light"]` 选择器定义浅色配色方案，而 `html[data-theme="dark"]` 定义深色配色方案。

要自定义您自己的配色方案，请在 `:root, html[data-theme="light"]` 内指定您的浅色，在 `html[data-theme="dark"]` 内指定您的深色。

以下是颜色属性的详细说明。

| 颜色属性       | 定义和用法                             |
| -------------- | -------------------------------------- |
| `--background` | 网站的主色。通常是主背景。             |
| `--foreground` | 网站的次要颜色。通常是文本颜色。       |
| `--accent`     | 网站的重音色。链接颜色、悬停颜色等。   |
| `--muted`      | 卡片和滚动条背景颜色，用于悬停状态等。 |
| `--border`     | 边框颜色。用于边框工具类和视觉分离     |

以下是更改浅色配色方案的示例。

```css file="src/styles/global.css"
/* ... */
:root,
html[data-theme="light"] {
  --background: #f6eee1;
  --foreground: #012c56;
  --accent: #e14a39;
  --muted: #efd8b0;
  --border: #dc9891;
}
/* ... */
```

> 查看 AstroPaper 已经为您制作的一些[预定义配色方案](https://astro-paper.pages.dev/posts/predefined-color-schemes/)。
