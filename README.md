# 个人智能书架 Web App

一个基于 `React + Vite + TailwindCSS + Supabase` 的书架应用，用于管理个人阅读清单，支持添加书籍、阅读状态管理、筛选排序和云端持久化。

项目总结文档见：`docs/PROJECT_SUMMARY.md`

---

## 1. 项目功能

- 添加书籍（书名、作者、封面 URL/上传、状态、备注）
- 编辑 / 删除书籍
- 阅读状态一键切换（在读 / 已读 / 想读）
- 按状态筛选（全部 / 在读 / 已读 / 想读）
- 排序（按添加时间、按书名）
- 使用 `Supabase` 云端数据库持久化（跨设备可访问）
- 响应式卡片网格 + 现代 SaaS 风格 UI

---

## 2. 技术栈

- `React`
- `Vite`
- `TailwindCSS`
- `Supabase`
- `Hooks`（状态与数据流）

---

## 3. Supabase 配置（必做）

### 1) 配置环境变量

在项目根目录创建 `.env.local`，填入：

```bash
VITE_SUPABASE_URL=https://bnjzhelnxotssrmzsfiu.supabase.co
VITE_SUPABASE_ANON_KEY=你的_supabase_anon_key
```

你也可以复制 `.env.example` 后重命名为 `.env.local`。

### 2) 创建 `books` 表

在 Supabase SQL Editor 执行以下 SQL：

```sql
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  author text not null,
  cover_image text,
  status text not null check (status in ('reading', 'finished', 'wishlist')),
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 3) 开发阶段快速可用（可选）

如果你只是个人演示，可以先在 Supabase 后台暂时关闭该表的 RLS；后续再加登录和策略。

---

## 4. 运行环境要求

- 推荐 Node.js：`22.12+`（或 `20.19+`）
- 推荐 npm：`10+`

查看版本：

```bash
node -v
npm -v
```

---

## 5. 本地开发（最常用）

> 注意：这个项目不要通过双击 `index.html` 来运行，正确方式是启动本地开发服务器。

### 步骤

1) 进入项目目录

```bash
cd "/Users/sunhaibo/Desktop/cursor code/1.2"
```

2) 安装依赖

```bash
npm install
```

3) 启动开发服务

```bash
npm run dev
```

4) 在浏览器打开终端输出的地址（一般是）

```text
http://127.0.0.1:5173/
```

如果你在 macOS 终端想直接打开浏览器：

```bash
open "http://127.0.0.1:5173/"
```

---

## 6. 打包与预览

### 生产构建

```bash
npm run build
```

构建结果在 `dist/` 目录。

### 本地预览生产包（推荐）

```bash
npm run preview
```

然后打开终端显示的链接查看。

---

## 7. 部署到 Vercel（推荐）

部署后会得到一个线上链接，可直接访问（不需要本地启动服务）。

### 方式 A：GitHub + Vercel（最简单）

1) 把项目推到 GitHub  
2) 在 Vercel 导入该仓库  
3) 配置（通常自动识别）：
- Framework: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`
4) 点击 Deploy

---

## 8. 项目结构说明

```text
src/
  components/
    AddBookModal.jsx      # 添加/编辑书籍弹窗
    AppLayout.jsx         # 页面整体布局
    BookCard.jsx          # 书籍卡片
    BookshelfGrid.jsx     # 书架网格容器
    FilterBar.jsx         # 筛选与排序栏
    Navbar.jsx            # 顶部导航与统计
  constants/
    bookStatus.js         # 状态映射、筛选项、排序项
  lib/
    supabaseClient.js     # Supabase 客户端初始化
  services/
    booksService.js       # 书籍 CRUD 服务层
  App.jsx                 # 页面主逻辑
  index.css               # 全局样式与 Tailwind 入口
  main.jsx                # React 入口
```

---

## 9. 常见问题（FAQ）

### Q1：浏览器打不开 `127.0.0.1:5173`

A：通常是 dev server 没在运行。请先执行 `npm run dev`，并保持终端窗口不要关闭。

### Q2：双击 `index.html` 白屏

A：现代前端项目通常不支持 `file://` 直接运行，建议使用 `npm run dev` 或部署到 Vercel 后通过链接访问。

### Q3：终端提示 Node 版本不满足

A：升级 Node 到 `22.12+`（或 `20.19+`）后重新 `npm install`。

### Q4：页面报 `Missing Supabase env vars`

A：说明没有配置 `.env.local`，请按本文档的 Supabase 配置步骤补齐 `URL + ANON KEY`。

---

## 10. 可扩展方向

- 搜索书籍
- 阅读统计图表
- 阅读进度条
- 用户登录与云端同步
- AI 推荐书籍

