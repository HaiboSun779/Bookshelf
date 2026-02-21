# 个人智能书架 Web App

一个基于 `React + Vite + TailwindCSS` 的前端项目，用于管理个人阅读清单，支持添加书籍、阅读状态管理、筛选排序和本地持久化。

---

## 1. 项目功能

- 添加书籍（书名、作者、封面 URL/上传、状态、备注）
- 编辑 / 删除书籍
- 阅读状态一键切换（在读 / 已读 / 想读）
- 按状态筛选（全部 / 在读 / 已读 / 想读）
- 排序（按添加时间、按书名）
- 使用 `localStorage` 持久化（刷新不丢失）
- 响应式卡片网格 + 现代 SaaS 风格 UI

---

## 2. 技术栈

- `React`
- `Vite`
- `TailwindCSS`
- `Hooks`（状态与持久化）

---

## 3. 运行环境要求

- 推荐 Node.js：`22.12+`（或 `20.19+`）
- 推荐 npm：`10+`

查看版本：

```bash
node -v
npm -v
```

---

## 4. 本地开发（最常用）

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

## 5. 打包与预览

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

## 6. 部署到 Vercel（推荐）

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

## 7. 项目结构说明

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
  hooks/
    useLocalStorage.js    # 本地存储 Hook（含容错）
  App.jsx                 # 页面主逻辑
  index.css               # 全局样式与 Tailwind 入口
  main.jsx                # React 入口
```

---

## 8. 常见问题（FAQ）

### Q1：浏览器打不开 `127.0.0.1:5173`

A：通常是 dev server 没在运行。请先执行 `npm run dev`，并保持终端窗口不要关闭。

### Q2：双击 `index.html` 白屏

A：现代前端项目通常不支持 `file://` 直接运行，建议使用 `npm run dev` 或部署到 Vercel 后通过链接访问。

### Q3：终端提示 Node 版本不满足

A：升级 Node 到 `22.12+`（或 `20.19+`）后重新 `npm install`。

---

## 9. 可扩展方向

- 搜索书籍
- 阅读统计图表
- 阅读进度条
- 用户登录与云端同步
- AI 推荐书籍

