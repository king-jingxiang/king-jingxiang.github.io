#!/usr/bin/env python3
"""
Markdown to HTML 转换脚本
支持将posts目录下的Markdown文件转换为HTML页面
"""

import os
import json
import re
from datetime import datetime
from pathlib import Path
import markdown
from markdown.extensions import codehilite, toc, meta
import shutil

class MarkdownProcessor:
    def __init__(self):
        self.root_dir = Path(__file__).parent.parent
        self.posts_dir = self.root_dir / 'posts'
        self.docs_dir = self.root_dir / 'docs'
        self.templates_dir = self.root_dir / 'templates'
        self.config_file = self.root_dir / 'config' / 'site.json'
        
        # 确保目录存在
        self.docs_dir.mkdir(exist_ok=True)
        
        # 加载配置
        with open(self.config_file, 'r', encoding='utf-8') as f:
            self.config = json.load(f)
    
    def load_template(self, template_name):
        """加载HTML模板"""
        template_path = self.templates_dir / f'{template_name}.html'
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()
    
    def get_tech_stack_from_path(self, md_file):
        """根据文件路径确定技术栈分类"""
        relative_path = md_file.relative_to(self.posts_dir)
        if len(relative_path.parts) > 1:
            folder_name = relative_path.parts[0]
            # 根据文件夹名称映射到技术栈
            for stack in self.config['techStacks']:
                if stack['slug'] == folder_name:
                    return stack['category']
        return '未分类'
    
    def process_markdown(self, md_file):
        """处理单个Markdown文件"""
        with open(md_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # 配置Markdown扩展
        md = markdown.Markdown(extensions=[
            'meta',
            'toc',
            'codehilite',
            'fenced_code',
            'tables'
        ])
        
        # 转换为HTML
        html_content = md.convert(content)
        
        # 提取元数据
        meta = getattr(md, 'Meta', {})
        
        # 根据文件路径自动确定技术栈分类
        auto_category = self.get_tech_stack_from_path(md_file)
        
        # 构建文章信息
        article_info = {
            'title': meta.get('title', [md_file.stem])[0] if meta.get('title') else md_file.stem,
            'date': meta.get('date', [datetime.now().strftime('%Y-%m-%d')])[0],
            'tags': meta.get('tags', []),
            'category': meta.get('category', [auto_category])[0] if meta.get('category') else auto_category,
            'tech_stack': auto_category,
            'content': html_content,
            'toc': md.toc if hasattr(md, 'toc') else '',
            'filename': md_file.stem,
            'relative_path': str(md_file.relative_to(self.posts_dir))
        }
        
        return article_info
    
    def generate_article_page(self, article_info):
        """生成文章页面"""
        template = self.load_template('article')
        
        # 替换模板变量
        html = template.replace('{{TITLE}}', article_info['title'])
        html = html.replace('{{DATE}}', article_info['date'])
        html = html.replace('{{CATEGORY}}', article_info['category'])
        html = html.replace('{{CONTENT}}', article_info['content'])
        html = html.replace('{{TOC}}', article_info['toc'])
        html = html.replace('{{SITE_TITLE}}', self.config['site']['title'])
        html = html.replace('{{DESCRIPTION}}', article_info.get('description', article_info['title']))
        html = html.replace('{{KEYWORDS}}', ', '.join(article_info['tags'] + [article_info['category']]))
        html = html.replace('{{AUTHOR}}', self.config['site']['author'])
        html = html.replace('{{URL}}', self.config['site']['url'])
        html = html.replace('{{IMAGE}}', self.config['site']['avatar'])
        
        # 处理标签
        tags_html = ''.join([f'<span class="tag">{tag}</span>' for tag in article_info['tags']])
        html = html.replace('{{TAGS}}', tags_html)
        
        return html
    
    def generate_posts_list(self, articles):
        """生成文章列表页面"""
        template = self.load_template('posts')
        
        # 按日期排序
        articles.sort(key=lambda x: x['date'], reverse=True)
        
        # 生成文章列表HTML
        posts_html = ''
        for article in articles:
            posts_html += f'''
            <article class="post-item">
                <h3><a href="docs/{article['filename']}.html">{article['title']}</a></h3>
                <div class="post-meta">
                    <span class="date">{article['date']}</span>
                    <span class="category">{article['category']}</span>
                </div>
                <div class="tags">
                    {''.join([f'<span class="tag">{tag}</span>' for tag in article['tags']])}
                </div>
            </article>
            '''
        
        html = template.replace('{{POSTS_LIST}}', posts_html)
        html = html.replace('{{SITE_TITLE}}', self.config['site']['title'])
        html = html.replace('{{TITLE}}', '技术文章')
        html = html.replace('{{DESCRIPTION}}', '技术分享与学习笔记')
        html = html.replace('{{KEYWORDS}}', '技术文章, 编程, 开发, 技术分享')
        html = html.replace('{{AUTHOR}}', self.config['site']['author'])
        html = html.replace('{{URL}}', self.config['site']['url'])
        html = html.replace('{{IMAGE}}', self.config['site']['avatar'])
        
        return html
    
    def generate_tech_stack_page(self, articles):
        """生成技术栈页面"""
        template = self.load_template('tech-stack')
        
        # 统计每个技术栈的文章数量
        tech_stats = {}
        for article in articles:
            tech_stack = article['tech_stack']
            tech_stats[tech_stack] = tech_stats.get(tech_stack, 0) + 1
        
        # 生成技术栈HTML
        tech_html = ''
        for stack in self.config['techStacks']:
            article_count = tech_stats.get(stack['category'], 0)
            tech_html += f'''
            <div class="tech-category" style="border-left-color: {stack['color']}">
                <div class="tech-header">
                    <h3>{stack['category']}</h3>
                    <div class="tech-stats">
                        <span class="article-count">{article_count} 篇文章</span>
                        <a href="tech-stacks/{stack['slug']}.html" class="view-articles">查看文章 →</a>
                    </div>
                </div>
                <div class="tech-items">
                    {''.join([f'<span class="tech-item" style="background-color: {stack["color"]}20; color: {stack["color"]}">{tech}</span>' for tech in stack['technologies']])}
                </div>
            </div>
            '''
        
        html = template.replace('{{TECH_STACKS}}', tech_html)
        html = html.replace('{{SITE_TITLE}}', self.config['site']['title'])
        html = html.replace('{{TITLE}}', '技术栈')
        html = html.replace('{{DESCRIPTION}}', '我的技术技能和工具链')
        html = html.replace('{{KEYWORDS}}', '技术栈, 编程技能, 开发工具, 技术能力')
        html = html.replace('{{AUTHOR}}', self.config['site']['author'])
        html = html.replace('{{URL}}', self.config['site']['url'])
        html = html.replace('{{IMAGE}}', self.config['site']['avatar'])
        
        return html
    
    def generate_tech_stack_posts_page(self, tech_stack_slug, articles):
        """生成特定技术栈的文章列表页面"""
        template = self.load_template('tech-stack-posts')
        
        # 找到对应的技术栈信息
        tech_stack_info = None
        for stack in self.config['techStacks']:
            if stack['slug'] == tech_stack_slug:
                tech_stack_info = stack
                break
        
        if not tech_stack_info:
            return ""
        
        # 筛选该技术栈的文章
        filtered_articles = [article for article in articles if article['tech_stack'] == tech_stack_info['category']]
        filtered_articles.sort(key=lambda x: x['date'], reverse=True)
        
        # 生成文章列表HTML
        posts_html = ''
        for article in filtered_articles:
            posts_html += f'''
            <article class="post-item">
                <h3><a href="../docs/{article['filename']}.html">{article['title']}</a></h3>
                <div class="post-meta">
                    <span class="date">{article['date']}</span>
                    <span class="category">{article['category']}</span>
                </div>
                <div class="tags">
                    {''.join([f'<span class="tag">{tag}</span>' for tag in article['tags']])}
                </div>
            </article>
            '''
        
        # 无文章提示
        no_posts_message = ""
        if not posts_html:
            no_posts_message = f'''
            <div class="no-posts">
                <p>暂无{tech_stack_info["category"]}相关文章</p>
                <p>敬请期待更多内容...</p>
            </div>
            '''
        
        # 获取技术栈描述
        tech_stack_description = f"探索{tech_stack_info['category']}相关的技术文章和实践经验"
        if tech_stack_info.get('technologies'):
            tech_stack_description = f"深入了解{tech_stack_info['category']}技术栈，包含{', '.join(tech_stack_info['technologies'][:3])}等技术"
        
        html = template.replace('{{POSTS_LIST}}', posts_html)
        html = html.replace('{{NO_POSTS_MESSAGE}}', no_posts_message)
        html = html.replace('{{SITE_TITLE}}', self.config['site']['title'])
        html = html.replace('{{TECH_STACK_NAME}}', tech_stack_info['category'])
        html = html.replace('{{TECH_STACK_DESCRIPTION}}', tech_stack_description)
        html = html.replace('{{DESCRIPTION}}', f'{tech_stack_info["category"]}相关的技术分享与学习笔记')
        html = html.replace('{{KEYWORDS}}', f'{tech_stack_info["category"]}, ' + ', '.join(tech_stack_info['technologies']))
        html = html.replace('{{AUTHOR}}', self.config['site']['author'])
        html = html.replace('{{URL}}', self.config['site']['url'])
        html = html.replace('{{IMAGE}}', self.config['site']['avatar'])
        
        return html
    
    def build(self):
        """构建整个网站"""
        print("开始构建网站...")
        
        # 递归处理所有Markdown文件
        articles = []
        if self.posts_dir.exists():
            for md_file in self.posts_dir.rglob('*.md'):
                print(f"处理文件: {md_file.relative_to(self.posts_dir)}")
                article_info = self.process_markdown(md_file)
                articles.append(article_info)
                
                # 生成文章页面
                article_html = self.generate_article_page(article_info)
                output_file = self.docs_dir / f"{article_info['filename']}.html"
                with open(output_file, 'w', encoding='utf-8') as f:
                    f.write(article_html)
        
        # 生成总的文章列表页面
        posts_html = self.generate_posts_list(articles)
        with open(self.root_dir / 'posts.html', 'w', encoding='utf-8') as f:
            f.write(posts_html)
        
        # 创建tech-stacks目录
        tech_stacks_dir = self.root_dir / 'tech-stacks'
        tech_stacks_dir.mkdir(exist_ok=True)
        
        # 为每个技术栈生成专门的文章列表页面
        for stack in self.config['techStacks']:
            tech_posts_html = self.generate_tech_stack_posts_page(stack['slug'], articles)
            tech_posts_file = tech_stacks_dir / f"{stack['slug']}.html"
            with open(tech_posts_file, 'w', encoding='utf-8') as f:
                f.write(tech_posts_html)
        
        # 生成技术栈页面
        tech_stack_html = self.generate_tech_stack_page(articles)
        with open(self.root_dir / 'tech-stack.html', 'w', encoding='utf-8') as f:
            f.write(tech_stack_html)
        
        # 复制静态资源
        if (self.root_dir / 'assets').exists():
            if (self.docs_dir / 'assets').exists():
                shutil.rmtree(self.docs_dir / 'assets')
            shutil.copytree(self.root_dir / 'assets', self.docs_dir / 'assets')
        
        print(f"构建完成！共处理 {len(articles)} 篇文章")
        
        # 按技术栈统计文章数量
        tech_stats = {}
        for article in articles:
            tech_stack = article['tech_stack']
            tech_stats[tech_stack] = tech_stats.get(tech_stack, 0) + 1
        
        print("技术栈文章统计:")
        for tech, count in tech_stats.items():
            print(f"  {tech}: {count} 篇")

if __name__ == '__main__':
    processor = MarkdownProcessor()
    processor.build()