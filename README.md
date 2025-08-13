# AI Chat App

一个基于 React + TypeScript + Vite 构建的 iOS 风格 AI 聊天应用。

## 🌟 特性

- 🎨 **iOS 原生风格设计** - 完美还原 iOS 聊天界面
- 💬 **实时聊天体验** - 流畅的消息发送和接收
- ⚡ **极速构建** - 基于 Vite 的快速开发体验
- 🎯 **TypeScript** - 完整的类型安全保障
- 🌈 **柔和渐变背景** - 美观的视觉效果
- 📱 **响应式设计** - 完美适配各种设备
- ✨ **流畅动画** - 精心设计的交互动画

## 🛠 技术栈

- **前端框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **动画**: CSS3 + Tailwind 自定义动画

## 🚀 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 📁 项目结构

```
ai-chat-app/
├── src/
│   ├── components/
│   │   └── IOSChatInterface.tsx  # 主聊天组件
│   ├── App.tsx                   # 应用主组件
│   ├── App.css                   # 应用样式
│   ├── main.tsx                  # 应用入口
│   └── index.css                 # 全局样式
├── public/                       # 静态资源
├── package.json                  # 项目配置
├── tailwind.config.js           # Tailwind 配置
├── vite.config.ts               # Vite 配置
└── README.md                    # 项目说明
```

## ✨ 功能说明

### 聊天功能
- **消息发送**: 支持 Enter 键快速发送消息
- **自动滚动**: 新消息自动滚动到聊天底部
- **打字指示器**: AI 回复时显示输入状态动画
- **时间戳**: 每条消息显示发送时间

### 界面特色
- **毛玻璃效果**: 顶部导航栏和底部输入栏
- **消息气泡**: 用户消息（蓝色）和 AI 消息（半透明白色）
- **渐变背景**: 蓝紫粉色柔和渐变
- **响应式布局**: 移动端优先，桌面端适配

### 交互体验
- **发送按钮状态**: 根据输入内容动态变化
- **输入框自适应**: 多行文本自动调整高度
- **动画效果**: 消息入场动画和按钮交互动画

## 🎨 设计亮点

- **iOS 风格**: 完美还原 iOS Messages 应用的设计语言
- **现代视觉**: 采用最新的设计趋势和视觉效果
- **用户体验**: 注重细节的交互设计和动画效果

## 📱 在线预览

项目已部署到 GitHub Pages，您可以直接访问体验：
[https://hardihsu.github.io/ai-chat-app/](https://hardihsu.github.io/ai-chat-app/)

## 🔄 后续开发

- [ ] 集成真实 AI API
- [ ] 添加消息历史记录
- [ ] 支持图片和文件发送
- [ ] 添加更多聊天功能
- [ ] PWA 支持

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

**Made with ❤️ by hardihsu**