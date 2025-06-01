/**
 * 国际化模块 - 多语言支持
 * 支持中文和英文界面切换
 */

class I18n {
    constructor() {
        // 优先检查URL参数，然后是存储的语言，最后是浏览器语言
        const urlLanguage = this.detectLanguageFromUrl();
        const storedLanguage = this.getStoredLanguage();
        const browserLanguage = this.detectLanguage();
        
        // 调试信息
        console.log('I18n Language Detection:', {
            url: window.location.href,
            urlLanguage,
            storedLanguage,
            browserLanguage
        });
        
        // 如果URL中有语言参数，优先使用并保存
        if (urlLanguage) {
            this.currentLanguage = urlLanguage;
            this.setStoredLanguage(urlLanguage);
            console.log('Using URL language:', urlLanguage);
        } else {
            this.currentLanguage = storedLanguage || browserLanguage;
            console.log('Using stored/browser language:', this.currentLanguage);
        }
        
        this.translations = {
            'zh-CN': {
                // 页面标题和基本信息
                pageTitle: 'AI简历生成器 - Markdown转HTML简历工具',
                appName: 'AI简历生成器',
                
                // 导航栏
                backToHome: '返回首页',
                toggleTheme: '切换主题',
                toggleLayout: '切换布局',
                import: '导入',
                export: '导出HTML',
                
                // 编辑器标签
                markdownEditor: 'Markdown编辑器',
                styleSettings: '样式设置',
                clearContent: '清空内容',
                loadTemplate: '加载模板',
                
                // 预览区域
                livePreview: '实时预览',
                zoomOut: '缩小',
                zoomIn: '放大',
                fullscreen: '全屏预览',
                
                // 工具栏
                saveToLocal: '保存到本地存储',
                downloadMarkdown: '下载Markdown文件',
                copyHtml: '复制HTML代码',
                printResume: '打印简历',
                undo: '撤销',
                redo: '重做',
                
                // 设置面板
                templateSelection: '模板选择',
                classicTemplate: '经典模板',
                modernTemplate: '现代模板',
                minimalTemplate: '简约模板',
                colorTheme: '颜色主题',
                fontSettings: '字体设置',
                fontSize: '字体大小',
                lineHeight: '行高',
                pageSettings: '页面设置',
                pageMargin: '页面边距',
                normalMargin: '标准边距',
                narrowMargin: '窄边距',
                wideMargin: '宽边距',
                scrollSync: '滚动同步',
                scrollSyncHelp: '编辑器和预览面板滚动位置同步',
                
                // 导入模态框
                importMarkdown: '导入Markdown文件',
                dragDropFiles: '拖拽文件到此处或点击选择文件',
                selectFile: '选择文件',
                
                // 示例简历内容
                sampleName: '张三',
                samplePosition: '前端开发工程师',
                contactInfo: '联系方式',
                personalSummary: '个人简介',
                workExperience: '工作经验',
                skills: '技能专长',
                education: '教育背景',
                projects: '项目经验',
                
                // 示例内容
                sampleSummary: '具有5年前端开发经验的工程师，专注于React生态系统和现代Web技术...',
                sampleCompany1: 'ABC科技公司',
                sampleCompany2: 'XYZ互联网公司',
                samplePosition1: '高级前端开发工程师',
                samplePosition2: '前端开发工程师',
                sampleUniversity: '清华大学',
                sampleDegree: '计算机科学与技术学士',
                
                // 占位符文本
                editorPlaceholder: '在此输入您的Markdown简历内容...',
                
                // 消息提示
                fileSaved: '文件已保存到本地存储',
                exportSuccess: '导出成功',
                exportFailed: '导出失败',
                markdownDownloaded: 'Markdown文件已下载到本地',
                markdownDownloadFailed: '无法生成Markdown文件',
                htmlCopied: 'HTML代码已复制到剪贴板',
                fileImported: '文件导入成功',
                templateLoaded: '模板加载成功',
                
                // 导出和复制相关
                htmlDownloaded: 'HTML文件已下载到本地',
                htmlGenerationFailed: '无法生成HTML文件',
                copySuccess: '复制成功',
                copyFailed: '复制失败',
                htmlCopyFailed: '无法复制HTML代码',
                
                // 打印相关
                printPreparing: '准备打印',
                printPreviewOpening: '正在打开打印预览...',
                printFailed: '打印失败',
                printPreviewFailed: '无法打开打印预览',
                exportPdf: '导出PDF',
                selectSaveAsPdf: '请在打印对话框中选择"另存为PDF"',
                
                // 文件导入相关
                fileTypeError: '文件类型错误',
                selectMdOrTxtFile: '请选择.md或.txt文件',
                fileTooLarge: '文件过大',
                fileSizeLimit: '文件大小不能超过5MB',
                readFailed: '读取失败',
                cannotReadFile: '无法读取文件内容',
                importSuccess: '导入成功',
                fileImportedPrefix: '已导入文件: ',
                
                // 模板和主题切换消息
                templateUpdated: '模板已更新',
                themeUpdated: '主题已更新',
                templateSwitchedTo: '已切换到',
                themeSwitchedTo: '已切换到',
                templateSuffix: '模板',
                themeSuffix: '主题',
                themeToggled: '主题已切换',
                darkModeEnabled: '已切换到暗色模式',
                lightModeEnabled: '已切换到亮色模式',
                contentCleared: '内容已清空',
                editorContentCleared: '编辑器内容已清空',
                saveSuccess: '保存成功',
                resumeSavedLocally: '简历内容已保存到本地',
                scrollSyncEnabled: '滚动同步已开启',
                scrollSyncDisabled: '滚动同步已关闭',
                
                // 模板名称
                classicTemplateName: '经典',
                modernTemplateName: '现代',
                minimalTemplateName: '简约',
                
                // 主题名称
                blueThemeName: '蓝色',
                greenThemeName: '绿色',
                purpleThemeName: '紫色',
                redThemeName: '红色',
                grayThemeName: '灰色',
                
                // 语言选择
                language: '语言',
                chinese: '中文',
                english: 'English',
                
                // 模板选择器
                selectResumeTemplate: '选择简历模板',
                basicTemplate: '基础模板',
                basicTemplateDesc: '适合初入职场的求职者',
                basicTemplateTag1: '简洁',
                basicTemplateTag2: '通用',
                basicTemplateTag3: '入门',
                
                developerTemplate: '开发者模板',
                developerTemplateDesc: '专为软件开发工程师设计',
                developerTemplateTag1: '技术',
                developerTemplateTag2: '开发',
                developerTemplateTag3: '工程师',
                
                designerTemplate: '设计师模板',
                designerTemplateDesc: '适合UI/UX设计师和创意工作者',
                designerTemplateTag1: '设计',
                designerTemplateTag2: '创意',
                designerTemplateTag3: 'UI/UX',
                
                managerTemplate: '管理者模板',
                managerTemplateDesc: '适合团队领导和项目经理',
                managerTemplateTag1: '管理',
                managerTemplateTag2: '领导',
                managerTemplateTag3: '项目',
                
                confirmReplaceContent: '当前有内容，确定要替换为模板内容吗？',
                
                // 欢迎消息
                welcomeMessage: '欢迎使用AI简历生成器',
                welcomeDetail: '开始编辑您的Markdown简历吧！',
                languageChanged: '语言已切换为中文'
            },
            'en-US': {
                // Page title and basic info
                pageTitle: 'AI Resume Generator - Markdown to HTML Resume Tool',
                appName: 'AI Resume Generator',
                
                // Navigation
                backToHome: 'Back to Home',
                toggleTheme: 'Toggle Theme',
                toggleLayout: 'Toggle Layout',
                import: 'Import',
                export: 'Export HTML',
                
                // Editor tabs
                markdownEditor: 'Markdown Editor',
                styleSettings: 'Style Settings',
                clearContent: 'Clear Content',
                loadTemplate: 'Load Template',
                
                // Preview area
                livePreview: 'Live Preview',
                zoomOut: 'Zoom Out',
                zoomIn: 'Zoom In',
                fullscreen: 'Fullscreen Preview',
                
                // Toolbar
                saveToLocal: 'Save to Local Storage',
                downloadMarkdown: 'Download Markdown File',
                copyHtml: 'Copy HTML Code',
                printResume: 'Print Resume',
                undo: 'Undo',
                redo: 'Redo',
                
                // Settings panel
                templateSelection: 'Template Selection',
                classicTemplate: 'Classic Template',
                modernTemplate: 'Modern Template',
                minimalTemplate: 'Minimal Template',
                colorTheme: 'Color Theme',
                fontSettings: 'Font Settings',
                fontSize: 'Font Size',
                lineHeight: 'Line Height',
                pageSettings: 'Page Settings',
                pageMargin: 'Page Margin',
                normalMargin: 'Normal Margin',
                narrowMargin: 'Narrow Margin',
                wideMargin: 'Wide Margin',
                scrollSync: 'Scroll Sync',
                scrollSyncHelp: 'Sync editor and preview panel scroll positions',
                
                // Import modal
                importMarkdown: 'Import Markdown File',
                dragDropFiles: 'Drag files here or click to select files',
                selectFile: 'Select File',
                
                // Sample resume content
                sampleName: 'John Smith',
                samplePosition: 'Frontend Developer',
                contactInfo: 'Contact Information',
                personalSummary: 'Personal Summary',
                workExperience: 'Work Experience',
                skills: 'Skills',
                education: 'Education',
                projects: 'Projects',
                
                // Sample content
                sampleSummary: 'Frontend developer with 5 years of experience, specializing in React ecosystem and modern web technologies...',
                sampleCompany1: 'ABC Technology Company',
                sampleCompany2: 'XYZ Internet Company',
                samplePosition1: 'Senior Frontend Developer',
                samplePosition2: 'Frontend Developer',
                sampleUniversity: 'Tsinghua University',
                sampleDegree: 'Bachelor of Computer Science and Technology',
                
                // Placeholder text
                editorPlaceholder: 'Enter your Markdown resume content here...',
                
                // Messages
                fileSaved: 'File saved to local storage',
                exportSuccess: 'Export Successful',
                exportFailed: 'Export Failed',
                markdownDownloaded: 'Markdown file downloaded successfully',
                markdownDownloadFailed: 'Failed to generate Markdown file',
                htmlCopied: 'HTML code copied to clipboard',
                fileImported: 'File imported successfully',
                templateLoaded: 'Template loaded successfully',
                
                // Export and copy related
                htmlDownloaded: 'HTML file downloaded successfully',
                htmlGenerationFailed: 'Failed to generate HTML file',
                copySuccess: 'Copy Successful',
                copyFailed: 'Copy Failed',
                htmlCopyFailed: 'Failed to copy HTML code',
                
                // Print related
                printPreparing: 'Preparing to Print',
                printPreviewOpening: 'Opening print preview...',
                printFailed: 'Print Failed',
                printPreviewFailed: 'Failed to open print preview',
                exportPdf: 'Export PDF',
                selectSaveAsPdf: 'Please select "Save as PDF" in the print dialog',
                
                // File import related
                fileTypeError: 'File Type Error',
                selectMdOrTxtFile: 'Please select .md or .txt files',
                fileTooLarge: 'File Too Large',
                fileSizeLimit: 'File size cannot exceed 5MB',
                readFailed: 'Read Failed',
                cannotReadFile: 'Cannot read file content',
                importSuccess: 'Import Successful',
                fileImportedPrefix: 'Imported file: ',
                
                // Template and theme switching messages
                templateUpdated: 'Template updated',
                themeUpdated: 'Theme updated',
                templateSwitchedTo: 'Switched to',
                themeSwitchedTo: 'Switched to',
                templateSuffix: 'Template',
                themeSuffix: 'Theme',
                themeToggled: 'Theme switched',
                darkModeEnabled: 'Switched to dark mode',
                lightModeEnabled: 'Switched to light mode',
                contentCleared: 'Content cleared',
                editorContentCleared: 'Editor content cleared',
                saveSuccess: 'Save Successful',
                resumeSavedLocally: 'Resume content saved locally',
                scrollSyncEnabled: 'Scroll sync enabled',
                scrollSyncDisabled: 'Scroll sync disabled',
                
                // Template names
                classicTemplateName: 'Classic',
                modernTemplateName: 'Modern',
                minimalTemplateName: 'Minimal',
                
                // Theme names
                blueThemeName: 'Blue',
                greenThemeName: 'Green',
                purpleThemeName: 'Purple',
                redThemeName: 'Red',
                grayThemeName: 'Gray',
                
                // Language selection
                language: 'Language',
                chinese: '中文',
                english: 'English',
                
                // Template selector
                selectResumeTemplate: 'Select Resume Template',
                basicTemplate: 'Basic Template',
                basicTemplateDesc: 'Suitable for entry-level job seekers',
                basicTemplateTag1: 'Simple',
                basicTemplateTag2: 'Universal',
                basicTemplateTag3: 'Entry-level',
                
                developerTemplate: 'Developer Template',
                developerTemplateDesc: 'Designed for software engineers',
                developerTemplateTag1: 'Technical',
                developerTemplateTag2: 'Development',
                developerTemplateTag3: 'Engineering',
                
                designerTemplate: 'Designer Template',
                designerTemplateDesc: 'Suitable for UI/UX designers and creative workers',
                designerTemplateTag1: 'Design',
                designerTemplateTag2: 'Creative',
                designerTemplateTag3: 'UI/UX',
                
                managerTemplate: 'Manager Template',
                managerTemplateDesc: 'Suitable for team leaders and project managers',
                managerTemplateTag1: 'Management',
                managerTemplateTag2: 'Leadership',
                managerTemplateTag3: 'Project',
                
                confirmReplaceContent: 'Current content exists. Are you sure you want to replace it with template content?',
                
                // Welcome messages
                welcomeMessage: 'Welcome to AI Resume Generator',
                welcomeDetail: 'Start editing your Markdown resume!',
                languageChanged: 'Language switched to English'
            }
        };
        
        this.init();
    }
    
    /**
     * 初始化国际化
     */
    init() {
        this.createLanguageSelector();
        this.updatePageLanguage();
        this.bindEvents();
    }
    
    /**
     * 从URL参数检测语言
     */
    detectLanguageFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam === 'en' || langParam === 'en-US') {
            return 'en-US';
        } else if (langParam === 'zh' || langParam === 'zh-CN') {
            return 'zh-CN';
        }
        
        // 检查referrer是否来自英文版页面
        if (document.referrer.includes('landing-en.html')) {
            return 'en-US';
        }
        
        // 检查referrer是否来自中文版页面
        if (document.referrer.includes('index.html')) {
            return 'zh-CN';
        }
        
        return null;
    }
    
    /**
     * 检测浏览器语言
     */
    detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('zh') ? 'zh-CN' : 'en-US';
    }
    
    /**
     * 获取存储的语言设置
     */
    getStoredLanguage() {
        return localStorage.getItem('resumeGenerator_language');
    }
    
    /**
     * 存储语言设置
     */
    setStoredLanguage(language) {
        localStorage.setItem('resumeGenerator_language', language);
    }
    
    /**
     * 创建语言选择器
     */
    createLanguageSelector() {
        const header = document.querySelector('.header .nav-actions');
        if (!header) return;
        
        const languageSelector = document.createElement('div');
        languageSelector.className = 'language-selector';
        languageSelector.innerHTML = `
            <button class="btn btn-icon language-toggle" id="languageToggle" title="${this.t('language')}">
                <i class="fas fa-globe"></i>
                <span class="language-text">${this.currentLanguage === 'zh-CN' ? '中' : 'EN'}</span>
            </button>
            <div class="language-dropdown" id="languageDropdown">
                <div class="language-option ${this.currentLanguage === 'zh-CN' ? 'active' : ''}" data-lang="zh-CN">
                    <span class="flag">🇨🇳</span>
                    <span>${this.translations['zh-CN'].chinese}</span>
                </div>
                <div class="language-option ${this.currentLanguage === 'en-US' ? 'active' : ''}" data-lang="en-US">
                    <span class="flag">🇺🇸</span>
                    <span>${this.translations['en-US'].english}</span>
                </div>
            </div>
        `;
        
        // 插入到主题切换按钮之前
        const themeToggle = header.querySelector('#toggleTheme');
        header.insertBefore(languageSelector, themeToggle);
    }
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 语言切换按钮点击事件
        document.addEventListener('click', (e) => {
            const languageToggle = e.target.closest('#languageToggle');
            const languageOption = e.target.closest('.language-option');
            const dropdown = document.getElementById('languageDropdown');
            
            if (languageToggle) {
                dropdown.classList.toggle('show');
                e.stopPropagation();
            } else if (languageOption) {
                const newLanguage = languageOption.dataset.lang;
                this.switchLanguage(newLanguage);
                dropdown.classList.remove('show');
            } else {
                dropdown?.classList.remove('show');
            }
        });
    }
    
    /**
     * 切换语言
     */
    switchLanguage(language) {
        if (language === this.currentLanguage) return;
        
        this.currentLanguage = language;
        this.setStoredLanguage(language);
        this.updatePageLanguage();
        this.updateLanguageSelector();
        this.updateSampleContent();
        
        // 触发语言切换事件
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        }));
    }
    
    /**
     * 更新页面语言
     */
    updatePageLanguage() {
        // 更新HTML lang属性
        document.documentElement.lang = this.currentLanguage;
        
        // 更新页面标题
        document.title = this.t('pageTitle');
        
        // 更新所有带有data-i18n属性的元素
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.dataset.i18n;
            const text = this.t(key);
            if (text) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = text;
                } else if (element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });
        
        // 更新title属性
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.dataset.i18nTitle;
            const text = this.t(key);
            if (text) {
                element.title = text;
            }
        });
    }
    
    /**
     * 更新语言选择器
     */
    updateLanguageSelector() {
        const languageText = document.querySelector('.language-text');
        const languageOptions = document.querySelectorAll('.language-option');
        
        if (languageText) {
            languageText.textContent = this.currentLanguage === 'zh-CN' ? '中' : 'EN';
        }
        
        languageOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.lang === this.currentLanguage);
        });
    }
    
    /**
     * 更新示例内容
     */
    updateSampleContent() {
        const markdownInput = document.getElementById('markdownInput');
        if (!markdownInput) return;
        
        // 只有当编辑器为空或包含示例内容时才更新
        const currentContent = markdownInput.value.trim();
        if (currentContent === '' || this.isSampleContent(currentContent)) {
            markdownInput.value = this.getSampleContent();
            
            // 触发输入事件以更新预览
            markdownInput.dispatchEvent(new Event('input'));
        }
    }
    
    /**
     * 检查是否为示例内容
     */
    isSampleContent(content) {
        return content.includes('张三') || content.includes('John Smith') || 
               content.includes('前端开发工程师') || content.includes('Frontend Developer');
    }
    
    /**
     * 获取示例内容
     */
    getSampleContent() {
        if (this.currentLanguage === 'zh-CN') {
            return `# ${this.t('sampleName')}
**${this.t('samplePosition')}**

## ${this.t('contactInfo')}
- 📧 Email: zhangsan@example.com
- 📱 电话: +86 138-0000-0000
- 🏠 地址: 北京市朝阳区
- 💼 LinkedIn: linkedin.com/in/zhangsan
- 🐙 GitHub: github.com/zhangsan

## ${this.t('personalSummary')}
${this.t('sampleSummary')}

## ${this.t('workExperience')}

### ${this.t('samplePosition1')} | ${this.t('sampleCompany1')}
*2021.06 - 至今*

- 负责公司核心产品的前端架构设计和开发
- 使用React、TypeScript构建高性能的Web应用
- 优化页面性能，提升用户体验

### ${this.t('samplePosition2')} | ${this.t('sampleCompany2')}
*2019.03 - 2021.05*

- 参与多个项目的前端开发工作
- 与设计师和后端工程师协作完成产品功能

## ${this.t('skills')}
- **前端技术**: React, Vue.js, TypeScript, JavaScript
- **样式技术**: CSS3, Sass, Tailwind CSS
- **工具链**: Webpack, Vite, Git, Docker
- **其他**: Node.js, Express, MongoDB

## ${this.t('education')}

### ${this.t('sampleDegree')} | ${this.t('sampleUniversity')}
*2015.09 - 2019.06*

## ${this.t('projects')}

### 企业级管理系统
- 使用React + TypeScript开发的大型管理系统
- 实现了复杂的数据可视化和表单处理功能
- 支持多租户架构，服务超过10万用户

### 移动端电商应用
- 基于React Native开发的跨平台移动应用
- 集成支付、地图、推送等第三方服务
- 在App Store和Google Play获得4.8分评价`;
        } else {
            return `# ${this.t('sampleName')}
**${this.t('samplePosition')}**

## ${this.t('contactInfo')}
- 📧 Email: johnsmith@example.com
- 📱 Phone: +1 (555) 123-4567
- 🏠 Address: New York, NY
- 💼 LinkedIn: linkedin.com/in/johnsmith
- 🐙 GitHub: github.com/johnsmith

## ${this.t('personalSummary')}
${this.t('sampleSummary')}

## ${this.t('workExperience')}

### ${this.t('samplePosition1')} | ${this.t('sampleCompany1')}
*June 2021 - Present*

- Lead frontend architecture design and development for core products
- Build high-performance web applications using React and TypeScript
- Optimize page performance and enhance user experience

### ${this.t('samplePosition2')} | ${this.t('sampleCompany2')}
*March 2019 - May 2021*

- Participated in frontend development for multiple projects
- Collaborated with designers and backend engineers to deliver product features

## ${this.t('skills')}
- **Frontend Technologies**: React, Vue.js, TypeScript, JavaScript
- **Styling Technologies**: CSS3, Sass, Tailwind CSS
- **Toolchain**: Webpack, Vite, Git, Docker
- **Others**: Node.js, Express, MongoDB

## ${this.t('education')}

### ${this.t('sampleDegree')} | ${this.t('sampleUniversity')}
*September 2015 - June 2019*

## ${this.t('projects')}

### Enterprise Management System
- Large-scale management system developed with React + TypeScript
- Implemented complex data visualization and form processing features
- Supports multi-tenant architecture, serving over 100,000 users

### Mobile E-commerce Application
- Cross-platform mobile app developed with React Native
- Integrated payment, maps, push notifications and other third-party services
- Achieved 4.8-star rating on App Store and Google Play`;
        }
    }
    
    /**
     * 获取翻译文本
     */
    t(key) {
        return this.translations[this.currentLanguage]?.[key] || key;
    }
    
    /**
     * 获取当前语言
     */
    getCurrentLanguage() {
        return this.currentLanguage;
    }
}

// 创建全局实例
window.i18n = new I18n();

// 当DOM加载完成后初始化i18n
document.addEventListener('DOMContentLoaded', () => {
    window.i18n.init();
}); 