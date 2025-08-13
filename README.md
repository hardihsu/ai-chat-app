# AI Chat App

一个基于 React + TypeScript + Vite 构建的 iOS 风格 AI 聊天应用，支持真实的 AI API 集成。

## 🌟 特性

- 🎨 **iOS 原生风格设计** - 完美还原 iOS 聊天界面
- 💬 **真实AI对话** - 集成 DeepSeek Chat API，支持连续对话
- 📝 **Markdown 支持** - AI 回复支持完整的 Markdown 格式
- ⚙️ **API 配置** - 可自定义 API 端点地址
- ⚡ **极速构建** - 基于 Vite 的快速开发体验
- 🎯 **TypeScript** - 完整的类型安全保障
- 🌈 **柔和渐变背景** - 美观的视觉效果
- 📱 **响应式设计** - 完美适配各种设备
- ✨ **流畅动画** - 精心设计的交互动画
- 🛡️ **错误处理** - 完善的错误处理和用户反馈

## 🛠 技术栈

- **前端框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **图标**: Lucide React
- **Markdown**: react-markdown + remark-gfm
- **AI 集成**: DeepSeek Chat API
- **动画**: CSS3 + Tailwind 自定义动画

## 🔗 API 集成

### 支持的 API 格式

应用使用标准的 OpenAI 兼容 API 格式：

```javascript
fetch('https://your-api-endpoint.com', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek-chat',
    messages: [
      { role: 'user', content: '用户消息' },
      { role: 'assistant', content: 'AI回复' }
    ],
    max_tokens: 1000,
    temperature: 0.7,
    stream: false
  })
})
```

### 配置 API

1. 点击聊天界面右上角的 ⚙️ 按钮
2. 输入您的 API 端点地址
3. 确认后即可开始使用真实的 AI 服务

### 功能特点

- **对话上下文**: 自动保持最近5轮对话的上下文
- **错误处理**: 网络错误时显示友好的错误信息
- **输入保护**: API 调用期间禁用输入防止重复请求
- **响应格式**: 支持 markdown 格式的 AI 回复

## 📝 Markdown 功能

AI 回复现在支持完整的 Markdown 语法：

### 支持的语法
- **标题**: `# ## ###` 
- **列表**: 有序和无序列表
- **代码**: 行内代码和代码块
- **引用**: `>` 引用块
- **强调**: **粗体** 和 *斜体*
- **复选框**: `- [ ]` 和 `- [x]`
- **表格**: GitHub 风格表格
- **链接**: 自动链接识别

### 样式特点
- 🎯 **左对齐**: AI 消息内容保持左对齐
- 🎨 **iOS 风格**: 与整体设计保持一致
- 📖 **易读性**: 优化的字体大小和行间距
- 🌈 **语法高亮**: 代码块支持语法高亮

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
│   │   └── IOSChatInterface.tsx  # 主聊天组件 (含API集成)
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
- **真实AI对话**: 连接到 DeepSeek Chat API 进行智能对话
- **消息发送**: 支持 Enter 键快速发送消息
- **自动滚动**: 新消息自动滚动到聊天底部
- **打字指示器**: AI 回复时显示输入状态动画
- **时间戳**: 每条消息显示发送时间
- **对话上下文**: 保持连续的对话语境

### 界面特色
- **毛玻璃效果**: 顶部导航栏和底部输入栏
- **消息气泡**: 用户消息（蓝色）和 AI 消息（半透明白色）
- **渐变背景**: 蓝紫粉色柔和渐变
- **响应式布局**: 移动端优先，桌面端适配
- **API 配置**: 便捷的 API 地址配置界面

### 交互体验
- **发送按钮状态**: 根据输入内容和API状态动态变化
- **输入框自适应**: 多行文本自动调整高度
- **动画效果**: 消息入场动画和按钮交互动画
- **错误反馈**: 清晰的错误信息和解决建议

## 🎨 设计亮点

- **iOS 风格**: 完美还原 iOS Messages 应用的设计语言
- **现代视觉**: 采用最新的设计趋势和视觉效果
- **用户体验**: 注重细节的交互设计和动画效果
- **智能交互**: 真实的 AI 对话体验

## 📱 在线预览

项目已部署到 GitHub Pages，您可以直接访问体验：
[https://hardihsu.github.io/ai-chat-app/](https://hardihsu.github.io/ai-chat-app/)

> **注意**: 在线版本需要配置有效的 API 端点才能使用 AI 功能

## 🔧 部署配置

### 环境变量 (可选)

您可以通过环境变量预设API地址：

```bash
# .env.local
VITE_API_URL=https://your-api-endpoint.com
```

### API 兼容性

支持任何兼容 OpenAI Chat Completions API 格式的服务：
- DeepSeek API
- OpenAI API
- Azure OpenAI
- 其他兼容服务

## 🔄 后续开发

- [ ] 添加流式响应支持
- [ ] 消息历史本地存储
- [ ] 支持图片和文件上传
- [ ] 添加更多AI模型选择
- [ ] 代码语法高亮优化
- [ ] 支持数学公式渲染
- [ ] PWA 支持
- [ ] 多语言支持

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 开发指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [DeepSeek](https://www.deepseek.com/) - 提供强大的AI服务
- [React](https://reactjs.org/) - 优秀的前端框架
- [Tailwind CSS](https://tailwindcss.com/) - 实用的CSS框架
- [Vite](https://vitejs.dev/) - 快速的构建工具

---

**Made with ❤️ by hardihsu**