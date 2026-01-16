---
title: Astro 快速上手指南
author: Sat Naing
pubDatetime: 2026-01-20T10:00:00Z
slug: astro-quick-start-guide
featured: true
draft: false
tags:
  - docs
  - Astro
  - 教程
description: 专为熟悉 React/Vue/Next/Nuxt 的开发者准备的 Astro 快速上手指南，包含核心概念、项目结构、开发工作流和常见场景。
---

> 专为熟悉 React/Vue/Next/Nuxt 的开发者准备

## Table of contents

## 一、Astro 核心概念（对比你熟悉的框架）

### Astro 是什么？

Astro 是一个**内容优先的静态站点生成器**，类似于 Next.js 的 SSG 模式，但更专注于**零 JavaScript 运行时**。

**核心特点：**

- ✅ **默认零 JS**：默认情况下，组件在构建时渲染为静态 HTML，不发送 JavaScript 到客户端
- ✅ **岛屿架构（Islands）**：需要交互的组件可以"激活"为客户端组件
- ✅ **多框架支持**：可以在同一个项目中混用 React、Vue、Svelte 等
- ✅ **文件路由**：类似 Next.js/Nuxt，基于文件系统路由

### 与 Next.js/Nuxt 的对比

| 特性      | Next.js  | Nuxt     | Astro              |
| --------- | -------- | -------- | ------------------ |
| 默认渲染  | SSR/SSG  | SSR/SSG  | **静态 HTML**      |
| 客户端 JS | 默认发送 | 默认发送 | **默认不发送**     |
| 框架支持  | React    | Vue      | **所有框架**       |
| 性能      | 快       | 快       | **极快**（零 JS）  |
| 适用场景  | 全栈应用 | 全栈应用 | **内容网站、博客** |

### Astro 组件语法

Astro 组件使用 `.astro` 扩展名，语法类似 JSX，但更简单：

```astro
---
// 组件脚本部分（类似 Vue 的 <script>）
// 只在构建时运行，不会发送到客户端
const name = "Astro";
const items = [1, 2, 3];
---

<!-- 模板部分（类似 Vue 的 <template>） -->
<div>
  <h1>Hello {name}!</h1>
  <ul>
    {items.map(item => <li>{item}</li>)}
  </ul>
</div>

<style>
  /* 样式部分（类似 Vue 的 <style>） */
  /* 默认是 scoped 的 */
  h1 {
    color: blue;
  }
</style>
```

**关键点：**

- `---` 分隔符内是**组件脚本**（构建时执行）
- 模板部分使用类似 JSX 的语法
- 样式默认是**作用域**的（类似 Vue scoped）

### 客户端组件（Client Components）

如果需要交互性，使用 `client:*` 指令：

```astro
---
import MyReactComponent from "./MyReactComponent.jsx";
---

<!-- 默认：不发送 JS -->
<MyReactComponent />

<!-- 激活为客户端组件 -->
<MyReactComponent client:load />
<!-- 立即加载 -->
<MyReactComponent client:idle />
<!-- 浏览器空闲时加载 -->
<MyReactComponent client:visible />
<!-- 进入视口时加载 -->
<MyReactComponent client:only="react" />
<!-- 仅客户端渲染 -->
```

**类比 Next.js：**

- `client:load` ≈ 普通 React 组件
- `client:idle` ≈ Next.js 的 `dynamic(..., { ssr: false })`
- `client:visible` ≈ 懒加载组件

---

## 二、项目结构详解

### 根目录文件

```
takato-blog/
├── astro.config.ts          # Astro 配置文件（类似 next.config.js）
├── package.json              # 项目依赖
├── tsconfig.json            # TypeScript 配置
├── public/                   # 静态资源（直接复制到 dist/）
└── src/                      # 源代码目录
```

### `astro.config.ts` - 核心配置文件

```typescript
export default defineConfig({
  site: SITE.website,              // 部署域名
  integrations: [                 // 集成插件（类似 Next.js 插件）
    sitemap(),                     // 自动生成 sitemap
  ],
  markdown: {                     // Markdown 配置
    remarkPlugins: [...],          // Markdown 插件
    shikiConfig: {...},            // 代码高亮配置
  },
  vite: {                         // Vite 配置（Astro 基于 Vite）
    plugins: [tailwindcss()],
  },
});
```

**类比：**

- `integrations` ≈ Next.js 的 `plugins`
- `vite` 配置 ≈ `next.config.js` 的 webpack 配置

### `src/` 目录结构

```
src/
├── assets/              # 需要处理的资源（图片、字体等）
│   ├── icons/          # SVG 图标
│   └── images/         # 图片资源
├── components/          # Astro 组件（类似 React/Vue 组件）
│   ├── Card.astro
│   ├── Header.astro
│   └── Footer.astro
├── layouts/            # 布局组件（类似 Next.js 的 _app.js）
│   ├── Layout.astro    # 基础布局（HTML 结构）
│   └── PostDetails.astro
├── pages/              # 路由页面（类似 Next.js 的 pages/）
│   ├── index.astro     # 首页 (/)
│   ├── about.md        # 关于页 (/about)
│   ├── posts/
│   │   └── [...slug]/  # 动态路由（类似 [...slug].jsx）
│   └── tags/
│       └── [tag]/      # 动态路由参数
├── data/               # 内容数据（Markdown 文件）
│   └── blog/          # 博客文章
├── styles/            # 全局样式
├── utils/             # 工具函数
├── config.ts          # 站点配置
└── content.config.ts   # 内容集合配置
```

---

## 三、关键路径文件详解

### `src/pages/` - 路由系统

**类比 Next.js：**

- `pages/index.astro` ≈ `pages/index.jsx` → 路由：`/`
- `pages/about.md` ≈ `pages/about.jsx` → 路由：`/about`
- `pages/posts/[...slug]/index.astro` ≈ `pages/posts/[...slug].jsx` → 动态路由

**关键文件：**

#### `src/pages/index.astro` - 首页

```astro
---
// 构建时执行，获取所有文章
const posts = await getCollection("blog");
const sortedPosts = getSortedPosts(posts);
---

<Layout>
  <Header />
  <main>
    {sortedPosts.map(post => <Card {...post} />)}
  </main>
  <Footer />
</Layout>
```

#### `src/pages/posts/[...slug]/index.astro` - 动态路由

```astro
---
// 类似 Next.js 的 getStaticPaths
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { slug: getPath(post.id) },
    props: { post },
  }));
}

const { post } = Astro.props; // 类似 Next.js 的 props
---

<PostDetails post={post} />
```

**关键点：**

- `getStaticPaths()` 用于生成静态路径（SSG）
- `Astro.props` 获取传入的 props
- `[...slug]` 是捕获所有路径的语法

### `src/layouts/` - 布局系统

**类比 Next.js：**

- `Layout.astro` ≈ `_app.jsx` 或 `_document.jsx`
- 提供 HTML 结构、SEO meta 标签等

#### `src/layouts/Layout.astro`

```astro
---
// Props 定义（类似 TypeScript interface）
type Props = {
  title?: string;
  description?: string;
};

const { title, description } = Astro.props;
---

<!doctype html>
<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <slot />
    <!-- 类似 Vue 的 <slot> 或 React 的 {children} -->
  </body>
</html>
```

**关键点：**

- `<slot />` 是内容插槽，类似 Vue 的 slot 或 React 的 children
- 可以定义多个具名插槽：`<slot name="header" />`

### `src/components/` - 组件系统

**类比 React/Vue：**

- `.astro` 文件 ≈ `.jsx` 或 `.vue` 文件
- 支持 props、条件渲染、循环等

#### `src/components/Card.astro` 示例

```astro
---
// Props 类型定义
type Props = {
  variant?: "h2" | "h3";
} & CollectionEntry<"blog">;

const { variant = "h2", id, data } = Astro.props;
const { title, description } = data;
---

<li>
  <a href={getPath(id)}>
    <h2>{title}</h2>
  </a>
  <p>{description}</p>
</li>
```

**关键点：**

- `Astro.props` 获取传入的 props
- 可以使用 TypeScript 类型定义
- 模板语法类似 JSX

### `src/data/blog/` - 内容集合（Content Collections）

**类比：**

- 类似 Next.js 的 `content/` 目录或 Nuxt Content
- 使用 Markdown 文件存储内容

#### Markdown 文件结构

```markdown
---
title: 文章标题
author: 作者
pubDatetime: 2024-01-01T00:00:00Z
draft: false
tags: [JavaScript, React]
description: 文章描述
---

# 文章内容

这里是 Markdown 内容...
```

**关键点：**

- Frontmatter（`---` 之间的内容）是元数据
- 在 `content.config.ts` 中定义 schema 验证

### `src/content.config.ts` - 内容集合配置

```typescript
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),
  schema: z.object({
    title: z.string(),
    pubDatetime: z.date(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
```

**类比：**

- 类似 Prisma schema 或 TypeORM 实体定义
- 使用 Zod 进行类型验证

### `src/config.ts` - 站点配置

```typescript
export const SITE = {
  website: "https://example.com",
  author: "Your Name",
  title: "My Blog",
  postPerIndex: 4,
  // ...
} as const;
```

**类比：**

- 类似 Next.js 的 `site.config.js`
- 集中管理站点配置

### `src/utils/` - 工具函数

**常用工具函数：**

- `getSortedPosts.ts` - 排序文章
- `getPath.ts` - 生成路径
- `slugify.ts` - 生成 URL slug

**类比：**

- 类似 React 项目的 `utils/` 目录
- 纯函数，可以在组件脚本中使用

---

## 四、开发工作流

### 启动开发服务器

```bash
npm run dev
# 或
pnpm dev
```

**类比：**

- `npm run dev` ≈ `next dev` 或 `nuxt dev`
- 默认运行在 `http://localhost:4321`

### 构建生产版本

```bash
npm run build
```

**类比：**

- `npm run build` ≈ `next build` 或 `nuxt build`
- 生成静态文件到 `dist/` 目录

### 预览生产构建

```bash
npm run preview
```

**类比：**

- `npm run preview` ≈ `next start` 或 `nuxt preview`

---

## 五、常见开发场景

### 场景 1：创建新页面

**创建 `src/pages/about.astro`：**

```astro
---
import Layout from "@/layouts/Layout.astro";
---

<Layout title="关于我">
  <h1>关于我</h1>
  <p>这是我的介绍...</p>
</Layout>
```

**路由自动生成：** `/about`

### 场景 2：创建新组件

**创建 `src/components/Button.astro`：**

```astro
---
type Props = {
  href: string;
  children: string;
};

const { href, children } = Astro.props;
---

<a href={href} class="btn">
  {children}
</a>

<style>
  .btn {
    padding: 0.5rem 1rem;
    background: blue;
    color: white;
  }
</style>
```

**使用组件：**

```astro
---
import Button from "@/components/Button.astro";
---

<Button href="/about">关于我</Button>
```

### 场景 3：使用 React/Vue 组件

**安装集成：**

```bash
npx astro add react
# 或
npx astro add vue
```

**使用：**

```astro
---
import MyReactComponent from "./MyReactComponent.jsx";
---

<MyReactComponent client:load />
```

### 场景 4：获取内容集合数据

```astro
---
import { getCollection } from "astro:content";

// 获取所有文章
const posts = await getCollection("blog");

// 过滤草稿
const publishedPosts = await getCollection("blog", ({ data }) => !data.draft);

// 获取单篇文章
const post = await getEntry("blog", "post-id");
---

<ul>
  {
    publishedPosts.map(post => (
      <li>
        <a href={`/posts/${post.slug}`}>{post.data.title}</a>
      </li>
    ))
  }
</ul>
```

### 场景 5：动态路由

**`src/pages/posts/[id].astro`：**

```astro
---
export async function getStaticPaths() {
  const posts = await getCollection("blog");
  return posts.map(post => ({
    params: { id: post.id },
    props: { post },
  }));
}

const { post } = Astro.props;
---

<Layout>
  <article>
    <h1>{post.data.title}</h1>
    <div set:html={post.body} />
  </article>
</Layout>
```

---

## 六、关键概念速查

### Astro 全局对象

- `Astro.props` - 组件 props
- `Astro.request` - 请求对象
- `Astro.url` - URL 对象
- `Astro.params` - 路由参数
- `Astro.site` - 站点 URL

### 指令（Directives）

- `client:load` - 立即加载客户端组件
- `client:idle` - 浏览器空闲时加载
- `client:visible` - 进入视口时加载
- `client:only` - 仅客户端渲染
- `set:html` - 设置 HTML 内容（类似 `dangerouslySetInnerHTML`）
- `is:inline` - 内联脚本/样式

### 内容集合 API

- `getCollection(name)` - 获取集合所有条目
- `getEntry(name, id)` - 获取单个条目
- `render(entry)` - 渲染 Markdown 内容

---

## 七、学习资源

1. **官方文档**：https://docs.astro.build
2. **API 参考**：https://docs.astro.build/en/reference/api-reference/
3. **集成列表**：https://docs.astro.build/en/guides/integrations-guide/

---

## 八、快速上手清单

- [ ] 理解 Astro 组件语法（`---` 分隔符）
- [ ] 了解文件路由系统（`src/pages/`）
- [ ] 掌握内容集合（Content Collections）
- [ ] 学会使用布局组件（`<slot />`）
- [ ] 理解客户端组件指令（`client:*`）
- [ ] 熟悉 `getStaticPaths()` 动态路由
- [ ] 了解 Astro 全局对象（`Astro.props` 等）

---

**祝你开发愉快！** 🚀

如有问题，可以查看项目中的示例文件或 Astro 官方文档。
