export const SITE = {
  website: "https://astro-paper.pages.dev/", // replace this with your deployed domain
  author: "Takato",
  profile: "https://",
  desc: "一个简洁、响应式且对 SEO 友好的 Astro 博客主题。",
  title: "TakatoBlog",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "编辑页面",
    url: "https://github.com/Takatoo-1/takato-blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "zh", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Bangkok", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
