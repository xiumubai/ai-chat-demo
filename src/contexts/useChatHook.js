import { useContext } from 'react';
import { ChatContext } from './ChatContextProvider';

/**
 * 使用聊天上下文的自定义Hook
 * @returns {Object} - 聊天上下文值
 */
export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat必须在ChatProvider内部使用');
  }
  return context;
};