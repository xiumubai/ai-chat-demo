import { useState } from 'react';
import { useChat } from '../contexts/useChatHook';

/**
 * 聊天输入组件
 * @returns {JSX.Element} - 聊天输入组件
 */
const ChatInput = () => {
  const { sendMessage, isLoading } = useChat();
  const [message, setMessage] = useState('');

  /**
   * 处理发送消息
   * @param {Event} e - 事件对象
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    try {
      await sendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  };

  /**
   * 处理按键事件，支持Ctrl+Enter或Command+Enter发送消息
   * @param {KeyboardEvent} e - 键盘事件
   */
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSendMessage} className="relative">
        <div className="relative rounded-xl shadow-sm border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400 focus-within:border-blue-500 dark:focus-within:border-blue-400 transition-all">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的问题...(Ctrl+Enter 发送)"
            className="w-full p-4 bg-transparent text-gray-900 dark:text-gray-100 pr-12 resize-none focus:outline-none"
            rows="3"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="absolute right-3 bottom-3 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </form>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        提示：您可以使用Markdown格式来编写消息，支持代码块、表格等。
      </p>
    </div>
  );
};

export default ChatInput;