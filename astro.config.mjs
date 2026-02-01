// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import icon from 'astro-icon';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import rehypeExternalLinks from 'rehype-external-links';
import webmanifest from "astro-webmanifest";
import vtbot from 'astro-vtbot';
import alpinejs from "@astrojs/alpinejs";

// 你的站点配置（核心个性化部分）
const siteConfig = {
  site: 'https://jinls.de5.net',             // 你的域名
  title: '金先生摄影 | Jin - 珠海独立男摄 · 氛围感人像 & 婚礼跟拍',
  description: '珠海独立摄影师，专注氛围感人像、婚礼跟拍、生活记录与街头光影。捕捉情绪与瞬间，欢迎浏览作品～',
  author: '金先生 (Jin)',
  email: '272378145@qq.com',            // 改成你真实的邮箱
  lang: 'zh',                                // 默认中文
  langs: ['zh', 'en'],                       // 支持语言（可加 'zh-tw' 等）
  theme_color: '#111111',                    // 黑底风格，深色主题色
  background_color: '#000000',
};

// https://astro.build/config
export default defineConfig({
  site: siteConfig.site,
  devToolbar: {
    enabled: false
  },
  i18n: {
    locales: siteConfig.langs,
    defaultLocale: "zh",
    routing: {
      prefixDefaultLocale: false
    },
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [
      svgr({
        svgrOptions: {
          icon: true
        }
      }),
      tailwindcss(),
      // 如果你不需要打包分析，可以注释掉 visualizer
      // visualizer({
      //   emitFile: true,
      //   filename: "package_analyze.html",
      // }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    server: {
      watch: {
        ignored: [
          '**/.git/**',
          '**/website/**',
          '**/dist/**',
        ]
      }
    }
  },
  integrations: [
    sitemap(),
    react(),
    icon(),
    vtbot(),
    webmanifest({
      name: siteConfig.title,
      short_name: "金先生摄影",
      description: siteConfig.description,
      lang: siteConfig.lang,
      icon: "/favicon/favicon.svg",           // 替换成你的图标路径
      icons: [
        {
          src: "/favicon/favicon-180x180.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "/favicon/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/favicon/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      start_url: '/',
      theme_color: siteConfig.theme_color,
      background_color: siteConfig.background_color,
      display: 'standalone',
    }),
    alpinejs()
  ],
  redirects: {
    // 如果你不需要这些重定向，可以注释或删掉
    "/blog": "/blog/home",
    "/blog/index": "/blog/home",
    "/blog/tags": "/blog/tags/Python",
    "/blog/posts": "/blog/posts/1"
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          content: { type: 'text', value: ' 🔗' }
        }
      ],
    ]
  },
});
