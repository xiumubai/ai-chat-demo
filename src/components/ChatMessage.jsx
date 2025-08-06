import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { getMarkdownComponents } from '../utils/markdown.jsx';
import { useTheme } from '../contexts/useTheme';

/**
 * 聊天消息组件
 * @param {Object} props - 组件属性
 * @returns {JSX.Element} - 聊天消息组件
 */
const ChatMessage = ({ message, isLast }) => {
  const { darkMode } = useTheme();
  const messageRef = useRef(null);
  const isUser = message.role === 'user';
  
  // 自定义Markdown组件
  const components = getMarkdownComponents({ darkMode });
  
  // 如果是最后一条消息，滚动到可见
  useEffect(() => {
    if (isLast && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLast, message.content]);
  
  return (
    <div 
      ref={messageRef}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-8`}
    >
      <div className={`flex max-w-[85%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {!isUser && (
          <div className="flex-shrink-0 mr-3 self-end mb-1">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
              AI
            </div>
          </div>
        )}
        
        <div 
          className={`rounded-2xl px-4 py-3 ${isUser 
            ? 'bg-blue-600 text-white rounded-tr-none' 
            : 'bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 rounded-tl-none'}`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="markdown-content prose dark:prose-invert prose-sm max-w-none">
              <ReactMarkdown 
                components={components}
              >
                {message.content || '思考中...'}
              </ReactMarkdown>
            </div>
          )}
          
          <div className="text-xs mt-1 text-right opacity-70">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 ml-3 self-end mb-1">
            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-700 dark:text-gray-200 font-medium shadow-sm">
              您
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;