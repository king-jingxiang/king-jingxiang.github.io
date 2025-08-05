// 主题切换功能
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.innerHTML = this.theme === 'dark' ? '☀️' : '🌙';
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.theme);
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }
}

// 搜索功能
class SearchManager {
    constructor() {
        this.posts = [];
        this.init();
    }

    async init() {
        await this.loadPosts();
        this.bindEvents();
    }

    async loadPosts() {
        try {
            // 这里可以从API或JSON文件加载文章数据
            // 暂时使用静态数据
            this.posts = [];
        } catch (error) {
            console.error('加载文章数据失败:', error);
        }
    }

    search(query) {
        if (!query.trim()) {
            return this.posts;
        }

        const searchTerm = query.toLowerCase();
        return this.posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.content.toLowerCase().includes(searchTerm) ||
            post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    bindEvents() {
        const searchInput = document.querySelector('#search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const results = this.search(e.target.value);
                this.displayResults(results);
            });
        }
    }

    displayResults(results) {
        const resultsContainer = document.querySelector('#search-results');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p>没有找到相关文章</p>';
            return;
        }

        const html = results.map(post => `
            <article class="post-item">
                <h3><a href="docs/${post.filename}.html">${post.title}</a></h3>
                <div class="post-meta">
                    <span class="date">${post.date}</span>
                    <span class="category">${post.category}</span>
                </div>
                <div class="tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </article>
        `).join('');

        resultsContainer.innerHTML = html;
    }
}

// 导航高亮
class NavigationManager {
    constructor() {
        this.init();
    }

    init() {
        this.highlightCurrentPage();
    }

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath.includes(href) || (currentPath === '/' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// 平滑滚动
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // 为所有内部链接添加平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// 动画管理器
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.observeElements();
    }

    observeElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察需要动画的元素
        document.querySelectorAll('.tech-category, .post-item, .hero').forEach(el => {
            observer.observe(el);
        });
    }
}

// 代码复制功能
class CodeCopyManager {
    constructor() {
        this.init();
    }

    init() {
        this.addCopyButtons();
    }

    addCopyButtons() {
        document.querySelectorAll('pre code').forEach(codeBlock => {
            const button = document.createElement('button');
            button.className = 'copy-button';
            button.textContent = '复制';
            button.addEventListener('click', () => this.copyCode(codeBlock, button));

            const pre = codeBlock.parentElement;
            pre.style.position = 'relative';
            pre.appendChild(button);
        });
    }

    async copyCode(codeBlock, button) {
        try {
            await navigator.clipboard.writeText(codeBlock.textContent);
            button.textContent = '已复制!';
            setTimeout(() => {
                button.textContent = '复制';
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
            button.textContent = '复制失败';
            setTimeout(() => {
                button.textContent = '复制';
            }, 2000);
        }
    }
}

// 返回顶部按钮
class BackToTopManager {
    constructor() {
        this.button = null;
        this.init();
    }

    init() {
        this.createButton();
        this.bindEvents();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.className = 'back-to-top';
        this.button.innerHTML = '↑';
        this.button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            font-size: 1.2rem;
            font-weight: bold;
        `;
        document.body.appendChild(this.button);
    }

    bindEvents() {
        // 滚动显示/隐藏按钮
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.style.opacity = '1';
                this.button.style.visibility = 'visible';
            } else {
                this.button.style.opacity = '0';
                this.button.style.visibility = 'hidden';
            }
        });

        // 点击返回顶部
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new SearchManager();
    new NavigationManager();
    new SmoothScrollManager();
    new AnimationManager();
    new CodeCopyManager();
    new BackToTopManager();
});

// 工具函数
const utils = {
    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // 截取文本
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    },

    // 防抖函数
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // 节流函数
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 导出到全局
window.utils = utils;