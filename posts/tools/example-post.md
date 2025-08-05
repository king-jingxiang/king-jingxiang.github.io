---
title: 如何使用这个技术分享博客
date: 2024-01-01
category: 使用指南
tags: [博客, 指南, Markdown]
---

# 如何使用这个技术分享博客

欢迎使用这个基于GitHub Pages的技术分享博客！这篇文章将指导你如何使用这个博客系统来发布你的技术文章。

## 功能特性

这个博客系统具有以下特性：

- 📝 **Markdown支持** - 使用Markdown格式编写文章
- 🎨 **响应式设计** - 支持桌面和移动设备
- 🌙 **深色主题** - 支持深色/浅色主题切换
- 🏷️ **标签分类** - 文章支持标签和分类
- 🔍 **搜索功能** - 支持文章搜索
- 📱 **现代化UI** - 简洁美观的用户界面

## 如何添加新文章

### 1. 创建Markdown文件

在 `posts/` 目录下创建一个新的 `.md` 文件，文件名建议使用英文和连字符，例如：

```
posts/my-first-post.md
posts/javascript-tips.md
posts/react-best-practices.md
```

### 2. 添加文章元数据

在Markdown文件的开头添加YAML格式的元数据：

```yaml
---
title: 文章标题
date: 2024-01-01
category: 分类名称
tags: [标签1, 标签2, 标签3]
---
```

### 3. 编写文章内容

在元数据下方使用Markdown语法编写文章内容：

```markdown
# 主标题

这是文章的正文内容...

## 二级标题

### 三级标题

- 列表项1
- 列表项2

代码示例：

```javascript
function hello() {
    console.log("Hello, World!");
}
```

### 4. 运行构建脚本

添加文章后，运行构建脚本生成HTML页面：

```bash
# 安装依赖（首次使用）
pip install -r requirements.txt

# 运行构建脚本
python scripts/build.py
```

## 自定义配置

你可以通过修改 `config/site.json` 文件来自定义网站配置：

```json
{
  "site": {
    "title": "你的网站标题",
    "description": "网站描述",
    "author": "你的名字",
    "url": "https://your-username.github.io"
  }
}
```

## 技术栈配置

在 `config/site.json` 中的 `techStacks` 部分可以配置你的技术栈：

```json
{
  "techStacks": [
    {
      "category": "前端开发",
      "technologies": ["JavaScript", "React", "Vue.js"],
      "color": "#61dafb"
    }
  ]
}
```

## 部署到GitHub Pages

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择从根目录部署
4. 你的网站将在 `https://your-username.github.io` 可用

## 代码示例

这里是一些常用的Markdown语法示例：

### 代码块

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
```

### 表格

| 功能 | 支持 | 说明 |
|------|------|------|
| Markdown | ✅ | 完全支持 |
| 代码高亮 | ✅ | 支持多种语言 |
| 数学公式 | ❌ | 暂不支持 |

### 引用

> 这是一个引用示例。你可以用它来突出重要的信息或引用他人的话。

## 总结

这个博客系统为技术分享提供了一个简单而强大的平台。通过Markdown编写文章，自动生成美观的HTML页面，让你专注于内容创作而不是技术细节。

开始你的技术分享之旅吧！🚀