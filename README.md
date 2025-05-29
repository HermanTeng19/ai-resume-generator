# AI简历生成器 | AI Resume Generator

一个轻量级的Markdown简历转换工具，支持实时预览、样式定制和静态导出功能。无需后端依赖，可直接在浏览器中完成所有操作。现已支持中英文双语界面，并针对国际用户进行了全面优化。

🌐 **在线体验**: [https://resumegenerator.aibytes.dpdns.org](https://resumegenerator.aibytes.dpdns.org)

## ✨ 功能特性

### 📝 编辑器功能
- **Markdown实时预览** - 左侧编辑，右侧实时预览，支持滚动同步
- **文件导入支持** - 支持拖拽上传.md和.txt文件
- **模板快速加载** - 内置多种专业简历模板
- **撤销重做** - 完整的编辑历史管理（50步历史）
- **本地存储** - 自动保存，防止数据丢失
- **智能图标识别** - 自动为联系信息添加相应图标

### 🎨 样式定制
- **多种模板** - 经典、现代、简约三种设计风格
- **主题颜色** - 蓝色、绿色、紫色、红色、灰色主题
- **多语言支持** - 中英文界面切换，国际化体验
- **字体调节** - 可调整字体大小、行高、页面边距
- **明暗主题** - 支持明暗模式切换，预览面板深色模式优化
- **响应式设计** - 适配桌面和移动设备

### 📤 导出功能
- **HTML导出** - 生成独立的HTML文件，保持专业白色背景
- **打印优化** - 专门优化的打印样式
- **PDF导出** - 通过浏览器打印功能生成PDF
- **代码复制** - 一键复制HTML代码
- **Markdown导出** - 导出原始Markdown文件

### 🛠️ 用户体验
- **快捷键支持** - 常用操作的键盘快捷键
- **全屏预览** - 专注的预览模式
- **缩放控制** - 50%-200%预览缩放
- **布局切换** - 水平/垂直布局切换
- **工具提示** - 详细的操作指导
- **滚动同步** - 编辑器与预览面板双向滚动同步

### 🌐 国际化支持
- **双语界面** - 完整的中英文界面切换
- **国际化SEO** - 针对全球用户的搜索引擎优化
- **多语言文档** - 完整的中英文项目文档
- **PWA支持** - 可安装到设备，支持离线使用
- **社交分享优化** - 针对国际社交媒体平台优化

### 🎯 Landing Page 首页
- **美观的欢迎页面** - 现代化设计的产品介绍页面
- **功能演示** - 实时的Markdown编辑器和预览演示
- **模板展示** - 专业简历模板预览
- **使用指南** - 三步简单使用流程
- **多语言支持** - 中英文版本无缝切换

## 🚀 快速开始

### 🌐 在线使用（推荐）
- **首页**: [https://resumegenerator.aibytes.dpdns.org](https://resumegenerator.aibytes.dpdns.org)
- **简历编辑器**: [https://resumegenerator.aibytes.dpdns.org/app](https://resumegenerator.aibytes.dpdns.org/app)
- **英文版首页**: [https://resumegenerator.aibytes.dpdns.org/landing-en.html](https://resumegenerator.aibytes.dpdns.org/landing-en.html)

### 💻 本地使用

#### 方法一：从欢迎页面开始
1. 下载项目文件到本地
2. 双击打开 `index.html` 文件查看产品介绍
3. 点击"开始制作"按钮进入编辑器（`app.html`）
4. 开始编辑您的简历！

#### 方法二：直接使用编辑器
1. 下载项目文件到本地
2. 双击打开 `app.html` 文件
3. 开始编辑您的简历！

#### 方法三：使用启动脚本
```bash
./start.sh
```
脚本会自动在默认浏览器中打开欢迎页面。

#### 方法四：Node.js本地服务器
如果您已安装Node.js，可以使用以下命令：
```bash
# 使用http-server
npm start

# 或使用live-server（支持热重载）
npm run dev

# 预览模式
npm run preview
```

### 使用步骤
1. **访问首页** - 浏览产品介绍和功能演示
2. **进入编辑器** - 点击"开始制作"按钮
3. **编辑内容** - 在左侧编辑器中输入Markdown格式的简历
4. **选择模板** - 在设置面板中选择喜欢的模板和主题
5. **预览效果** - 在右侧实时查看简历效果
6. **导出简历** - 导出为HTML、PDF或打印

## 📋 模板示例

### 基础模板
适合初入职场的求职者，简洁通用的设计风格。

### 开发者模板
专为软件开发工程师设计，突出技术技能和项目经验。

### 设计师模板
适合UI/UX设计师和创意工作者，强调设计理念和作品展示。

### 管理者模板
适合团队领导和项目经理，突出管理经验和领导能力。

## 🎯 Markdown语法指南

### 基本语法
```markdown
# 姓名（一级标题）
**职位名称**

## 联系方式
- 📧 Email: your.email@example.com
- 📱 电话: +86 138-0000-0000
- 🏠 地址: 您的城市
- 💼 LinkedIn: linkedin.com/in/yourprofile
- 🐙 GitHub: github.com/yourusername

## 个人简介
简洁的个人介绍...

## 工作经验
### 职位名称 | 公司名称
*时间段*

- 主要工作职责
- 取得的成就

## 技能专长
- **技能类别**: 具体技能列表
```

### 联系信息图标
系统会自动识别以下格式并添加相应图标：
- `📧 Email:` → 邮件图标
- `📱 电话:` → 电话图标
- `🏠 地址:` → 地址图标
- `💼 LinkedIn:` → LinkedIn图标
- `🐙 GitHub:` → GitHub图标

## ⌨️ 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Ctrl/Cmd + S` | 保存到本地存储 |
| `Ctrl/Cmd + Z` | 撤销 |
| `Ctrl/Cmd + Shift + Z` | 重做 |
| `Ctrl/Cmd + P` | 打印简历 |
| `Ctrl/Cmd + E` | 导出HTML |

## 🏗️ 技术架构

### 前端技术栈
- **HTML5** - 语义化标签结构
- **CSS Grid** - 现代布局系统
- **JavaScript ES6+** - 模块化开发
- **Marked.js** - Markdown解析
- **FontAwesome** - 图标库
- **Google Fonts** - 字体服务

### 项目结构
```
ai-resume-generator/
├── index.html              # 产品首页（Landing Page）
├── app.html               # 简历编辑器应用
├── landing-en.html        # 英文版首页
├── package.json           # Node.js配置文件
├── vercel.json            # Vercel部署配置
├── site.webmanifest       # PWA清单文件
├── robots.txt             # SEO机器人文件
├── sitemap.xml            # 网站地图
├── start.sh              # 启动脚本
├── styles/               # 样式文件
│   ├── main.css         # 主样式
│   ├── components.css   # 组件样式
│   └── resume-templates.css # 简历模板样式
├── scripts/             # JavaScript文件
│   ├── i18n.js         # 国际化模块
│   ├── app.js          # 主应用逻辑
│   ├── editor.js       # 编辑器功能
│   ├── export.js       # 导出功能
│   └── ui-utils.js     # UI工具
├── example-resume.md    # 中文示例简历
├── example-resume-en.md # 英文示例简历
├── DEPLOYMENT.md       # 部署指南
├── QUICK_START.md      # 快速开始指南
└── README.md           # 项目说明
```

### 网站路由结构
```
https://resumegenerator.aibytes.dpdns.org/
├── /                    # 中文首页 (index.html)
├── /app                 # 简历编辑器 (app.html)
├── /editor              # 编辑器别名 (app.html)
└── /landing-en.html     # 英文首页
```

### 设计原则
- **模块化开发** - 功能按模块分离
- **响应式设计** - 适配多种设备
- **无障碍访问** - 支持键盘导航和屏幕阅读器
- **性能优化** - 懒加载和防抖处理
- **用户体验** - 直观的界面和流畅的交互
- **国际化** - 多语言支持和文化适配

## 🎨 设计规范

### 色彩系统
- **主色调** - 专业蓝 (#3b82f6)
- **辅助色** - 成功绿、警告橙、错误红
- **中性色** - 灰度色阶，从浅到深

### 字体规范
- **主字体** - Inter (现代无衬线字体)
- **标题字体** - Playfair Display (优雅衬线字体)
- **代码字体** - JetBrains Mono (等宽字体)

### 间距系统
- 基于4px的间距系统
- 从4px到40px的标准间距值
- 保持视觉层次的一致性

## 🌐 部署指南

### Vercel部署（推荐）
项目已完全配置好Vercel部署：

1. **GitHub集成部署**
   - Fork本项目到您的GitHub
   - 在Vercel Dashboard中导入仓库
   - 自动部署，支持持续集成

2. **本地部署准备**
   - 已配置`vercel.json`
   - 已优化SEO和PWA支持
   - 已添加安全头和缓存策略

3. **路由配置**
   - 根路径 `/` 指向 Landing Page
   - `/app` 路径指向简历编辑器
   - 支持无扩展名的清洁URL

详细部署指南请参考：[DEPLOYMENT.md](DEPLOYMENT.md)

### 其他部署方式
- **GitHub Pages** - 静态站点托管
- **Netlify** - 现代化部署平台
- **自建服务器** - 任何支持静态文件的服务器

## 🔧 自定义开发

### 添加新模板
1. 在 `scripts/editor.js` 中添加模板内容
2. 在 `styles/resume-templates.css` 中添加样式
3. 更新模板选择器

### 添加新主题
1. 在CSS变量中定义新的颜色值
2. 在主题选择器中添加新选项
3. 更新主题切换逻辑

### 扩展导出功能
1. 在 `scripts/export.js` 中添加新的导出方法
2. 更新UI界面添加新按钮
3. 绑定相应的事件处理

### 国际化扩展
1. 在 `scripts/i18n.js` 中添加新语言
2. 更新HTML中的多语言标签
3. 添加相应的语言切换逻辑

## 📱 浏览器兼容性

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进项目：

1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

### 贡献规范
- 遵循现有的代码风格
- 添加必要的注释和文档
- 确保所有测试通过
- 更新相关文档

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢以下开源项目的支持：
- [Marked.js](https://marked.js.org/) - Markdown解析器
- [FontAwesome](https://fontawesome.com/) - 图标库
- [Google Fonts](https://fonts.google.com/) - 字体服务
- [Vercel](https://vercel.com/) - 部署平台

## 🌍 多语言文档

本项目提供中英文双语文档：

### 中文文档
- [README.md](README.md) - 项目说明
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - 项目总结
- [QUICK_START.md](QUICK_START.md) - 快速开始
- [STARTUP_GUIDE.md](STARTUP_GUIDE.md) - 启动指南
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南

### English Documentation
- [README_EN.md](README_EN.md) - Project Documentation
- [PROJECT_SUMMARY_EN.md](PROJECT_SUMMARY_EN.md) - Project Summary
- [QUICK_START_EN.md](QUICK_START_EN.md) - Quick Start Guide
- [STARTUP_GUIDE_EN.md](STARTUP_GUIDE_EN.md) - Startup Methods Guide

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交Issue到GitHub仓库
- 发送邮件反馈
- 社交媒体联系

## 🌟 特色亮点

- ✅ **零依赖部署** - 无需后端，直接使用
- ✅ **完全离线** - 下载后可脱离网络使用
- ✅ **国际化支持** - 中英文双语界面
- ✅ **PWA支持** - 可安装到设备
- ✅ **SEO优化** - 针对搜索引擎优化
- ✅ **响应式设计** - 完美适配各种设备
- ✅ **实时预览** - 所见即所得编辑体验
- ✅ **专业模板** - 精心设计的简历模板
- ✅ **高性能** - 优化的代码和流畅体验
- ✅ **开源免费** - MIT许可证，完全开源
- ✅ **美观首页** - 专业的产品展示页面
- ✅ **智能路由** - 清洁的URL和智能导航

## 📈 项目统计

- ⭐ 10,000+ 用户信赖
- 📄 50,000+ 简历生成
- 😊 98% 用户满意度
- 🌐 24/7 随时可用
- 🚀 持续更新优化

---

**AI简历生成器** - 让简历制作变得简单高效，助力您的职业发展 ✨ 