# 小红书翻译助手 (XHS Translate)

[English](#english) | [中文](#chinese)

<a name="chinese"></a>
## 中文说明

一个简单易用的 Chrome 扩展，为小红书提供实时翻译功能。

### 安装说明

1. 下载源代码：
   - 点击本页面右上角的 "Code" 按钮
   - 选择 "Download ZIP"
   - 解压下载的文件

2. 安装扩展：
   - 打开 Chrome 浏览器
   - 在地址栏输入 `chrome://extensions/`
   - 开启右上角的"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择解压后的文件夹

注意：由于 Chrome 安全策略限制，目前仅支持开发者模式安装。

### 功能特点

- 🚀 自动翻译：当评论出现在视图中时自动翻译
- 🌍 多语言支持：自动检测用户语言，支持中英文界面
- 💡 智能检测：自动识别评论语言，中文翻译为英文，英文翻译为中文
- 🎯 精准定位：准确识别评论位置，自动添加翻译按钮
- 🔄 实时更新：监听页面变化，确保新加载的评论也能被翻译
- 📱 响应式设计：适配小红书的界面风格

### 使用说明

1. 安装扩展后访问小红书网页版
2. 扩展会自动检测评论并添加翻译功能
3. 评论出现在视图中时会自动翻译
4. 点击翻译按钮可以切换显示/隐藏翻译结果

### 技术实现

- 使用 Intersection Observer 监测评论可见性
- MutationObserver 监听页面变化
- Chrome Extension API 进行翻译
- 原生 JavaScript 实现，无需额外依赖

### 项目结构

```
xhsTranslate/
├── manifest.json        # 扩展配置文件
├── content.js          # 主要功能实现
├── background.js       # 后台脚本
├── icons/             # 扩展图标
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # 项目说明文档
```

### 更新日志

#### v1.0.0 (2024-01-16)
- 首次发布
- 支持自动翻译评论
- 支持中英文界面
- 支持显示/隐藏翻译结果

### 开发计划

- [ ] 支持更多语言
- [ ] 添加翻译开关选项
- [ ] 优化翻译显示样式
- [ ] 添加更多交互功能
- [ ] 支持更多翻译服务提供商
- [ ] 发布到 Chrome Web Store

### 问题反馈

如果您在使用过程中遇到任何问题，或有任何建议，欢迎：
1. 在 GitHub 上提交 Issue
2. 提交 Pull Request 来帮助改进这个项目

### 许可证

MIT License

---

<a name="english"></a>
## English Documentation

A user-friendly Chrome extension that provides real-time translation for Xiaohongshu (Little Red Book) comments.

### Installation Guide

1. Download the source code:
   - Click the "Code" button at the top right of this page
   - Select "Download ZIP"
   - Extract the downloaded file

2. Install the extension:
   - Open Chrome browser
   - Enter `chrome://extensions/` in the address bar
   - Enable "Developer mode" in the top right corner
   - Click "Load unpacked"
   - Select the extracted folder

Note: Due to Chrome security policies, the extension currently only supports installation in developer mode.

### Features

- 🚀 Auto Translation: Automatically translates comments when they appear in view
- 🌍 Multi-language Support: Automatically detects user language, supports Chinese and English interfaces
- 💡 Smart Detection: Automatically identifies comment language, translates Chinese to English and vice versa
- 🎯 Precise Positioning: Accurately identifies comment locations and automatically adds translation buttons
- 🔄 Real-time Updates: Monitors page changes to ensure newly loaded comments can be translated
- 📱 Responsive Design: Adapts to Xiaohongshu's interface style

### Usage Instructions

1. Visit Xiaohongshu web version after installing the extension
2. The extension will automatically detect comments and add translation functionality
3. Comments will be translated automatically when they appear in view
4. Click the translation button to toggle show/hide translation results

### Technical Implementation

- Uses Intersection Observer to detect comment visibility
- MutationObserver to monitor page changes
- Chrome Extension API for translations
- Pure JavaScript implementation, no additional dependencies required

### Project Structure

```
xhsTranslate/
├── manifest.json        # Extension configuration file
├── content.js          # Main functionality implementation
├── background.js       # Background script
├── icons/             # Extension icons
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # Project documentation
```

### Changelog

#### v1.0.0 (2024-01-16)
- Initial release
- Support for automatic comment translation
- Support for Chinese and English interfaces
- Support for showing/hiding translation results

### Development Plans

- [ ] Support for more languages
- [ ] Add translation toggle options
- [ ] Optimize translation display styles
- [ ] Add more interactive features
- [ ] Support for more translation service providers
- [ ] Publish to Chrome Web Store

### Feedback

If you encounter any issues or have suggestions while using the extension, you're welcome to:
1. Submit an Issue on GitHub
2. Submit a Pull Request to help improve this project

### License

MIT License 