---
title: 如何更新 AstroPaper 的依赖
author: Sat Naing
pubDatetime: 2023-07-20T15:33:05.569Z
slug: how-to-update-dependencies
featured: false
draft: false
ogImage: ../../assets/images/forrest-gump-quote.png
tags:
  - FAQ
description: 如何更新项目依赖和 AstroPaper 模板。
---

更新项目的依赖可能很繁琐。但是，忽略更新项目依赖也不是一个好主意 😬。在这篇文章中，我将分享我通常如何更新项目，以 AstroPaper 为例。尽管如此，这些步骤也可以应用于其他 js/node 项目。

![Forrest Gump Fake Quote](@/assets/images/forrest-gump-quote.png)

## 目录

## 更新包依赖

有几种更新依赖的方法，我尝试了各种方法来找到最简单的路径。一种方法是使用 `npm install package-name@latest` 手动更新每个包。这是最直接的更新方法。但是，这可能不是最有效的选项。

我推荐的更新依赖的方法是使用 [npm-check-updates 包](https://www.npmjs.com/package/npm-check-updates)。freeCodeCamp 有一篇关于此的[好文章](https://www.freecodecamp.org/news/how-to-update-npm-dependencies/)，所以我不会详细解释它是什么以及如何使用该包。相反，我将向您展示我的典型方法。

首先，全局安装 `npm-check-updates` 包。

```bash
npm install -g npm-check-updates
```

Before making any updates, it’s a good idea to check all new dependencies that can be updated.

```bash
ncu
```

Most of the time, patch dependencies can be updated without affecting the project at all. So, I usually update patch dependencies by running either `ncu -i --target patch` or `ncu -u --target patch`. The difference is that `ncu -u --target patch` will update all the patches, while `ncu -i --target patch` will give an option to toggle which package to update. It’s up to you to decide which approach to take.

The next part involves updating minor dependencies. Minor package updates usually won't break the project, but it is always good to check the release notes of the respective packages. These minor updates often include some cool features that can be applied to our projects.

```bash
ncu -i --target minor
```

最后但同样重要的是，依赖中可能有一些主要包更新。所以，通过运行以下命令检查其余依赖更新

```bash
ncu -i
```

如果有任何主要更新（或您仍然需要进行的更新），上述命令将输出那些剩余的包。如果包是主要版本更新，您必须非常小心，因为这可能会破坏整个项目。因此，请仔细阅读相应的发布说明（或）文档，并相应地做出更改。

如果您运行 `ncu -i` 并且发现没有更多包需要更新，_**恭喜！！！**_ 您已成功更新项目中的所有依赖。

## 更新 AstroPaper 模板

Like other open-source projects, AstroPaper is evolving with bug fixes, feature updates, and so on. So if you’re someone who is using AstroPaper as a template, you might also want to update the template when there’s a new release.

The thing is, you might already have updated the template according to your flavor. Therefore, I can’t exactly show **"the one-size-fits-all perfect way"** to update the template to the most recent release. However, here are some tips to update the template without breaking your repo. Keep in mind that, most of the time, updating the package dependencies might be sufficient for you.

### Files and Directories to keep in mind

In most cases, the files and directories you might not want to override (as you've likely updated those files) are `src/content/blog/`, `src/config.ts`, `src/pages/about.md`, and other assets & styles like `public/` and `src/styles/base.css`.

If you’re someone who only updates the bare minimum of the template, it should be okay to replace everything with the latest AstroPaper except the above files and directories. It’s like pure Android OS and other vendor-specific OSes like OneUI. The less you modify the base, the less you have to update.

You can manually replace every file one by one, or you can use the magic of git to update everything. I won’t show you the manual replacement process since it is very straightforward. If you’re not interested in that straightforward and inefficient method, bear with me 🐻.

### Updating AstroPaper using Git

**IMPORTANT!!!**

> Only do the following if you know how to resolve merge conflicts. Otherwise, you’d better replace files manually or update dependencies only.

First, add astro-paper as the remote in your project.

```bash
git remote add astro-paper https://github.com/satnaing/astro-paper.git
```

Checkout to a new branch in order to update the template. If you know what you’re doing and you’re confident with your git skill, you can omit this step.

```bash
git checkout -b build/update-astro-paper
```

Then, pull the changes from astro-paper by running

```bash
git pull astro-paper main
```

If you face `fatal: refusing to merge unrelated histories` error, you can resolve that by running the following command

```bash
git pull astro-paper main --allow-unrelated-histories
```

After running the above command, you’re likely to encounter conflicts in your project. You'll need to resolve these conflicts manually and make the necessary adjustments according to your needs.

解决冲突后，彻底测试您的博客以确保一切按预期工作。检查您的文章、组件和您所做的任何自定义。

一旦您对结果满意，就可以将更新分支合并到您的主分支（仅当您在另一个分支中更新模板时）。恭喜！您已成功将模板更新到最新版本。您的博客现在是最新的，准备闪耀！🎉

## 结论

在这篇文章中，我分享了一些关于更新依赖和 AstroPaper 模板的见解和过程。我真诚地希望这篇文章能证明是有价值的，并帮助您更有效地管理项目。

如果您有任何更新依赖/AstroPaper 的替代或改进方法，我很乐意听取您的意见。因此，请不要犹豫，在仓库中开始讨论、给我发电子邮件或提出问题。非常感谢您的意见和想法！

请理解我这些天的日程安排很忙，可能无法快速回复。但是，我承诺会尽快回复您。😬

感谢您花时间阅读这篇文章，祝您的项目一切顺利！
