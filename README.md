# GitHub 个人主页 - 技术分享网站

这是一个基于GitHub Pages的个人技术分享网站，支持Markdown文档自动转换为HTML页面。

## 项目结构

```
├── index.html              # 主页
├── assets/                 # 静态资源
│   ├── css/               # 样式文件
│   ├── js/                # JavaScript文件
│   └── images/            # 图片资源
├── posts/                 # 技术文章（Markdown格式）
├── templates/             # HTML模板
├── scripts/               # 构建脚本
├── config/                # 配置文件
└── docs/                  # 生成的HTML文件
```

## 功能特性

- 📝 Markdown文档自动转换为HTML
- 🎨 响应式设计，支持移动端
- 🏷️ 技术栈分类展示
- 📚 文章列表和搜索功能
- 🌙 深色/浅色主题切换
- 📱 现代化UI设计

## 使用方法

1. 在 `posts/` 目录下添加Markdown文件
2. 运行构建脚本：`python scripts/build.py`
3. 推送到GitHub，自动部署到GitHub Pages

## 技术栈

- HTML5 + CSS3 + JavaScript
- Python (Markdown转换)
- GitHub Pages (部署)