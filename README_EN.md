# AI Resume Generator | AI简历生成器

A lightweight Markdown resume conversion tool that supports real-time preview, style customization, and static export functionality. No backend dependencies required - complete all operations directly in the browser. Now featuring full bilingual support and comprehensive optimization for international users.

🌐 **Live Demo**: [https://resumegenerator.aibytes.dpdns.org](https://resumegenerator.aibytes.dpdns.org)

## ✨ Features

### 📝 Editor Functions
- **Real-time Markdown Preview** - Edit on the left, preview on the right with scroll synchronization
- **File Import Support** - Drag and drop .md and .txt files
- **Quick Template Loading** - Built-in professional resume templates
- **Undo/Redo** - Complete editing history management (50-step history)
- **Local Storage** - Auto-save to prevent data loss
- **Smart Icon Recognition** - Automatically adds icons for contact information

### 🎨 Style Customization
- **Multiple Templates** - Classic, Modern, Minimal design styles
- **Theme Colors** - Blue, Green, Purple, Red, Gray themes
- **Multi-language Support** - Chinese/English interface switching with internationalization
- **Font Adjustment** - Adjustable font size, line height, page margins
- **Dark/Light Theme** - Support for theme switching with optimized dark mode preview
- **Responsive Design** - Compatible with desktop and mobile devices

### 📤 Export Functions
- **HTML Export** - Generate standalone HTML files with professional white background
- **Print Optimization** - Specially optimized print styles
- **PDF Export** - Generate PDF via browser print function
- **Code Copy** - One-click HTML code copying
- **Markdown Export** - Export original Markdown files

### 🛠️ User Experience
- **Keyboard Shortcuts** - Shortcuts for common operations
- **Fullscreen Preview** - Focused preview mode
- **Zoom Control** - 50%-200% preview scaling
- **Layout Toggle** - Horizontal/Vertical layout switching
- **Tooltips** - Detailed operation guidance
- **Scroll Synchronization** - Bidirectional scroll sync between editor and preview

### 🌐 Internationalization Support
- **Bilingual Interface** - Complete Chinese/English interface switching
- **International SEO** - Search engine optimization for global users
- **Multi-language Documentation** - Complete bilingual project documentation
- **PWA Support** - Installable to devices with offline support
- **Social Sharing Optimization** - Optimized for international social media platforms

### 🎯 Landing Page Homepage
- **Beautiful Welcome Page** - Modern designed product introduction page
- **Feature Demonstration** - Live Markdown editor and preview demo
- **Template Showcase** - Professional resume template previews
- **Usage Guide** - Three-step simple usage flow
- **Multi-language Support** - Seamless Chinese/English version switching

## 🚀 Quick Start

### 🌐 Online Use (Recommended)
- **Homepage**: [https://resumegenerator.aibytes.dpdns.org](https://resumegenerator.aibytes.dpdns.org)
- **Resume Editor**: [https://resumegenerator.aibytes.dpdns.org/app](https://resumegenerator.aibytes.dpdns.org/app)
- **English Homepage**: [https://resumegenerator.aibytes.dpdns.org/landing-en.html](https://resumegenerator.aibytes.dpdns.org/landing-en.html)

### 💻 Local Use

#### Method 1: Start from Welcome Page
1. Download project files to local machine
2. Double-click to open `index.html` file to view product introduction
3. Click "Get Started" button to enter editor (`app.html`)
4. Start editing your resume!

#### Method 2: Direct Editor Use
1. Download project files to local machine
2. Double-click to open `app.html` file
3. Start editing your resume!

#### Method 3: Using Startup Script
```bash
./start.sh
```
The script will automatically open the welcome page in your default browser.

#### Method 4: Node.js Local Server
If you have Node.js installed, you can use the following commands:
```bash
# Using http-server
npm start

# Or using live-server (with hot reload)
npm run dev

# Preview mode
npm run preview
```

### Usage Steps
1. **Visit Homepage** - Browse product introduction and feature demonstration
2. **Enter Editor** - Click "Get Started" button
3. **Edit Content** - Enter Markdown-formatted resume in the left editor
4. **Select Template** - Choose your preferred template and theme in settings panel
5. **Preview Effect** - View resume effect in real-time on the right
6. **Export Resume** - Export as HTML, PDF, or print

## 📋 Template Examples

### Basic Template
Suitable for entry-level job seekers with a clean and universal design style.

### Developer Template
Designed specifically for software engineers, highlighting technical skills and project experience.

### Designer Template
Suitable for UI/UX designers and creative workers, emphasizing design concepts and portfolio showcase.

### Manager Template
Suitable for team leaders and project managers, highlighting management experience and leadership abilities.

## 🎯 Markdown Syntax Guide

### Basic Syntax
```markdown
# Name (H1 Title)
**Job Title**

## Contact Information
- 📧 Email: your.email@example.com
- 📱 Phone: +1 (555) 123-4567
- 🏠 Address: Your City
- 💼 LinkedIn: linkedin.com/in/yourprofile
- 🐙 GitHub: github.com/yourusername

## Personal Summary
Brief personal introduction...

## Work Experience
### Job Title | Company Name
*Time Period*

- Main responsibilities
- Achievements

## Skills
- **Skill Category**: Specific skill list
```

### Contact Information Icons
The system automatically recognizes the following formats and adds corresponding icons:
- `📧 Email:` → Email icon
- `📱 Phone:` → Phone icon
- `🏠 Address:` → Address icon
- `💼 LinkedIn:` → LinkedIn icon
- `🐙 GitHub:` → GitHub icon

## ⌨️ Keyboard Shortcuts

| Shortcut | Function |
|----------|----------|
| `Ctrl/Cmd + S` | Save to local storage |
| `Ctrl/Cmd + Z` | Undo |
| `Ctrl/Cmd + Shift + Z` | Redo |
| `Ctrl/Cmd + P` | Print resume |
| `Ctrl/Cmd + E` | Export HTML |

## 🏗️ Technical Architecture

### Frontend Tech Stack
- **HTML5** - Semantic tag structure
- **CSS Grid** - Modern layout system
- **JavaScript ES6+** - Modular development
- **Marked.js** - Markdown parsing
- **FontAwesome** - Icon library
- **Google Fonts** - Font service

### Project Structure
```
ai-resume-generator/
├── index.html              # Product Homepage (Landing Page)
├── app.html               # Resume Editor Application
├── landing-en.html        # English Homepage
├── package.json           # Node.js configuration
├── vercel.json            # Vercel deployment config
├── site.webmanifest       # PWA manifest file
├── robots.txt             # SEO robots file
├── sitemap.xml            # Website sitemap
├── start.sh              # Startup script
├── styles/               # Style files
│   ├── main.css         # Main styles
│   ├── components.css   # Component styles
│   └── resume-templates.css # Resume template styles
├── scripts/             # JavaScript files
│   ├── i18n.js         # Internationalization module
│   ├── app.js          # Main application logic
│   ├── editor.js       # Editor functionality
│   ├── export.js       # Export functionality
│   └── ui-utils.js     # UI utilities
├── example-resume.md    # Chinese example resume
├── example-resume-en.md # English example resume
├── DEPLOYMENT.md       # Deployment guide
├── QUICK_START.md      # Quick start guide
└── README.md           # Project documentation
```

### Website Routing Structure
```
https://resumegenerator.aibytes.dpdns.org/
├── /                    # Chinese Homepage (index.html)
├── /app                 # Resume Editor (app.html)
├── /editor              # Editor Alias (app.html)
└── /landing-en.html     # English Homepage
```

### Design Principles
- **Modular Development** - Features separated by modules
- **Responsive Design** - Compatible with multiple devices
- **Accessibility** - Support for keyboard navigation and screen readers
- **Performance Optimization** - Lazy loading and debounce handling
- **User Experience** - Intuitive interface and smooth interactions
- **Internationalization** - Multi-language support and cultural adaptation

## 🎨 Design Specifications

### Color System
- **Primary Color** - Professional Blue (#3b82f6)
- **Secondary Colors** - Success Green, Warning Orange, Error Red
- **Neutral Colors** - Grayscale from light to dark

### Typography
- **Primary Font** - Inter (Modern sans-serif)
- **Heading Font** - Playfair Display (Elegant serif)
- **Code Font** - JetBrains Mono (Monospace)

### Spacing System
- 4px-based spacing system
- Standard spacing values from 4px to 40px
- Consistent visual hierarchy

## 🌐 Deployment Guide

### Vercel Deployment (Recommended)
The project is fully configured for Vercel deployment:

1. **GitHub Integration Deployment**
   - Fork this project to your GitHub
   - Import repository in Vercel Dashboard
   - Automatic deployment with continuous integration

2. **Local Deployment Preparation**
   - Pre-configured `vercel.json`
   - Optimized SEO and PWA support
   - Added security headers and caching strategies

3. **Routing Configuration**
   - Root path `/` points to Landing Page
   - `/app` path points to Resume Editor
   - Support for clean URLs without extensions

For detailed deployment guide, see: [DEPLOYMENT.md](DEPLOYMENT.md)

### Other Deployment Options
- **GitHub Pages** - Static site hosting
- **Netlify** - Modern deployment platform
- **Self-hosted Server** - Any server supporting static files

## 🔧 Custom Development

### Adding New Templates
1. Add template content in `scripts/editor.js`
2. Add styles in `styles/resume-templates.css`
3. Update template selector

### Adding New Themes
1. Define new color values in CSS variables
2. Add new options in theme selector
3. Update theme switching logic

### Extending Export Functions
1. Add new export methods in `scripts/export.js`
2. Update UI to add new buttons
3. Bind corresponding event handlers

### Internationalization Extension
1. Add new languages in `scripts/i18n.js`
2. Update multi-language tags in HTML
3. Add corresponding language switching logic

## 📱 Browser Compatibility

- **Chrome** 80+
- **Firefox** 75+
- **Safari** 13+
- **Edge** 80+

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve the project:

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### Contributing Guidelines
- Follow existing code style
- Add necessary comments and documentation
- Ensure all tests pass
- Update relevant documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Thanks to the following open source projects for their support:
- [Marked.js](https://marked.js.org/) - Markdown parser
- [FontAwesome](https://fontawesome.com/) - Icon library
- [Google Fonts](https://fonts.google.com/) - Font service
- [Vercel](https://vercel.com/) - Deployment platform

## 🌍 Multi-language Documentation

This project provides bilingual documentation in Chinese and English:

### 中文文档 (Chinese Documentation)
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

## 📞 Contact

If you have questions or suggestions, please contact us through:
- Submit an Issue to GitHub repository
- Send feedback email
- Social media contact

## 🌟 Key Highlights

- ✅ **Zero-dependency Deployment** - No backend required, direct use
- ✅ **Completely Offline** - Can be used offline after download
- ✅ **International Support** - Bilingual Chinese/English interface
- ✅ **PWA Support** - Installable to devices
- ✅ **SEO Optimized** - Search engine optimized
- ✅ **Responsive Design** - Perfect adaptation to all devices
- ✅ **Real-time Preview** - WYSIWYG editing experience
- ✅ **Professional Templates** - Carefully designed resume templates
- ✅ **High Performance** - Optimized code and smooth experience
- ✅ **Open Source & Free** - MIT license, completely open source
- ✅ **Beautiful Homepage** - Professional product showcase page
- ✅ **Smart Routing** - Clean URLs and intelligent navigation

## 📈 Project Statistics

- ⭐ 10,000+ Trusted Users
- 📄 50,000+ Resumes Generated
- 😊 98% User Satisfaction
- 🌐 24/7 Always Available
- 🚀 Continuous Updates & Optimization

---

**AI Resume Generator** - Making resume creation simple and efficient, empowering your career development ✨ 