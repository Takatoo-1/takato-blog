# 个人博客 📝

![个人博客](public/astropaper-og.jpg)

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

这是我的个人博客项目，基于 Astro 构建的静态博客网站。博客采用简洁、响应式设计，专注于内容展示和阅读体验。

## 📖 关于博客

这个博客主要用于记录和分享：

- 💻 **技术文章**：前端开发、Web 技术、编程实践等
- 📚 **学习笔记**：学习过程中的总结和思考
- 🛠️ **项目经验**：项目开发中的经验和教训
- 💡 **生活随笔**：偶尔的生活感悟和思考

博客采用静态站点生成（SSG）技术，确保快速加载和优秀的 SEO 表现。

## ✨ 功能特性

- [x] 类型安全的 Markdown 内容管理
- [x] 极速性能（零 JavaScript 运行时）
- [x] 无障碍访问支持（键盘导航/屏幕阅读器）
- [x] 响应式设计（移动端 ~ 桌面端）
- [x] SEO 友好
- [x] 明暗主题切换
- [x] 全文搜索功能
- [x] 草稿文章和分页
- [x] 自动生成站点地图和 RSS 订阅
- [x] 遵循最佳实践
- [x] 高度可定制
- [x] 动态生成博客文章的 OG 图片

## 🚀 项目结构

项目采用 Astro 框架构建，目录结构如下：

```bash
/
├── public/              # 静态资源目录
│   ├── pagefind/       # 搜索索引（构建时自动生成）
│   ├── favicon.svg     # 网站图标
│   └── astropaper-og.jpg
├── src/
│   ├── assets/         # 需要处理的资源文件
│   │   ├── icons/      # SVG 图标
│   │   └── images/     # 图片资源
│   ├── components/     # Astro 组件
│   ├── data/           # 内容数据
│   │   └── blog/       # 博客文章（Markdown 文件）
│   ├── layouts/        # 布局组件
│   ├── pages/          # 路由页面
│   ├── scripts/        # 客户端脚本
│   ├── styles/         # 全局样式
│   ├── utils/          # 工具函数
│   ├── config.ts       # 站点配置
│   ├── constants.ts    # 常量定义
│   ├── content.config.ts # 内容集合配置
│   └── env.d.ts        # TypeScript 类型定义
└── astro.config.ts     # Astro 配置文件
```

### 关键目录说明

- **`src/pages/`**：文件系统路由，每个 `.astro` 或 `.md` 文件自动生成一个路由
- **`src/data/blog/`**：所有博客文章存储在此目录，使用 Markdown 格式
- **`src/components/`**：可复用的 UI 组件
- **`src/layouts/`**：页面布局模板
- **`public/`**：静态资源，直接复制到构建输出

## 💻 技术栈

**主要框架** - [Astro](https://astro.build/)  
**类型检查** - [TypeScript](https://www.typescriptlang.org/)  
**样式框架** - [TailwindCSS](https://tailwindcss.com/)  
**静态搜索** - [Pagefind](https://pagefind.app/)  
**图标库** - [Tabler Icons](https://tabler-icons.io/)  
**代码格式化** - [Prettier](https://prettier.io/)  
**代码检查** - [ESLint](https://eslint.org)  
**语法高亮** - [Shiki](https://shiki.style/)

## 🛠️ 本地开发

### 环境要求

- Node.js 18+
- pnpm（推荐）或 npm/yarn

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm run dev
```

开发服务器将在 `http://localhost:4321` 启动。

### 构建生产版本

```bash
pnpm run build
```

构建输出将生成到 `./dist/` 目录。

### 预览构建结果

```bash
pnpm run preview
```

### 使用 Docker（可选）

如果已安装 Docker，可以使用 Docker 运行项目：

```bash
# 构建 Docker 镜像
docker build -t blog .

# 运行 Docker 容器
docker run -p 4321:80 blog
```

或使用 Docker Compose：

```bash
docker compose up -d
```

## 📝 常用命令

所有命令都在项目根目录执行：

| 命令                    | 说明                                   |
| :---------------------- | :------------------------------------- |
| `pnpm install`          | 安装项目依赖                           |
| `pnpm run dev`          | 启动本地开发服务器（`localhost:4321`） |
| `pnpm run build`        | 构建生产版本到 `./dist/`               |
| `pnpm run preview`      | 本地预览构建结果                       |
| `pnpm run format:check` | 检查代码格式（Prettier）               |
| `pnpm run format`       | 格式化代码（Prettier）                 |
| `pnpm run sync`         | 生成 Astro 模块的 TypeScript 类型      |
| `pnpm run lint`         | 使用 ESLint 检查代码                   |

## 📚 文档

项目中的详细文档：

- [如何配置博客主题](src/data/blog/how-to-configure-astropaper-theme.md)
- [添加新文章](src/data/blog/adding-new-post.md)
- [自定义配色方案](src/data/blog/customizing-astropaper-theme-color-schemes.md)
- [预定义配色方案](src/data/blog/predefined-color-schemes.md)
- [Astro 快速上手指南](src/data/blog/astro-快速上手指南.md)
- [项目结构说明](src/data/blog/项目结构说明.md)

## 🔍 Google 站点验证（可选）

可以通过环境变量添加 Google 站点验证标签：

```bash
# 在环境变量文件 (.env) 中
PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-site-verification-value
```

如果不设置此环境变量，HTML `<head>` 中不会出现 google-site-verification 标签。

## 📄 许可证

本项目采用 MIT 许可证。

---

**用 ❤️ 构建的个人博客**
