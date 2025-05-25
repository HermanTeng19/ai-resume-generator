/**
 * UI工具模块
 * 负责Toast通知、模态框、加载状态等UI相关功能
 */

// 扩展ResumeApp类的UI工具功能
Object.assign(ResumeApp.prototype, {
    /**
     * 显示Toast通知
     */
    showToast(type, title, message, duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const iconMap = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="${iconMap[type]}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // 添加到容器
        this.toastContainer.appendChild(toast);
        
        // 添加动画
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });
        
        // 绑定关闭事件
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            this.hideToast(toast);
        });
        
        // 自动关闭
        if (duration > 0) {
            setTimeout(() => {
                this.hideToast(toast);
            }, duration);
        }
        
        return toast;
    },

    /**
     * 隐藏Toast通知
     */
    hideToast(toast) {
        if (!toast || !toast.parentNode) return;
        
        toast.classList.add('hide');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    },

    /**
     * 清除所有Toast通知
     */
    clearAllToasts() {
        const toasts = this.toastContainer.querySelectorAll('.toast');
        toasts.forEach(toast => this.hideToast(toast));
    },

    /**
     * 显示加载状态
     */
    showLoading(message = '加载中...') {
        // 移除现有的加载状态
        this.hideLoading();
        
        const loading = document.createElement('div');
        loading.className = 'loading-overlay';
        loading.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner">
                    <div class="spinner"></div>
                </div>
                <div class="loading-message">${message}</div>
            </div>
        `;
        
        document.body.appendChild(loading);
        
        // 添加动画
        requestAnimationFrame(() => {
            loading.classList.add('show');
        });
        
        return loading;
    },

    /**
     * 隐藏加载状态
     */
    hideLoading() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.classList.add('hide');
            setTimeout(() => {
                if (loading.parentNode) {
                    loading.parentNode.removeChild(loading);
                }
            }, 300);
        }
    },

    /**
     * 显示确认对话框
     */
    showConfirmDialog(title, message, onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content confirm-dialog">
                <div class="modal-header">
                    <h3>${title}</h3>
                </div>
                <div class="modal-body">
                    <p>${message}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary cancel-btn">取消</button>
                    <button class="btn btn-primary confirm-btn">确认</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定事件
        const confirmBtn = modal.querySelector('.confirm-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        
        confirmBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            if (onConfirm) onConfirm();
        });
        
        cancelBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
            if (onCancel) onCancel();
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
                if (onCancel) onCancel();
            }
        });
        
        // ESC键关闭
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escHandler);
                if (onCancel) onCancel();
            }
        };
        document.addEventListener('keydown', escHandler);
        
        return modal;
    },

    /**
     * 显示输入对话框
     */
    showInputDialog(title, placeholder, defaultValue = '', onConfirm, onCancel) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content input-dialog">
                <div class="modal-header">
                    <h3>${title}</h3>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <input type="text" class="form-input" placeholder="${placeholder}" value="${defaultValue}">
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary cancel-btn">取消</button>
                    <button class="btn btn-primary confirm-btn">确认</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const input = modal.querySelector('.form-input');
        const confirmBtn = modal.querySelector('.confirm-btn');
        const cancelBtn = modal.querySelector('.cancel-btn');
        
        // 聚焦输入框
        setTimeout(() => {
            input.focus();
            input.select();
        }, 100);
        
        // 绑定事件
        const handleConfirm = () => {
            const value = input.value.trim();
            document.body.removeChild(modal);
            if (onConfirm) onConfirm(value);
        };
        
        const handleCancel = () => {
            document.body.removeChild(modal);
            if (onCancel) onCancel();
        };
        
        confirmBtn.addEventListener('click', handleConfirm);
        cancelBtn.addEventListener('click', handleCancel);
        
        // 回车确认
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleConfirm();
            } else if (e.key === 'Escape') {
                handleCancel();
            }
        });
        
        // 点击背景关闭
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                handleCancel();
            }
        });
        
        return modal;
    },

    /**
     * 显示进度条
     */
    showProgress(title, initialProgress = 0) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content progress-dialog">
                <div class="modal-header">
                    <h3>${title}</h3>
                </div>
                <div class="modal-body">
                    <div class="progress-container">
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${initialProgress}%"></div>
                        </div>
                        <div class="progress-text">${initialProgress}%</div>
                    </div>
                    <div class="progress-message">正在处理...</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        const progressFill = modal.querySelector('.progress-fill');
        const progressText = modal.querySelector('.progress-text');
        const progressMessage = modal.querySelector('.progress-message');
        
        return {
            modal,
            updateProgress: (progress, message) => {
                progressFill.style.width = `${progress}%`;
                progressText.textContent = `${progress}%`;
                if (message) {
                    progressMessage.textContent = message;
                }
            },
            close: () => {
                if (modal.parentNode) {
                    document.body.removeChild(modal);
                }
            }
        };
    },

    /**
     * 显示图片预览
     */
    showImagePreview(src, alt = '') {
        const modal = document.createElement('div');
        modal.className = 'modal active image-preview-modal';
        modal.innerHTML = `
            <div class="modal-content image-preview-content">
                <div class="modal-header">
                    <h3>图片预览</h3>
                    <button class="btn btn-icon modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="image-container">
                        <img src="${src}" alt="${alt}" class="preview-image">
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('image-container')) {
                document.body.removeChild(modal);
            }
        });
        
        return modal;
    },

    /**
     * 显示帮助信息
     */
    showHelp() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content help-dialog">
                <div class="modal-header">
                    <h3><i class="fas fa-question-circle"></i> 使用帮助</h3>
                    <button class="btn btn-icon modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="help-content">
                        <div class="help-section">
                            <h4><i class="fas fa-edit"></i> 编辑器使用</h4>
                            <ul>
                                <li>在左侧编辑器中输入Markdown格式的简历内容</li>
                                <li>右侧会实时预览生成的简历效果</li>
                                <li>支持拖拽上传.md或.txt文件</li>
                                <li>可以加载预设的简历模板</li>
                            </ul>
                        </div>
                        
                        <div class="help-section">
                            <h4><i class="fas fa-palette"></i> 样式定制</h4>
                            <ul>
                                <li>选择不同的简历模板：经典、现代、简约</li>
                                <li>更换主题颜色：蓝色、绿色、紫色、红色、灰色</li>
                                <li>调整字体大小、行高和页面边距</li>
                                <li>支持明暗主题切换</li>
                            </ul>
                        </div>
                        
                        <div class="help-section">
                            <h4><i class="fas fa-download"></i> 导出功能</h4>
                            <ul>
                                <li>导出为HTML文件，可在任何浏览器中打开</li>
                                <li>复制HTML代码到剪贴板</li>
                                <li>打印简历或另存为PDF</li>
                                <li>导出Markdown源文件</li>
                            </ul>
                        </div>
                        
                        <div class="help-section">
                            <h4><i class="fas fa-keyboard"></i> 快捷键</h4>
                            <ul>
                                <li><kbd>Ctrl/Cmd + S</kbd> - 保存到本地存储</li>
                                <li><kbd>Ctrl/Cmd + Z</kbd> - 撤销</li>
                                <li><kbd>Ctrl/Cmd + Shift + Z</kbd> - 重做</li>
                                <li><kbd>Ctrl/Cmd + P</kbd> - 打印简历</li>
                                <li><kbd>Ctrl/Cmd + E</kbd> - 导出HTML</li>
                            </ul>
                        </div>
                        
                        <div class="help-section">
                            <h4><i class="fas fa-markdown"></i> Markdown语法</h4>
                            <ul>
                                <li><code># 标题</code> - 一级标题（姓名）</li>
                                <li><code>## 标题</code> - 二级标题（章节）</li>
                                <li><code>### 标题</code> - 三级标题（子章节）</li>
                                <li><code>**粗体**</code> - 粗体文本</li>
                                <li><code>*斜体*</code> - 斜体文本</li>
                                <li><code>- 列表项</code> - 无序列表</li>
                                <li><code>[链接](URL)</code> - 超链接</li>
                            </ul>
                        </div>
                        
                        <div class="help-section">
                            <h4><i class="fas fa-lightbulb"></i> 使用技巧</h4>
                            <ul>
                                <li>使用表情符号增强联系信息的视觉效果</li>
                                <li>保持内容简洁，突出重点信息</li>
                                <li>定期保存内容，避免意外丢失</li>
                                <li>导出前预览打印效果</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        return modal;
    },

    /**
     * 显示关于信息
     */
    showAbout() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content about-dialog">
                <div class="modal-header">
                    <h3><i class="fas fa-info-circle"></i> 关于</h3>
                    <button class="btn btn-icon modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="about-content">
                        <div class="app-info">
                            <div class="app-icon">
                                <i class="fas fa-file-alt"></i>
                            </div>
                            <h4>AI简历生成器</h4>
                            <p class="version">版本 1.0.0</p>
                            <p class="description">
                                一个轻量级的Markdown简历转换工具，支持实时预览、样式定制和静态导出功能。
                                无需后端依赖，可直接在浏览器中完成所有操作。
                            </p>
                        </div>
                        
                        <div class="features">
                            <h5>主要特性</h5>
                            <ul>
                                <li><i class="fas fa-check"></i> Markdown实时预览</li>
                                <li><i class="fas fa-check"></i> 多种简历模板</li>
                                <li><i class="fas fa-check"></i> 主题颜色定制</li>
                                <li><i class="fas fa-check"></i> 响应式设计</li>
                                <li><i class="fas fa-check"></i> 本地存储</li>
                                <li><i class="fas fa-check"></i> 多格式导出</li>
                                <li><i class="fas fa-check"></i> 打印优化</li>
                            </ul>
                        </div>
                        
                        <div class="tech-stack">
                            <h5>技术栈</h5>
                            <div class="tech-tags">
                                <span class="tech-tag">HTML5</span>
                                <span class="tech-tag">CSS Grid</span>
                                <span class="tech-tag">JavaScript ES6+</span>
                                <span class="tech-tag">Marked.js</span>
                                <span class="tech-tag">FontAwesome</span>
                                <span class="tech-tag">Google Fonts</span>
                            </div>
                        </div>
                        
                        <div class="credits">
                            <h5>致谢</h5>
                            <p>感谢以下开源项目的支持：</p>
                            <ul>
                                <li><a href="https://marked.js.org/" target="_blank">Marked.js</a> - Markdown解析器</li>
                                <li><a href="https://fontawesome.com/" target="_blank">FontAwesome</a> - 图标库</li>
                                <li><a href="https://fonts.google.com/" target="_blank">Google Fonts</a> - 字体服务</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        return modal;
    },

    /**
     * 创建工具提示
     */
    createTooltip(element, text, position = 'top') {
        const tooltip = document.createElement('div');
        tooltip.className = `tooltip tooltip-${position}`;
        tooltip.textContent = text;
        
        let showTimeout, hideTimeout;
        
        const showTooltip = () => {
            clearTimeout(hideTimeout);
            showTimeout = setTimeout(() => {
                document.body.appendChild(tooltip);
                
                const rect = element.getBoundingClientRect();
                const tooltipRect = tooltip.getBoundingClientRect();
                
                let left, top;
                
                switch (position) {
                    case 'top':
                        left = rect.left + (rect.width - tooltipRect.width) / 2;
                        top = rect.top - tooltipRect.height - 8;
                        break;
                    case 'bottom':
                        left = rect.left + (rect.width - tooltipRect.width) / 2;
                        top = rect.bottom + 8;
                        break;
                    case 'left':
                        left = rect.left - tooltipRect.width - 8;
                        top = rect.top + (rect.height - tooltipRect.height) / 2;
                        break;
                    case 'right':
                        left = rect.right + 8;
                        top = rect.top + (rect.height - tooltipRect.height) / 2;
                        break;
                }
                
                tooltip.style.left = `${left}px`;
                tooltip.style.top = `${top}px`;
                tooltip.classList.add('show');
            }, 500);
        };
        
        const hideTooltip = () => {
            clearTimeout(showTimeout);
            hideTimeout = setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.classList.remove('show');
                    setTimeout(() => {
                        if (tooltip.parentNode) {
                            document.body.removeChild(tooltip);
                        }
                    }, 200);
                }
            }, 100);
        };
        
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
        element.addEventListener('focus', showTooltip);
        element.addEventListener('blur', hideTooltip);
        
        return {
            destroy: () => {
                clearTimeout(showTimeout);
                clearTimeout(hideTimeout);
                element.removeEventListener('mouseenter', showTooltip);
                element.removeEventListener('mouseleave', hideTooltip);
                element.removeEventListener('focus', showTooltip);
                element.removeEventListener('blur', hideTooltip);
                if (tooltip.parentNode) {
                    document.body.removeChild(tooltip);
                }
            }
        };
    },

    /**
     * 初始化工具提示
     */
    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            const text = element.getAttribute('data-tooltip');
            const position = element.getAttribute('data-tooltip-position') || 'top';
            this.createTooltip(element, text, position);
        });
    },

    /**
     * 显示快捷键帮助
     */
    showShortcuts() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content shortcuts-dialog">
                <div class="modal-header">
                    <h3><i class="fas fa-keyboard"></i> 快捷键</h3>
                    <button class="btn btn-icon modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="shortcuts-grid">
                        <div class="shortcut-item">
                            <div class="shortcut-keys">
                                <kbd>Ctrl</kbd> + <kbd>S</kbd>
                            </div>
                            <div class="shortcut-desc">保存到本地存储</div>
                        </div>
                        
                        <div class="shortcut-item">
                            <div class="shortcut-keys">
                                <kbd>Ctrl</kbd> + <kbd>Z</kbd>
                            </div>
                            <div class="shortcut-desc">撤销</div>
                        </div>
                        
                        <div class="shortcut-item">
                            <div class="shortcut-keys">
                                <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
                            </div>
                            <div class="shortcut-desc">重做</div>
                        </div>
                        
                        <div class="shortcut-item">
                            <div class="shortcut-keys">
                                <kbd>Ctrl</kbd> + <kbd>P</kbd>
                            </div>
                            <div class="shortcut-desc">打印简历</div>
                        </div>
                        
                        <div class="shortcut-item">
                            <div class="shortcut-keys">
                                <kbd>Ctrl</kbd> + <kbd>E</kbd>
                            </div>
                            <div class="shortcut-desc">导出HTML</div>
                        </div>
                        
                        <div class="shortcut-item">
                            <div class="shortcut-keys">
                                <kbd>F11</kbd>
                            </div>
                            <div class="shortcut-desc">全屏模式</div>
                        </div>
                    </div>
                    
                    <div class="shortcuts-note">
                        <p><i class="fas fa-info-circle"></i> 在Mac上，请使用 <kbd>Cmd</kbd> 替代 <kbd>Ctrl</kbd></p>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // 绑定关闭事件
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        return modal;
    }
}); 