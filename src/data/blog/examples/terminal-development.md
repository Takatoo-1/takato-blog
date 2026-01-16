---
title: 如何使用 React 开发我的终端作品集网站
author: Sat Naing
pubDatetime: 2022-06-09T03:42:51Z
slug: how-do-i-develop-my-terminal-portfolio-website-with-react
featured: false
draft: false
tags:
  - JavaScript
  - ReactJS
  - ContextAPI
  - Styled-Components
  - TypeScript
description:
  "示例文章：使用 ReactJS、TypeScript 和 Styled-Components 开发类似终端的网站。
  包括自动完成、多个主题、命令提示等功能。"
timezone: "Asia/Yangon"
---

> 这篇文章最初来自我的[博客文章](https://satnaing.dev/blog/posts/how-do-i-develop-my-terminal-portfolio-website-with-react)。我放置这篇文章是为了演示如何使用 AstroPaper 主题编写博客文章。

使用 ReactJS、TypeScript 和 Styled-Components 开发类似终端的网站。包括自动完成、多个主题、命令提示等功能。

![Sat Naing's Terminal Portfolio](https://satnaing.dev/_ipx/w_2048,q_75/https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png?url=https%3A%2F%2Fres.cloudinary.com%2Fnoezectz%2Fimage%2Fupload%2Fv1654754125%2FSatNaing%2Fterminal-screenshot_gu3kkc.png&w=2048&q=75)

## 目录

## 介绍

最近，我开发并发布了我的作品集和博客。我很高兴收到了一些不错的反馈。今天，我想介绍我的新终端风格作品集网站。它是使用 ReactJS 和 TypeScript 开发的。这个想法来自 CodePen 和 YouTube。

## 技术栈

这是一个没有后端代码的前端项目。UI/UX 部分在 Figma 中设计。对于前端用户界面，我选择了 React 而不是原生 JavaScript 和 NextJS。为什么？

- 首先，我想编写声明式代码。使用 JavaScript 命令式地管理 HTML DOM 真的很繁琐。
- 其次，因为它是 React！！！它快速且可靠。
- 最后，我不需要 NextJS 提供的太多 SEO 功能、路由和图片优化。

当然，还有用于类型检查的 TypeScript。

对于样式，我采用了与平时不同的方法。我没有选择纯 CSS、Sass 或像 TailwindCSS 这样的实用 CSS 框架，而是选择了 CSS-in-JS 方式（Styled-Components）。虽然我了解 Styled-Components 已经有一段时间了，但我从未尝试过。所以，这个项目中 Styled-Components 的编写风格和结构可能不是很有条理或很好。

这个项目不需要非常复杂的状态管理。我只是在这个项目中使用 ContextAPI 来实现多主题并避免属性传递。

以下是技术栈的快速总结。

- 前端：[ReactJS](https://reactjs.org/ "React Website")、[TypeScript](https://www.typescriptlang.org/ "TypeScript Website")
- 样式：[Styled-Components](https://styled-components.com/ "Styled-Components Website")
- UI/UX：[Figma](https://figma.com/ "Figma Website")
- 状态管理：[ContextAPI](https://reactjs.org/docs/context.html "React ContextAPI")
- 部署：[Netlify](https://www.netlify.com/ "Netlify Website")

## 功能特性

以下是该项目的一些功能。

### 多主题

用户可以切换多个主题。在撰写本文时，有 5 个主题；未来可能会添加更多主题。选定的主题保存在本地存储中，这样在页面刷新时主题不会改变。

![设置不同主题](https://i.ibb.co/fSTCnWB/terminal-portfolio-multiple-themes.gif)

### 命令行自动完成

为了尽可能接近真实终端的外观和感觉，我添加了命令行自动完成功能，只需按 'Tab' 或 'Ctrl + i' 即可自动填充部分输入的命令。

![演示命令行自动完成](https://i.ibb.co/CQTGGLF/terminal-autocomplete.gif)

### 历史命令

用户可以通过按上下箭头键返回之前的命令或浏览之前输入的命令。

![使用上箭头键返回之前的命令](https://i.ibb.co/vD1pSRv/terminal-up-down.gif)

### 查看/清除命令历史

之前输入的命令可以通过在命令行中输入 'history' 来查看。所有命令历史和终端屏幕可以通过输入 'clear' 或按 'Ctrl + l' 来清除。

![使用 'clear' 或 'Ctrl + L' 命令清除终端](https://i.ibb.co/SJBy8Rr/terminal-clear.gif)

## 总结

这是一个非常有趣的项目，这个项目的一个特殊之处是我必须专注于逻辑而不是用户界面（尽管这是一个前端项目）。

## 项目链接

- 网站：[https://terminal.satnaing.dev/](https://terminal.satnaing.dev/ "https://terminal.satnaing.dev/")
- 仓库：[https://github.com/satnaing/terminal-portfolio](https://github.com/satnaing/terminal-portfolio "https://github.com/satnaing/terminal-portfolio")
