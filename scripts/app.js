/**
 * AI简历生成器 - 主应用文件
 * 负责应用初始化、事件监听和核心功能协调
 */

class ResumeApp {
    constructor() {
        this.currentTemplate = 'classic';
        this.currentTheme = 'blue';
        this.currentZoom = 100;
        this.isDarkMode = false;
        this.isLayoutVertical = false;
        this.undoStack = [];
        this.redoStack = [];
        this.maxUndoSteps = 50;
        
        // 字体设置默认值
        this.fontSize = 16;
        this.lineHeight = 1.6;
        this.pageMargin = 'normal';
        
        // 滚动同步设置
        this.isScrollSyncEnabled = true;
        
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        this.initializeElements();
        this.bindEvents();
        this.loadFromLocalStorage();
        this.initializeFontSettings();
        this.updatePreview();
        this.updateBackToHomeLink();
        this.showWelcomeToast();
        
        // 监听语言切换事件
        window.addEventListener('languageChanged', (e) => {
            this.handleLanguageChange(e.detail.language);
        });
    }

    /**
     * 初始化DOM元素引用
     */
    initializeElements() {
        // 编辑器元素
        this.markdownInput = document.getElementById('markdownInput');
        this.previewContent = document.getElementById('previewContent');
        this.previewContainer = document.querySelector('.preview-container');
        
        // 标签页元素
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        // 按钮元素
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.saveBtn = document.getElementById('saveBtn');
        this.clearBtn = document.getElementById('clearBtn');
        this.copyHtmlBtn = document.getElementById('copyHtmlBtn');
        this.printBtn = document.getElementById('printBtn');
        this.undoBtn = document.getElementById('undoBtn');
        this.redoBtn = document.getElementById('redoBtn');
        this.toggleThemeBtn = document.getElementById('toggleTheme');
        this.toggleLayoutBtn = document.getElementById('toggleLayout');
        this.loadTemplateBtn = document.getElementById('loadTemplateBtn');
        this.backToHomeBtn = document.getElementById('backToHomeBtn');
        
        // 预览控制元素
        this.zoomInBtn = document.getElementById('zoomInBtn');
        this.zoomOutBtn = document.getElementById('zoomOutBtn');
        this.fullscreenBtn = document.getElementById('fullscreenBtn');
        this.zoomLevel = document.querySelector('.zoom-level');
        
        // 设置元素
        this.templateCards = document.querySelectorAll('.template-card');
        this.colorOptions = document.querySelectorAll('.color-option');
        this.fontSizeRange = document.getElementById('fontSizeRange');
        this.lineHeightRange = document.getElementById('lineHeightRange');
        this.marginSelect = document.getElementById('marginSelect');
        this.scrollSyncToggle = document.getElementById('scrollSyncToggle');
        
        // 模态框元素
        this.importModal = document.getElementById('importModal');
        this.fileInput = document.getElementById('fileInput');
        this.fileDropZone = document.getElementById('fileDropZone');
        this.toastContainer = document.getElementById('toastContainer');
    }

    /**
     * 绑定事件监听器
     */
    bindEvents() {
        // 编辑器事件
        this.markdownInput.addEventListener('input', this.debounce(() => {
            this.saveToUndoStack();
            this.updatePreview();
            this.saveToLocalStorage();
        }, 300));

        // 标签页切换
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // 确保获取按钮元素的dataset.tab，而不是子元素的
                const button = e.currentTarget;
                this.switchTab(button.dataset.tab);
            });
        });

        // 主要功能按钮
        this.exportBtn.addEventListener('click', () => this.exportHTML());
        this.importBtn.addEventListener('click', () => this.showImportModal());
        this.saveBtn.addEventListener('click', () => this.exportMarkdown());
        this.clearBtn.addEventListener('click', () => this.clearContent());
        this.copyHtmlBtn.addEventListener('click', () => this.copyHTML());
        this.printBtn.addEventListener('click', () => this.printResume());
        this.undoBtn.addEventListener('click', () => this.undo());
        this.redoBtn.addEventListener('click', () => this.redo());
        this.toggleThemeBtn.addEventListener('click', () => this.toggleTheme());
        this.toggleLayoutBtn.addEventListener('click', () => this.toggleLayout());
        this.loadTemplateBtn.addEventListener('click', () => this.loadTemplate());

        // 预览控制
        this.zoomInBtn.addEventListener('click', () => this.zoomIn());
        this.zoomOutBtn.addEventListener('click', () => this.zoomOut());
        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());

        // 模板选择
        this.templateCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectTemplate(e.currentTarget.dataset.template);
            });
        });

        // 颜色主题选择
        this.colorOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                this.selectTheme(e.currentTarget.dataset.color);
            });
        });

        // 字体设置
        this.fontSizeRange.addEventListener('input', (e) => {
            this.updateFontSize(e.target.value);
        });

        this.lineHeightRange.addEventListener('input', (e) => {
            this.updateLineHeight(e.target.value);
        });

        this.marginSelect.addEventListener('change', (e) => {
            this.updateMargin(e.target.value);
        });

        // 滚动同步开关
        this.scrollSyncToggle.addEventListener('change', (e) => {
            this.toggleScrollSync(e.target.checked);
        });

        // 文件导入
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // 拖拽上传
        this.setupDragAndDrop();

        // 模态框关闭
        document.addEventListener('click', (e) => {
            // 检查是否点击了关闭按钮或其子元素
            if (e.target.closest('.modal-close') || e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));

        // 窗口大小变化
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // 页面卸载前保存
        window.addEventListener('beforeunload', () => {
            this.saveToLocalStorage();
        });

        // 滚动同步功能
        this.setupScrollSync();
    }

    /**
     * 设置滚动同步功能
     */
    setupScrollSync() {
        // 防抖标志，避免循环触发
        this.isScrollSyncing = false;
        
        // 创建防抖函数
        const debouncedSyncToPreview = this.debounce(() => {
            if (this.isScrollSyncing || !this.isScrollSyncEnabled) return;
            this.syncScrollToPreview();
        }, 16); // 约60fps的更新频率
        
        const debouncedSyncToEditor = this.debounce(() => {
            if (this.isScrollSyncing || !this.isScrollSyncEnabled) return;
            this.syncScrollToEditor();
        }, 16);
        
        // 监听编辑器滚动事件
        this.markdownInput.addEventListener('scroll', debouncedSyncToPreview);
        
        // 监听预览面板滚动事件（双向同步）
        this.previewContainer.addEventListener('scroll', debouncedSyncToEditor);
        
        // 存储事件处理器引用，以便后续清理
        this.scrollSyncHandlers = {
            editorScroll: debouncedSyncToPreview,
            previewScroll: debouncedSyncToEditor
        };
    }

    /**
     * 将编辑器滚动位置同步到预览面板
     */
    syncScrollToPreview() {
        if (!this.markdownInput || !this.previewContainer) return;
        
        this.isScrollSyncing = true;
        
        // 计算编辑器滚动百分比
        const editorScrollTop = this.markdownInput.scrollTop;
        const editorScrollHeight = this.markdownInput.scrollHeight - this.markdownInput.clientHeight;
        const scrollPercentage = editorScrollHeight > 0 ? editorScrollTop / editorScrollHeight : 0;
        
        // 应用到预览面板
        const previewScrollHeight = this.previewContainer.scrollHeight - this.previewContainer.clientHeight;
        const targetScrollTop = scrollPercentage * previewScrollHeight;
        
        // 使用requestAnimationFrame确保平滑滚动
        requestAnimationFrame(() => {
            this.previewContainer.scrollTop = targetScrollTop;
            this.isScrollSyncing = false;
        });
    }

    /**
     * 将预览面板滚动位置同步到编辑器（可选功能）
     */
    syncScrollToEditor() {
        if (!this.markdownInput || !this.previewContainer) return;
        
        this.isScrollSyncing = true;
        
        // 计算预览面板滚动百分比
        const previewScrollTop = this.previewContainer.scrollTop;
        const previewScrollHeight = this.previewContainer.scrollHeight - this.previewContainer.clientHeight;
        const scrollPercentage = previewScrollHeight > 0 ? previewScrollTop / previewScrollHeight : 0;
        
        // 应用到编辑器
        const editorScrollHeight = this.markdownInput.scrollHeight - this.markdownInput.clientHeight;
        const targetScrollTop = scrollPercentage * editorScrollHeight;
        
        // 使用requestAnimationFrame确保平滑滚动
        requestAnimationFrame(() => {
            this.markdownInput.scrollTop = targetScrollTop;
            this.isScrollSyncing = false;
        });
    }

    /**
     * 清理滚动同步事件监听器
     */
    cleanupScrollSync() {
        if (this.scrollSyncHandlers) {
            this.markdownInput.removeEventListener('scroll', this.scrollSyncHandlers.editorScroll);
            this.previewContainer.removeEventListener('scroll', this.scrollSyncHandlers.previewScroll);
            this.scrollSyncHandlers = null;
        }
    }

    /**
     * 切换标签页
     */
    switchTab(tabName) {
        if (!tabName) {
            console.error('switchTab: tabName is undefined');
            return;
        }

        // 更新标签按钮状态
        this.tabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        // 更新标签内容显示
        this.tabContents.forEach(content => {
            const expectedId = `${tabName}Tab`;
            content.classList.toggle('active', content.id === expectedId);
        });
    }

    /**
     * 更新预览内容
     */
    updatePreview() {
        const markdownText = this.markdownInput.value;
        const htmlContent = marked.parse(markdownText);
        
        // 应用模板和主题
        const templateClass = `resume-template-${this.currentTemplate}`;
        const themeClass = `theme-${this.currentTheme}`;
        
        this.previewContent.innerHTML = `
            <div class="resume-content ${templateClass} ${themeClass}">
                ${this.processHTML(htmlContent)}
            </div>
        `;

        // 应用缩放
        this.applyZoom();
        
        // 更新撤销重做按钮状态
        this.updateUndoRedoButtons();
    }

    /**
     * 处理HTML内容，添加特殊样式
     */
    processHTML(html) {
        // 处理联系信息
        html = html.replace(
            /- 📧 Email: (.+)/g,
            '<div class="contact-item"><i class="fas fa-envelope"></i><span>$1</span></div>'
        );
        html = html.replace(
            /- 📱 电话: (.+)/g,
            '<div class="contact-item"><i class="fas fa-phone"></i><span>$1</span></div>'
        );
        html = html.replace(
            /- 🏠 地址: (.+)/g,
            '<div class="contact-item"><i class="fas fa-map-marker-alt"></i><span>$1</span></div>'
        );
        html = html.replace(
            /- 💼 LinkedIn: (.+)/g,
            '<div class="contact-item"><i class="fab fa-linkedin"></i><span>$1</span></div>'
        );
        html = html.replace(
            /- 🐙 GitHub: (.+)/g,
            '<div class="contact-item"><i class="fab fa-github"></i><span>$1</span></div>'
        );

        // 包装联系信息
        html = html.replace(
            /(<div class="contact-item">.*?<\/div>\s*)+/gs,
            '<div class="contact-info">$&</div>'
        );

        // 处理工作经验项目
        html = html.replace(
            /<h3>(.+?) \| (.+?)<\/h3>\s*<p><em>(.+?)<\/em><\/p>/g,
            '<div class="experience-item"><h3 class="job-title">$1</h3><h4 class="company">$2</h4><p class="date">$3</p>'
        );

        return html;
    }

    /**
     * 选择模板
     */
    selectTemplate(template) {
        this.currentTemplate = template;
        
        // 更新模板卡片状态
        this.templateCards.forEach(card => {
            card.classList.toggle('active', card.dataset.template === template);
        });
        
        this.updatePreview();
        this.saveToLocalStorage();
        
        // 使用国际化函数显示提示
        const templateUpdated = window.i18n ? window.i18n.t('templateUpdated') : '模板已更新';
        const templateSwitchedTo = window.i18n ? window.i18n.t('templateSwitchedTo') : '已切换到';
        const templateName = this.getTemplateName(template);
        const templateSuffix = window.i18n ? window.i18n.t('templateSuffix') : '模板';
        
        this.showToast('success', templateUpdated, `${templateSwitchedTo}${templateName}${templateSuffix}`);
    }

    /**
     * 选择主题颜色
     */
    selectTheme(theme) {
        this.currentTheme = theme;
        
        // 更新颜色选项状态
        this.colorOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.color === theme);
        });
        
        this.updatePreview();
        this.saveToLocalStorage();
        
        // 使用国际化函数显示提示
        const themeUpdated = window.i18n ? window.i18n.t('themeUpdated') : '主题已更新';
        const themeSwitchedTo = window.i18n ? window.i18n.t('themeSwitchedTo') : '已切换到';
        const themeName = this.getThemeName(theme);
        const themeSuffix = window.i18n ? window.i18n.t('themeSuffix') : '主题';
        
        this.showToast('success', themeUpdated, `${themeSwitchedTo}${themeName}${themeSuffix}`);
    }

    /**
     * 更新字体大小
     */
    updateFontSize(size) {
        document.documentElement.style.setProperty('--resume-font-size', `${size}px`);
        document.querySelector('#fontSizeRange + .range-value').textContent = `${size}px`;
        this.fontSize = parseInt(size);
        this.updatePreview();
    }

    /**
     * 更新行高
     */
    updateLineHeight(height) {
        document.documentElement.style.setProperty('--resume-line-height', height);
        document.querySelector('#lineHeightRange + .range-value').textContent = height;
        this.lineHeight = parseFloat(height);
        this.updatePreview();
    }

    /**
     * 更新页面边距
     */
    updateMargin(margin) {
        const margins = {
            narrow: '1rem',
            normal: '2rem',
            wide: '3rem'
        };
        
        document.documentElement.style.setProperty('--resume-margin', margins[margin]);
        this.pageMargin = margin;
        this.updatePreview();
    }

    /**
     * 初始化字体设置
     */
    initializeFontSettings() {
        // 设置字体大小
        this.updateFontSize(this.fontSize);
        this.fontSizeRange.value = this.fontSize;
        
        // 设置行高
        this.updateLineHeight(this.lineHeight);
        this.lineHeightRange.value = this.lineHeight;
        
        // 设置页面边距
        this.updateMargin(this.pageMargin);
        this.marginSelect.value = this.pageMargin;
        
        // 设置滚动同步开关
        this.scrollSyncToggle.checked = this.isScrollSyncEnabled;
    }

    /**
     * 缩放功能
     */
    zoomIn() {
        if (this.currentZoom < 200) {
            this.currentZoom += 10;
            this.applyZoom();
        }
    }

    zoomOut() {
        if (this.currentZoom > 50) {
            this.currentZoom -= 10;
            this.applyZoom();
        }
    }

    applyZoom() {
        const scale = this.currentZoom / 100;
        this.previewContent.style.transform = `scale(${scale})`;
        this.zoomLevel.textContent = `${this.currentZoom}%`;
    }

    /**
     * 全屏预览
     */
    toggleFullscreen() {
        const previewPanel = document.querySelector('.preview-panel');
        
        if (previewPanel.classList.contains('fullscreen')) {
            previewPanel.classList.remove('fullscreen');
            this.fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        } else {
            previewPanel.classList.add('fullscreen');
            this.fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        }
    }

    /**
     * 切换主题（明暗模式）
     */
    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
        
        const icon = this.toggleThemeBtn.querySelector('i');
        icon.className = this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        
        this.saveToLocalStorage();
        
        // 使用国际化函数显示提示
        const themeToggled = window.i18n ? window.i18n.t('themeToggled') : '主题已切换';
        const modeMessage = this.isDarkMode 
            ? (window.i18n ? window.i18n.t('darkModeEnabled') : '已切换到暗色模式')
            : (window.i18n ? window.i18n.t('lightModeEnabled') : '已切换到亮色模式');
        
        this.showToast('info', themeToggled, modeMessage);
    }

    /**
     * 切换布局
     */
    toggleLayout() {
        this.isLayoutVertical = !this.isLayoutVertical;
        const mainContent = document.querySelector('.main-content');
        
        if (this.isLayoutVertical) {
            mainContent.style.gridTemplateAreas = '"editor" "preview"';
            mainContent.style.gridTemplateColumns = '1fr';
            mainContent.style.gridTemplateRows = '1fr 1fr';
        } else {
            mainContent.style.gridTemplateAreas = '"editor preview"';
            mainContent.style.gridTemplateColumns = '1fr 1fr';
            mainContent.style.gridTemplateRows = '1fr';
        }
        
        const icon = this.toggleLayoutBtn.querySelector('i');
        icon.className = this.isLayoutVertical ? 'fas fa-columns' : 'fas fa-rows';
        
        this.saveToLocalStorage();
    }

    /**
     * 撤销重做功能
     */
    saveToUndoStack() {
        const currentContent = this.markdownInput.value;
        
        // 避免重复保存相同内容
        if (this.undoStack.length === 0 || this.undoStack[this.undoStack.length - 1] !== currentContent) {
            this.undoStack.push(currentContent);
            
            // 限制撤销栈大小
            if (this.undoStack.length > this.maxUndoSteps) {
                this.undoStack.shift();
            }
            
            // 清空重做栈
            this.redoStack = [];
        }
    }

    undo() {
        if (this.undoStack.length > 1) {
            const currentContent = this.undoStack.pop();
            this.redoStack.push(currentContent);
            
            const previousContent = this.undoStack[this.undoStack.length - 1];
            this.markdownInput.value = previousContent;
            this.updatePreview();
            this.updateUndoRedoButtons();
        }
    }

    redo() {
        if (this.redoStack.length > 0) {
            const content = this.redoStack.pop();
            this.undoStack.push(content);
            
            this.markdownInput.value = content;
            this.updatePreview();
            this.updateUndoRedoButtons();
        }
    }

    updateUndoRedoButtons() {
        this.undoBtn.disabled = this.undoStack.length <= 1;
        this.redoBtn.disabled = this.redoStack.length === 0;
    }

    /**
     * 本地存储功能
     */
    saveToLocalStorage(showToast = false) {
        const data = {
            content: this.markdownInput.value,
            template: this.currentTemplate,
            theme: this.currentTheme,
            zoom: this.currentZoom,
            isDarkMode: this.isDarkMode,
            isLayoutVertical: this.isLayoutVertical,
            fontSize: this.fontSize,
            lineHeight: this.lineHeight,
            pageMargin: this.pageMargin,
            isScrollSyncEnabled: this.isScrollSyncEnabled,
            timestamp: Date.now()
        };
        
        localStorage.setItem('resumeApp', JSON.stringify(data));
        
        if (showToast) {
            // 使用国际化函数显示提示
            const saveSuccess = window.i18n ? window.i18n.t('saveSuccess') : '保存成功';
            const resumeSavedLocally = window.i18n ? window.i18n.t('resumeSavedLocally') : '简历内容已保存到本地';
            
            this.showToast('success', saveSuccess, resumeSavedLocally);
        }
    }

    loadFromLocalStorage() {
        const saved = localStorage.getItem('resumeApp');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                
                this.markdownInput.value = data.content || '';
                this.currentTemplate = data.template || 'classic';
                this.currentTheme = data.theme || 'blue';
                this.currentZoom = data.zoom || 100;
                this.isDarkMode = data.isDarkMode || false;
                this.isLayoutVertical = data.isLayoutVertical || false;
                this.fontSize = data.fontSize || 16;
                this.lineHeight = data.lineHeight || 1.6;
                this.pageMargin = data.pageMargin || 'normal';
                this.isScrollSyncEnabled = data.isScrollSyncEnabled || true;
                
                // 应用设置
                this.selectTemplate(this.currentTemplate);
                this.selectTheme(this.currentTheme);
                this.applyZoom();
                
                if (this.isDarkMode) {
                    this.toggleTheme();
                }
                
                if (this.isLayoutVertical) {
                    this.toggleLayout();
                }
                
                // 初始化撤销栈
                this.saveToUndoStack();
                
            } catch (error) {
                console.error('加载本地存储失败:', error);
            }
        } else {
            // 如果没有保存的数据，加载示例内容
            if (window.i18n && typeof window.i18n.getSampleContent === 'function') {
                this.markdownInput.value = window.i18n.getSampleContent();
            }
            // 初始化撤销栈
            this.saveToUndoStack();
        }
    }

    /**
     * 清空内容
     */
    clearContent() {
        if (confirm('确定要清空所有内容吗？此操作不可撤销。')) {
            this.saveToUndoStack();
            this.markdownInput.value = '';
            this.updatePreview();
            this.saveToLocalStorage();
            
            // 使用国际化函数显示提示
            const contentCleared = window.i18n ? window.i18n.t('contentCleared') : '内容已清空';
            const editorContentCleared = window.i18n ? window.i18n.t('editorContentCleared') : '编辑器内容已清空';
            
            this.showToast('info', contentCleared, editorContentCleared);
        }
    }

    /**
     * 工具函数
     */
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
    }

    getTemplateName(template) {
        if (window.i18n) {
            const nameKeys = {
                classic: 'classicTemplateName',
                modern: 'modernTemplateName',
                minimal: 'minimalTemplateName'
            };
            return window.i18n.t(nameKeys[template]) || template;
        }
        
        // 降级处理
        const names = {
            classic: '经典',
            modern: '现代',
            minimal: '简约'
        };
        return names[template] || template;
    }

    getThemeName(theme) {
        if (window.i18n) {
            const nameKeys = {
                blue: 'blueThemeName',
                green: 'greenThemeName',
                purple: 'purpleThemeName',
                red: 'redThemeName',
                gray: 'grayThemeName'
            };
            return window.i18n.t(nameKeys[theme]) || theme;
        }
        
        // 降级处理
        const names = {
            blue: '蓝色',
            green: '绿色',
            purple: '紫色',
            red: '红色',
            gray: '灰色'
        };
        return names[theme] || theme;
    }

    /**
     * 显示欢迎提示
     */
    showWelcomeToast() {
        setTimeout(() => {
            const message = window.i18n ? window.i18n.t('welcomeMessage') || '欢迎使用AI简历生成器' : '欢迎使用AI简历生成器';
            const detail = window.i18n ? window.i18n.t('welcomeDetail') || '开始编辑您的Markdown简历吧！' : '开始编辑您的Markdown简历吧！';
            this.showToast('info', message, detail);
        }, 1000);
    }

    /**
     * 处理语言切换
     */
    handleLanguageChange(language) {
        // 更新选项文本
        this.updateSelectOptions();
        
        // 更新Back to Home按钮链接
        this.updateBackToHomeLink();
        
        // 显示语言切换成功消息
        if (language) {
            const message = window.i18n.t('languageChanged') || '语言已切换';
            this.showToast('success', message);
        }
    }

    /**
     * 更新选择框选项
     */
    updateSelectOptions() {
        if (this.marginSelect && window.i18n) {
            const options = this.marginSelect.querySelectorAll('option');
            options.forEach(option => {
                const key = option.dataset.i18n;
                if (key) {
                    option.textContent = window.i18n.t(key);
                }
            });
        }
    }

    /**
     * 响应式处理
     */
    handleResize() {
        // 在移动设备上自动切换到垂直布局
        if (window.innerWidth <= 768 && !this.isLayoutVertical) {
            this.toggleLayout();
        }
    }

    /**
     * 键盘快捷键
     */
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 's':
                    e.preventDefault();
                    this.exportMarkdown();
                    break;
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        this.redo();
                    } else {
                        this.undo();
                    }
                    break;
                case 'p':
                    e.preventDefault();
                    this.printResume();
                    break;
                case 'e':
                    e.preventDefault();
                    this.exportHTML();
                    break;
            }
        }
    }

    /**
     * 切换滚动同步功能
     */
    toggleScrollSync(enabled) {
        this.isScrollSyncEnabled = enabled;
        this.saveToLocalStorage();
        
        // 显示提示信息
        const message = enabled 
            ? (window.i18n ? window.i18n.t('scrollSyncEnabled') : '滚动同步已开启')
            : (window.i18n ? window.i18n.t('scrollSyncDisabled') : '滚动同步已关闭');
        
        this.showToast('info', 
            window.i18n ? window.i18n.t('scrollSync') : '滚动同步', 
            message);
    }

    /**
     * 更新Back to Home按钮链接
     */
    updateBackToHomeLink() {
        if (this.backToHomeBtn && window.i18n) {
            const currentLanguage = window.i18n.getCurrentLanguage();
            if (currentLanguage === 'en-US') {
                this.backToHomeBtn.href = 'landing-en.html';
            } else {
                this.backToHomeBtn.href = 'index.html';
            }
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.resumeApp = new ResumeApp();
}); 