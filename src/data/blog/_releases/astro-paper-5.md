---
pubDatetime: 2025-03-08T08:18:19.693Z
title: AstroPaper 5.0
slug: astro-paper-v5
featured: true
ogImage: ../../../assets/images/AstroPaper-v5.png
tags:
  - release
description: "AstroPaper v5：保持简洁外观，底层更新。"
---

最后，期待已久的 AstroPaper v5 终于来了。AstroPaper v5 保持了相同的极简和简洁外观，但在底层进行了重大更新。

![AstroPaper v5](@/assets/images/AstroPaper-v5.png)

## 目录

## 重大更改

### 升级到 Astro v5 [#455](https://github.com/satnaing/astro-paper/pull/455)

AstroPaper 现在随附 Astro v5，带来了所有新功能和改进。

### Tailwind v4

AstroPaper 已升级到 Tailwind v4，这在底层包含许多样式更改。`tailwind.config.js` 文件已被删除，现在所有配置都位于 `src/styles/global.css` 文件中。与排版相关的样式已被提取并移动到 `src/styles/typography.css`。

由于 TailwindCSS v4 中的新行为，组件内 `<style>` 块中的样式已被删除，并替换为内联 Tailwind 类。

此外，整个 UI 的调色板已更新。新调色板现在仅包含五种颜色：

```css
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
```

### Remove React + Fuse.js in favor of Pagefind search

In previous versions, React.js and Fuse.js were used for search functionality and OG image generation. In AstroPaper v5, React.js has been removed and replaced with [Pagefind](https://pagefind.app/), a static site search tool.

The search experience is almost identical to previous versions, but now all contents, not just titles and descriptions, are indexed and searchable, thanks to Pagefind.

The idea of using Pagefind in dev mode was inspired by [this blog post](https://chrispennington.blog/blog/pagefind-static-search-for-astro-sites/).

### Updated import alias

The import alias has been updated from `@directory` to `@/directory`, which means you now have to import like this:

```astro
---
import { slugifyStr } from "@/utils/slugify";
import IconHash from "@/assets/icons/IconHash.svg";
---
```

### Move to `pnpm`

AstroPaper has switched from `npm` to `pnpm`, which offers faster and more efficient package management.

### Replace icons/svg with Astro's Svg Component

AstroPaper v5 replaces inline SVGs with Astro’s experimental [SVG Component](https://docs.astro.build/en/reference/experimental-flags/svg/). This update reduces the need for predefined SVG code in the `socialIcons` object, making the codebase cleaner and more maintainable.

### Separate Constants and Config

The project structure has been reorganized. The `src/config.ts` file now only contains the `SITE` object, which holds the main configuration for the project. All constants, such as `LOCALE`, `SOCIALS`, and `SHARE_LINKS`, have been moved to the `src/constants.ts` file.

## Other notable changes

- The blog posts directory has been updated from `src/content/blog/` to `src/data/blog/`.
- Collection definitions file (`src/content/config.ts`) is now replaced with `src/content.config.ts`.
- Various dependencies have been upgraded for improved performance and security.
- Removed `IBM Plex Mono` font and switched to the default system mono font.
- The `Go back` button logic has been updated. Now, instead of triggering the browser's history API, AstroPaper v5 uses the browser session to temporarily store the back URL. If no back URL exists in the session, it will redirect to the homepage.
- There are some minor styles and layout changes as well.

## Outtro

AstroPaper v5 brings many changes, but the core experience remains the same. Enjoy a smoother, more efficient blogging platform while keeping the clean and minimal design that AstroPaper is known for!

Feel free to explore the changes and share your thoughts. As always, thank you for your support!

If you enjoy this theme, please consider starring the repo. You can also support me via GitHub Sponsors or you can buy me a coffee if you'd like. However, of course, these actions are entirely optional and not required.

Enjoy!

[Sat Naing](https://satnaing.dev/)
