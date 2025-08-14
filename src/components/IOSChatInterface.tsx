import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

const IOSChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是AI助手，很高兴为您服务。有什么我可以帮助您的吗？\n\n我可以帮助您：\n- 回答问题\n- 编写代码\n- 分析数据\n- 创意写作\n\n请随时告诉我您需要什么帮助！',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiUrl] = useState('https://openai-chat-workers.hardihsu.workers.dev');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 获取对话历史，用于API请求
  const getConversationHistory = (newUserMessage: string): ApiMessage[] => {
    const conversationMessages: ApiMessage[] = [];
    
    // 添加系统消息
    conversationMessages.push({
      role: 'assistant',
      content: '你是一个友好、专业的AI助手。请用markdown格式回复，包含适当的标题、列表、代码块等格式，让回答更清晰易读。'
    });
    
    // 添加最近的对话历史（保留最后5轮对话）
    const recentMessages = messages.slice(-10); // 最多10条消息，即5轮对话
    recentMessages.forEach(msg => {
      if (msg.isUser) {
        conversationMessages.push({
          role: 'user',
          content: msg.text
        });
      } else {
        conversationMessages.push({
          role: 'assistant',
          content: msg.text
        });
      }
    });
    
    // 添加当前用户消息
    conversationMessages.push({
      role: 'user',
      content: newUserMessage
    });
    
    return conversationMessages;
  };

  const callAI = async (userMessage: string): Promise<string> => {
    try {
      const conversationHistory = getConversationHistory(userMessage);
      console.log('conversationHistory', conversationHistory)
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{ role: 'user', content: conversationHistory[conversationHistory.length - 1].content }],
          max_tokens: 1000,
          temperature: 0.7,
          stream: false
        })
      });
      console.log('response', response)
      // if (!response.ok) {
      //   throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
      // }

      const data = await response.json();
      
      // 检查响应格式
      if (data.choices && data.choices[0] && data.choices[0].message) {
        return data.choices[0].message.content || '抱歉，我没有收到有效的回复。';
      } else {
        throw new Error('API返回格式异常');
      }
    } catch (error) {
      console.error('AI API调用失败:', error);
      
      // 返回错误信息，包含markdown格式
      return `## ⚠️ 连接失败

很抱歉，我暂时无法连接到AI服务。

### 可能的原因：
- 网络连接问题
- API服务暂时不可用
- 请求配置需要调整

### 解决建议：
1. **检查网络连接**
2. **稍后重试**
3. **联系管理员配置API地址**

当前API地址: \`${apiUrl}\`

> 💡 **提示**: 您可以在设置中更新API地址`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputText;
    setInputText('');
    setIsTyping(true);

    try {
      // 调用AI API
      const aiResponseText = await callAI(currentInput);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('发送消息失败:', error);
      
      // 显示错误消息
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '抱歉，发送消息时出现错误，请稍后重试。',
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 px-4 py-3 flex items-center justify-center shadow-sm relative">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">AI</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">AI助手</h1>
            <p className="text-xs text-green-500">在线</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-3xl shadow-sm ${
                message.isUser
                  ? 'bg-blue-500 text-white rounded-br-lg shadow-md'
                  : 'bg-white/80 backdrop-blur-sm text-gray-800 border border-white/50 rounded-bl-lg shadow-sm'
              }`}
            >
              {message.isUser ? (
                <p className="text-sm leading-relaxed">{message.text}</p>
              ) : (
                <div className="text-sm leading-relaxed text-left">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-sm max-w-none"
                    components={{
                      // 自定义组件样式
                      h1: ({children}) => <h1 className="text-base font-bold mb-2 mt-2 text-gray-800">{children}</h1>,
                      h2: ({children}) => <h2 className="text-sm font-bold mb-2 mt-2 text-gray-800">{children}</h2>,
                      h3: ({children}) => <h3 className="text-sm font-semibold mb-1 mt-2 text-gray-800">{children}</h3>,
                      p: ({children}) => <p className="mb-2 text-gray-800 text-left">{children}</p>,
                      ul: ({children}) => <ul className="list-disc pl-4 mb-2 text-left">{children}</ul>,
                      ol: ({children}) => <ol className="list-decimal pl-4 mb-2 text-left">{children}</ol>,
                      li: ({children}) => <li className="mb-1 text-gray-800 text-left">{children}</li>,
                      code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-xs font-mono text-gray-800">{children}</code>,
                      pre: ({children}) => <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-2">{children}</pre>,
                      blockquote: ({children}) => <blockquote className="border-l-4 border-blue-400 pl-3 italic mb-2 text-gray-700">{children}</blockquote>,
                      strong: ({children}) => <strong className="font-semibold text-gray-900">{children}</strong>,
                      em: ({children}) => <em className="italic text-gray-700">{children}</em>,
                    }}
                  >
                    {message.text}
                  </ReactMarkdown>
                </div>
              )}
              <p className={`text-xs mt-1 text-left ${
                message.isUser ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white/80 backdrop-blur-sm text-gray-800 border border-white/50 px-4 py-3 rounded-3xl rounded-bl-lg shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-4 py-3">
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入消息..."
              className="w-full bg-gray-100 rounded-full px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200 flex items-center"
              rows={1}
              style={{
                minHeight: '40px',
                maxHeight: '120px',
                lineHeight: '1.5'
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = Math.min(target.scrollHeight, 120) + 'px';
              }}
              disabled={isTyping}
            />
          </div>
          
          {/* Send button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
              inputText.trim() && !isTyping
                ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-600 active:scale-95'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IOSChatInterface;