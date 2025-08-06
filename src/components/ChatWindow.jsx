import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../contexts/useChatHook';

/**
 * 聊天窗口组件
 * @param {Object} props - 组件属性
 * @param {Function} props.toggleSidebar - 切换侧边栏的函数
 * @returns {JSX.Element} - 聊天窗口组件
 */
const ChatWindow = ({ toggleSidebar }) => {
  const { currentSession, error } = useChat();
  const messagesEndRef = useRef(null);
  
  // 当消息更新时，滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSession?.messages]);
  
  // 如果没有当前会话，显示提示信息
  if (!currentSession) {
    return (
      <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">
          没有活动的会话，请创建一个新会话开始聊天。
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 flex flex-col relative">
      {/* 移动端会话按钮 */}
      <div className="md:hidden flex items-center p-2 border-b border-gray-200 dark:border-gray-700">
        <button 
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="ml-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
          {currentSession?.title || '新会话'}
        </h2>
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white dark:from-gray-800 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex-1 overflow-y-auto px-4 md:px-8 lg:px-16 py-6 md:pt-16 pt-4 space-y-6">
        {currentSession.messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6 max-w-md">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-3">
                开始一个新的对话
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                您可以询问任何问题，AI助手将尽力为您提供帮助。
              </p>
            </div>
          </div>
        ) : (
          currentSession.messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLast={index === currentSession.messages.length - 1} 
            />
          ))
        )}
        <div ref={messagesEndRef} className="h-20" />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white dark:from-gray-800 to-transparent h-24 pointer-events-none"></div>
      
      <div className="sticky bottom-0 px-4 md:px-8 lg:px-16 pb-4 pt-2 bg-white dark:bg-gray-800">
        {error && (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;