/**
 * 编辑器功能模块
 * 负责文件导入、拖拽上传、模板加载等编辑器相关功能
 */

// 扩展ResumeApp类的编辑器功能
Object.assign(ResumeApp.prototype, {
    /**
     * 显示导入模态框
     */
    showImportModal() {
        this.importModal.classList.add('active');
    },

    /**
     * 关闭模态框
     */
    closeModal() {
        this.importModal.classList.remove('active');
    },

    /**
     * 设置拖拽上传功能
     */
    setupDragAndDrop() {
        // 防止默认拖拽行为
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            this.fileDropZone.addEventListener(eventName, this.preventDefaults, false);
            document.body.addEventListener(eventName, this.preventDefaults, false);
        });

        // 高亮拖拽区域
        ['dragenter', 'dragover'].forEach(eventName => {
            this.fileDropZone.addEventListener(eventName, () => {
                this.fileDropZone.classList.add('drag-over');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            this.fileDropZone.addEventListener(eventName, () => {
                this.fileDropZone.classList.remove('drag-over');
            }, false);
        });

        // 处理文件拖拽
        this.fileDropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            this.handleFiles(files);
        }, false);

        // 点击选择文件
        this.fileDropZone.addEventListener('click', () => {
            this.fileInput.click();
        });
    },

    /**
     * 防止默认事件
     */
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    },

    /**
     * 处理文件选择
     */
    handleFileSelect(e) {
        const files = e.target.files;
        this.handleFiles(files);
    },

    /**
     * 处理文件
     */
    handleFiles(files) {
        if (files.length === 0) return;

        const file = files[0];
        
        // 检查文件类型
        if (!this.isValidFileType(file)) {
            this.showToast('error', '文件类型错误', '请选择.md或.txt文件');
            return;
        }

        // 检查文件大小（限制为5MB）
        if (file.size > 5 * 1024 * 1024) {
            this.showToast('error', '文件过大', '文件大小不能超过5MB');
            return;
        }

        this.readFile(file);
    },

    /**
     * 验证文件类型
     */
    isValidFileType(file) {
        const validTypes = ['.md', '.txt', '.markdown'];
        const fileName = file.name.toLowerCase();
        return validTypes.some(type => fileName.endsWith(type)) || 
               file.type === 'text/markdown' || 
               file.type === 'text/plain';
    },

    /**
     * 读取文件内容
     */
    readFile(file) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const content = e.target.result;
            this.importContent(content, file.name);
        };

        reader.onerror = () => {
            this.showToast('error', '读取失败', '无法读取文件内容');
        };

        reader.readAsText(file, 'UTF-8');
    },

    /**
     * 导入内容
     */
    importContent(content, fileName) {
        // 保存当前状态到撤销栈
        this.saveToUndoStack();
        
        // 设置内容
        this.markdownInput.value = content;
        
        // 更新预览
        this.updatePreview();
        
        // 保存到本地存储
        this.saveToLocalStorage();
        
        // 关闭模态框
        this.closeModal();
        
        // 显示成功提示
        this.showToast('success', '导入成功', `已导入文件: ${fileName}`);
        
        // 重置文件输入
        this.fileInput.value = '';
    },

    /**
     * 加载模板
     */
    loadTemplate() {
        const templates = {
            basic: this.getBasicTemplate(),
            developer: this.getDeveloperTemplate(),
            designer: this.getDesignerTemplate(),
            manager: this.getManagerTemplate()
        };

        // 创建模板选择对话框
        this.showTemplateSelector(templates);
    },

    /**
     * 显示模板选择器
     */
    showTemplateSelector(templates) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>选择简历模板</h3>
                    <button class="btn btn-icon modal-close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="template-selector">
                        ${Object.entries(templates).map(([key, template]) => `
                            <div class="template-option" data-template="${key}">
                                <div class="template-preview-card">
                                    <h4>${template.name}</h4>
                                    <p>${template.description}</p>
                                    <div class="template-tags">
                                        ${template.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // 绑定事件
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal')) {
                document.body.removeChild(modal);
            }
        });

        modal.querySelectorAll('.template-option').forEach(option => {
            option.addEventListener('click', () => {
                const templateKey = option.dataset.template;
                this.loadTemplateContent(templates[templateKey].content);
                document.body.removeChild(modal);
            });
        });
    },

    /**
     * 加载模板内容
     */
    loadTemplateContent(content) {
        if (this.markdownInput.value.trim() && 
            !confirm('当前有内容，确定要替换为模板内容吗？')) {
            return;
        }

        this.saveToUndoStack();
        this.markdownInput.value = content;
        this.updatePreview();
        this.saveToLocalStorage();
        this.showToast('success', '模板已加载', '简历模板已成功加载');
    },

    /**
     * 获取基础模板
     */
    getBasicTemplate() {
        return {
            name: '基础模板',
            description: '适合初入职场的求职者',
            tags: ['简洁', '通用', '入门'],
            content: `# 您的姓名
**职位名称**

## 联系方式
- 📧 Email: your.email@example.com
- 📱 电话: +86 138-0000-0000
- 🏠 地址: 您的城市
- 💼 LinkedIn: linkedin.com/in/yourname
- 🐙 GitHub: github.com/yourname

## 个人简介
在此处写一段简洁的个人介绍，突出您的核心技能和职业目标...

## 教育背景

### 学位名称 | 学校名称
*时间段*

- 主要课程或成就
- 相关项目经验

## 工作经验

### 职位名称 | 公司名称
*时间段*

- 主要工作职责和成就
- 使用的技术或工具
- 取得的具体成果

## 技能专长
- **技能类别1**: 具体技能列表
- **技能类别2**: 具体技能列表
- **技能类别3**: 具体技能列表

## 项目经验

### 项目名称
- 项目描述和您的角色
- 使用的技术栈
- 项目成果和影响`
        };
    },

    /**
     * 获取开发者模板
     */
    getDeveloperTemplate() {
        return {
            name: '开发者模板',
            description: '专为软件开发工程师设计',
            tags: ['技术', '开发', '工程师'],
            content: `# 张三
**全栈开发工程师**

## 联系方式
- 📧 Email: zhangsan@example.com
- 📱 电话: +86 138-0000-0000
- 🏠 地址: 北京市朝阳区
- 💼 LinkedIn: linkedin.com/in/zhangsan
- 🐙 GitHub: github.com/zhangsan
- 🌐 个人网站: https://zhangsan.dev

## 技术栈
- **前端**: React, Vue.js, TypeScript, JavaScript, HTML5, CSS3
- **后端**: Node.js, Python, Java, Express, Django, Spring Boot
- **数据库**: MySQL, PostgreSQL, MongoDB, Redis
- **工具**: Git, Docker, Kubernetes, AWS, Jenkins
- **其他**: RESTful API, GraphQL, 微服务架构, 敏捷开发

## 工作经验

### 高级全栈开发工程师 | ABC科技公司
*2021.06 - 至今*

- 负责公司核心产品的全栈开发，用户量超过100万
- 使用React + Node.js构建高性能Web应用，页面加载速度提升40%
- 设计并实现微服务架构，提高系统可扩展性和维护性
- 带领5人开发团队，指导初级开发者技术成长

### 前端开发工程师 | XYZ互联网公司
*2019.03 - 2021.05*

- 开发和维护多个B2C电商平台前端应用
- 使用Vue.js和TypeScript重构遗留代码，代码质量显著提升
- 实现响应式设计，支持多种设备和浏览器
- 与UI/UX设计师密切合作，确保设计的完美实现

## 项目经验

### 企业级SaaS管理平台
**技术栈**: React, TypeScript, Node.js, PostgreSQL, Docker

- 从零开始设计和开发企业级SaaS平台
- 实现复杂的权限管理和多租户架构
- 集成第三方API和支付系统
- 服务超过500家企业客户，获得98%满意度

### 实时协作编辑器
**技术栈**: Vue.js, WebSocket, Express, MongoDB

- 开发类似Google Docs的实时协作编辑器
- 实现操作转换算法，确保多用户编辑一致性
- 支持富文本编辑、评论、版本历史等功能
- 日活跃用户超过10,000人

### 开源组件库
**技术栈**: React, TypeScript, Storybook, npm

- 设计和开发企业级React组件库
- 编写完整的文档和使用示例
- 在GitHub获得1000+ stars，被多个项目采用
- 持续维护和更新，响应社区反馈

## 教育背景

### 计算机科学与技术学士 | 清华大学
*2015.09 - 2019.06*

- GPA: 3.8/4.0
- 主要课程: 数据结构、算法设计、数据库系统、软件工程
- 毕业设计: 基于机器学习的推荐系统

## 认证与奖项
- AWS Certified Solutions Architect
- 公司年度最佳员工奖 (2022)
- 大学生程序设计竞赛省级一等奖

## 开源贡献
- 为React、Vue等知名开源项目贡献代码
- 维护个人开源项目，累计获得2000+ GitHub stars
- 技术博客文章阅读量超过50万次`
        };
    },

    /**
     * 获取设计师模板
     */
    getDesignerTemplate() {
        return {
            name: '设计师模板',
            description: '适合UI/UX设计师和创意工作者',
            tags: ['设计', '创意', 'UI/UX'],
            content: `# 李设计
**UI/UX设计师**

## 联系方式
- 📧 Email: lidesign@example.com
- 📱 电话: +86 138-0000-0000
- 🏠 地址: 上海市徐汇区
- 💼 LinkedIn: linkedin.com/in/lidesign
- 🎨 Behance: behance.net/lidesign
- 📷 Dribbble: dribbble.com/lidesign

## 设计理念
以用户为中心的设计思维，追求简洁而富有表现力的视觉语言，致力于创造既美观又实用的数字产品体验。

## 核心技能
- **设计工具**: Figma, Sketch, Adobe Creative Suite, Principle, Framer
- **用户研究**: 用户访谈, 可用性测试, A/B测试, 数据分析
- **设计方法**: 设计思维, 用户旅程映射, 信息架构, 原型设计
- **前端技能**: HTML, CSS, JavaScript基础, 响应式设计
- **协作工具**: Slack, Notion, Miro, Zeplin, Abstract

## 工作经验

### 高级UI/UX设计师 | 创新科技公司
*2020.08 - 至今*

- 负责公司主要产品的用户体验设计，用户满意度提升35%
- 建立和维护设计系统，提高团队设计效率50%
- 与产品经理和开发团队紧密合作，确保设计方案的完美落地
- 指导初级设计师，建立设计评审流程和标准

### UI设计师 | 互联网创业公司
*2018.06 - 2020.07*

- 从零开始设计公司移动应用界面，获得App Store推荐
- 进行用户研究和可用性测试，优化产品用户体验
- 设计营销物料和品牌视觉识别系统
- 参与产品策略讨论，从设计角度提供专业建议

## 项目作品

### 智能家居控制App
**角色**: 主设计师 | **时间**: 2022.03 - 2022.08

- 设计直观易用的智能家居控制界面
- 创建一致的视觉语言和交互模式
- 通过用户测试验证设计方案，迭代优化
- 最终产品获得4.8分用户评价

### 企业级数据可视化平台
**角色**: UX设计师 | **时间**: 2021.09 - 2022.02

- 设计复杂数据的可视化展示方案
- 简化复杂操作流程，提高用户工作效率
- 与开发团队协作实现交互动效
- 帮助客户提升30%的数据分析效率

### 电商平台重设计
**角色**: UI/UX设计师 | **时间**: 2020.01 - 2020.06

- 重新设计电商平台的用户界面和购物流程
- 优化移动端购物体验，转化率提升25%
- 建立响应式设计规范，适配多种设备
- 获得设计团队年度最佳项目奖

## 教育背景

### 视觉传达设计学士 | 中央美术学院
*2014.09 - 2018.06*

- 专业排名前10%
- 主要课程: 平面设计、交互设计、用户体验、色彩理论
- 毕业设计: 城市公共空间导视系统设计

## 获奖经历
- Red Dot Design Award 红点设计奖 (2022)
- iF Design Award (2021)
- 中国设计红星奖 (2020)
- 大学生广告艺术大赛全国一等奖

## 设计作品集
🔗 在线作品集: https://lidesign.portfolio.com
📱 移动应用设计案例: 15+
🖥️ Web界面设计项目: 20+
🎨 品牌视觉设计: 10+`
        };
    },

    /**
     * 获取管理者模板
     */
    getManagerTemplate() {
        return {
            name: '管理者模板',
            description: '适合团队领导和项目经理',
            tags: ['管理', '领导', '项目'],
            content: `# 王经理
**产品总监 / 项目管理专家**

## 联系方式
- 📧 Email: wangmanager@example.com
- 📱 电话: +86 138-0000-0000
- 🏠 地址: 深圳市南山区
- 💼 LinkedIn: linkedin.com/in/wangmanager
- 🐙 GitHub: github.com/wangmanager

## 管理理念
以人为本的团队管理，数据驱动的决策制定，持续改进的产品思维。致力于打造高效协作的团队文化，推动产品和业务的持续增长。

## 核心能力
- **团队管理**: 团队建设, 人才培养, 绩效管理, 跨部门协作
- **产品管理**: 产品策略, 需求分析, 用户研究, 数据分析
- **项目管理**: 敏捷开发, Scrum, 风险控制, 资源调配
- **商业分析**: 市场分析, 竞品分析, 商业模式, ROI分析
- **技术理解**: 软件开发流程, 技术架构, 质量保证

## 工作经验

### 产品总监 | 独角兽科技公司
*2019.08 - 至今*

- 负责公司核心产品线，管理30+人的产品和技术团队
- 制定产品战略和路线图，推动产品从0到1的突破
- 建立数据驱动的产品决策体系，用户增长率达到200%
- 年营收从500万增长到5000万，获得B轮融资2亿元

**主要成就**:
- 成功推出3款核心产品，累计用户超过500万
- 建立完善的产品管理流程和团队文化
- 培养了5名产品经理，其中3人晋升为高级产品经理
- 获得公司年度最佳管理者奖

### 高级项目经理 | 大型互联网公司
*2016.03 - 2019.07*

- 管理多个大型项目，总预算超过2000万元
- 协调产品、技术、运营等多个部门，确保项目按时交付
- 建立项目管理标准化流程，项目成功率提升至95%
- 负责团队招聘和培训，团队规模从5人扩展到20人

**关键项目**:
- 电商平台重构项目: 6个月完成，性能提升300%
- 移动端产品线: 从0到1建设，获得千万级用户
- 数据中台建设: 统一数据标准，支撑全公司业务决策

### 产品经理 | 创业公司
*2014.06 - 2016.02*

- 作为第一位产品经理，建立产品管理体系
- 深度参与产品设计和用户研究，打造MVP产品
- 与技术团队紧密合作，快速迭代产品功能
- 产品从概念到上线仅用时3个月，获得种子轮融资

## 项目成果

### 智能推荐系统
**角色**: 项目负责人 | **团队规模**: 15人 | **周期**: 8个月

- 设计并实施个性化推荐算法，用户点击率提升40%
- 协调算法、后端、前端多个技术团队
- 建立A/B测试框架，持续优化推荐效果
- 项目按时交付，为公司带来30%的收入增长

### 企业级SaaS平台
**角色**: 产品总监 | **团队规模**: 25人 | **周期**: 12个月

- 从市场调研到产品上线的全流程管理
- 管理产品、设计、开发、测试、运营团队
- 建立敏捷开发流程，提高交付效率50%
- 产品上线6个月获得100+企业客户

### 数字化转型项目
**角色**: 项目总监 | **预算**: 1500万 | **周期**: 18个月

- 领导公司整体数字化转型项目
- 协调内外部资源，管理多个供应商
- 建立变更管理流程，确保平稳过渡
- 成功完成转型，运营效率提升60%

## 教育背景

### 工商管理硕士(MBA) | 清华大学经济管理学院
*2012.09 - 2014.06*

- 专业方向: 战略管理与创新
- 主要课程: 战略管理、组织行为学、财务管理、市场营销
- 毕业论文: 互联网企业的产品创新策略研究

### 计算机科学学士 | 北京理工大学
*2008.09 - 2012.06*

- 专业排名前15%
- 主要课程: 软件工程、数据库系统、算法设计、项目管理
- 获得校级优秀学生奖学金

## 认证与培训
- PMP项目管理专业人士认证
- Scrum Master认证
- 产品经理NPDP认证
- 清华大学高级管理人员工商管理研修班

## 演讲与分享
- 中国产品经理大会主题演讲: "数据驱动的产品决策"
- 公司内部培训: "敏捷项目管理实践"
- 行业媒体专访: "创业公司的产品管理之道"
- 技术博客文章: 累计阅读量超过10万次`
        };
    }
}); 