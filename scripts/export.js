/**
 * 导出功能模块
 * 负责HTML导出、复制HTML、打印等导出相关功能
 */

// 扩展ResumeApp类的导出功能
Object.assign(ResumeApp.prototype, {
    /**
     * 导出HTML文件
     */
    exportHTML() {
        try {
            const htmlContent = this.generateCompleteHTML();
            const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = this.generateFileName('html');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            
            this.showToast('success', '导出成功', 'HTML文件已下载到本地');
        } catch (error) {
            console.error('导出HTML失败:', error);
            this.showToast('error', '导出失败', '无法生成HTML文件');
        }
    },

    /**
     * 复制HTML代码
     */
    async copyHTML() {
        try {
            const htmlContent = this.generateCompleteHTML();
            await navigator.clipboard.writeText(htmlContent);
            this.showToast('success', '复制成功', 'HTML代码已复制到剪贴板');
        } catch (error) {
            console.error('复制HTML失败:', error);
            // 降级方案：使用传统方法复制
            this.fallbackCopyHTML();
        }
    },

    /**
     * 降级复制方案
     */
    fallbackCopyHTML() {
        try {
            const htmlContent = this.generateCompleteHTML();
            const textArea = document.createElement('textarea');
            textArea.value = htmlContent;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            this.showToast('success', '复制成功', 'HTML代码已复制到剪贴板');
        } catch (error) {
            console.error('降级复制也失败:', error);
            this.showToast('error', '复制失败', '无法复制HTML代码');
        }
    },

    /**
     * 打印简历
     */
    printResume() {
        try {
            const printWindow = window.open('', '_blank');
            const htmlContent = this.generateCompleteHTML(true);
            
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            
            // 等待内容加载完成后打印
            printWindow.onload = () => {
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 500);
            };
            
            this.showToast('info', '准备打印', '正在打开打印预览...');
        } catch (error) {
            console.error('打印失败:', error);
            this.showToast('error', '打印失败', '无法打开打印预览');
        }
    },

    /**
     * 生成完整的HTML文档
     */
    generateCompleteHTML(forPrint = false) {
        const resumeContent = this.previewContent.innerHTML;
        const templateClass = `resume-template-${this.currentTemplate}`;
        const themeClass = `theme-${this.currentTheme}`;
        
        return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简历 - ${this.extractNameFromContent()}</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
    
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        ${this.getInlineCSS(forPrint)}
    </style>
    
    ${forPrint ? this.getPrintStyles() : ''}
</head>
<body class="${templateClass} ${themeClass}">
    <div class="resume-container">
        ${resumeContent}
    </div>
    
    ${forPrint ? '' : this.getInteractiveScripts()}
</body>
</html>`;
    },

    /**
     * 获取内联CSS
     */
    getInlineCSS(forPrint = false) {
        // 获取所有样式表内容
        const cssFiles = [
            this.getCSSVariables(),
            this.getBaseStyles(),
            this.getComponentStyles(),
            this.getResumeTemplateStyles()
        ];

        let css = cssFiles.join('\n\n');
        
        // 如果是打印版本，添加打印优化样式
        if (forPrint) {
            css += '\n\n' + this.getPrintOptimizedStyles();
        }
        
        return css;
    },

    /**
     * 获取CSS变量
     */
    getCSSVariables() {
        return `
/* CSS Variables */
:root {
  /* 主品牌色 - 专业蓝 */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;
  
  /* 中性色系 */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;
  --gray-700: #374151;
  --gray-800: #1f2937;
  --gray-900: #111827;
  
  /* 语义化颜色 */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-700);
  --text-muted: var(--gray-500);
  
  /* 字体 */
  --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-display: 'Playfair Display', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* 间距 */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  
  /* 圆角 */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  
  /* 过渡 */
  --transition-normal: 0.2s ease-in-out;
}`;
    },

    /**
     * 获取基础样式
     */
    getBaseStyles() {
        return `
/* Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-primary);
  line-height: 1.6;
  color: var(--text-primary);
  background: white;
}

.resume-container {
  max-width: 210mm;
  margin: 0 auto;
  background: white;
  min-height: 100vh;
}`;
    },

    /**
     * 获取组件样式（简化版）
     */
    getComponentStyles() {
        return `
/* Component Styles */
.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.contact-item i {
  width: 16px;
  text-align: center;
}`;
    },

    /**
     * 获取简历模板样式（从现有CSS文件中提取核心部分）
     */
    getResumeTemplateStyles() {
        // 这里应该包含简历模板的核心样式
        // 为了简化，我们返回一个基础版本
        return `
/* Resume Template Styles */
.resume-content {
  padding: var(--space-8);
  font-family: var(--font-primary);
  line-height: 1.6;
  color: var(--text-primary);
  background: white;
  max-width: 100%;
  margin: 0 auto;
}

.resume-content h1 {
  margin-bottom: var(--space-4);
  font-weight: 700;
  line-height: 1.2;
}

.resume-content h2 {
  margin: var(--space-8) 0 var(--space-4) 0;
  font-weight: 600;
  line-height: 1.3;
}

.resume-content h3 {
  margin: var(--space-6) 0 var(--space-3) 0;
  font-weight: 600;
  line-height: 1.4;
}

.resume-content p {
  margin-bottom: var(--space-4);
}

.resume-content ul,
.resume-content ol {
  margin-bottom: var(--space-4);
  padding-left: var(--space-6);
}

.resume-content li {
  margin-bottom: var(--space-2);
}

.resume-content a {
  color: var(--primary-600);
  text-decoration: none;
}

.resume-content a:hover {
  color: var(--primary-700);
  text-decoration: underline;
}

/* Template Specific Styles */
.resume-template-classic h1 {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-700);
  text-align: center;
  margin-bottom: var(--space-2);
  border-bottom: 3px solid var(--primary-200);
  padding-bottom: var(--space-4);
}

.resume-template-classic h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-600);
  border-bottom: 2px solid var(--primary-200);
  padding-bottom: var(--space-2);
  margin: var(--space-8) 0 var(--space-4) 0;
  position: relative;
}

.resume-template-modern h1 {
  font-size: 3rem;
  font-weight: 300;
  color: var(--gray-800);
  margin-bottom: var(--space-2);
  letter-spacing: -0.02em;
}

.resume-template-minimal h1 {
  font-size: 2.25rem;
  font-weight: 400;
  color: var(--gray-900);
  margin-bottom: var(--space-2);
  letter-spacing: -0.01em;
}

/* Theme Colors */
.theme-green {
  --primary-500: #10b981;
  --primary-600: #059669;
  --primary-700: #047857;
}

.theme-purple {
  --primary-500: #a855f7;
  --primary-600: #9333ea;
  --primary-700: #7c3aed;
}

.theme-red {
  --primary-500: #ef4444;
  --primary-600: #dc2626;
  --primary-700: #b91c1c;
}

.theme-gray {
  --primary-500: #6b7280;
  --primary-600: #4b5563;
  --primary-700: #374151;
}`;
    },

    /**
     * 获取打印优化样式
     */
    getPrintOptimizedStyles() {
        return `
/* Print Optimized Styles */
@media print {
  body {
    margin: 0;
    padding: 0;
    background: white !important;
  }
  
  .resume-container {
    max-width: none;
    margin: 0;
    padding: 0;
    box-shadow: none;
  }
  
  .resume-content {
    padding: 0.5in;
    font-size: 11pt;
    line-height: 1.4;
  }
  
  h1, h2, h3 {
    break-after: avoid;
  }
  
  .experience-item,
  .project-item {
    break-inside: avoid;
  }
  
  a {
    color: inherit !important;
    text-decoration: none !important;
  }
}`;
    },

    /**
     * 获取打印样式
     */
    getPrintStyles() {
        return `
    <style media="print">
        @page {
            margin: 0.5in;
            size: A4;
        }
        
        body {
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact;
            color-adjust: exact;
        }
        
        .resume-container {
            max-width: none;
            margin: 0;
            padding: 0;
            box-shadow: none;
        }
        
        .resume-content {
            padding: 0;
            font-size: 11pt;
            line-height: 1.4;
        }
        
        h1 {
            font-size: 18pt !important;
        }
        
        h2 {
            font-size: 14pt !important;
        }
        
        h3 {
            font-size: 12pt !important;
        }
        
        .contact-info {
            justify-content: center;
        }
        
        a {
            color: inherit !important;
            text-decoration: none !important;
        }
        
        .experience-item,
        .project-item,
        .timeline-item {
            break-inside: avoid;
            margin-bottom: 12pt;
        }
        
        h1, h2, h3, h4, h5, h6 {
            break-after: avoid;
        }
    </style>`;
    },

    /**
     * 获取交互脚本（用于导出的HTML文件）
     */
    getInteractiveScripts() {
        return `
    <script>
        // 简单的交互功能
        document.addEventListener('DOMContentLoaded', function() {
            // 添加打印按钮
            const printBtn = document.createElement('button');
            printBtn.innerHTML = '<i class="fas fa-print"></i> 打印简历';
            printBtn.style.cssText = \`
                position: fixed;
                top: 20px;
                right: 20px;
                background: #3b82f6;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-family: inherit;
                font-size: 14px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                z-index: 1000;
                transition: background 0.2s;
            \`;
            
            printBtn.addEventListener('click', function() {
                window.print();
            });
            
            printBtn.addEventListener('mouseenter', function() {
                this.style.background = '#2563eb';
            });
            
            printBtn.addEventListener('mouseleave', function() {
                this.style.background = '#3b82f6';
            });
            
            document.body.appendChild(printBtn);
            
            // 隐藏打印按钮在打印时
            window.addEventListener('beforeprint', function() {
                printBtn.style.display = 'none';
            });
            
            window.addEventListener('afterprint', function() {
                printBtn.style.display = 'block';
            });
        });
    </script>`;
    },

    /**
     * 从内容中提取姓名
     */
    extractNameFromContent() {
        const content = this.markdownInput.value;
        const lines = content.split('\n');
        
        // 查找第一个一级标题作为姓名
        for (const line of lines) {
            if (line.startsWith('# ')) {
                return line.substring(2).trim();
            }
        }
        
        return '简历';
    },

    /**
     * 生成文件名
     */
    generateFileName(extension) {
        const name = this.extractNameFromContent();
        const date = new Date().toISOString().split('T')[0];
        const template = this.currentTemplate;
        
        // 清理文件名中的特殊字符
        const cleanName = name.replace(/[^\w\u4e00-\u9fa5]/g, '_');
        
        return `${cleanName}_简历_${template}_${date}.${extension}`;
    },

    /**
     * 导出PDF（使用浏览器打印功能）
     */
    exportPDF() {
        this.showToast('info', '导出PDF', '请在打印对话框中选择"另存为PDF"');
        setTimeout(() => {
            this.printResume();
        }, 1000);
    },

    /**
     * 导出Markdown文件
     */
    exportMarkdown() {
        try {
            const content = this.markdownInput.value;
            const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = this.generateFileName('md');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            URL.revokeObjectURL(url);
            
            this.showToast('success', '导出成功', 'Markdown文件已下载到本地');
        } catch (error) {
            console.error('导出Markdown失败:', error);
            this.showToast('error', '导出失败', '无法生成Markdown文件');
        }
    }
}); 