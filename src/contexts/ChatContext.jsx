import { useState, useEffect } from 'react';
import { useApiKey } from './useApiKey';
import { sendMessage } from '../services/api';
import { ChatContext } from './ChatContextProvider';
import {
  getSessions,
  getCurrentSession,
  createSession,
  updateSession,
  deleteSession,
  addMessageToSession,
  setCurrentSessionId,
  initializeStorage
} from '../utils/localStorage';

/**
 * 聊天上下文提供者组件
 * @param {Object} props - 组件属性
 * @returns {JSX.Element} - 上下文提供者组件
 */
export const ChatProvider = ({ children }) => {
  const { apiKey, isConfigured } = useApiKey();
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 初始化会话
  useEffect(() => {
    if (isConfigured) {
      initializeStorage();
      loadSessions();
    }
  }, [isConfigured]);

  /**
   * 加载所有会话
   */
  const loadSessions = () => {
    const allSessions = getSessions();
    setSessions(allSessions);

    const current = getCurrentSession();
    setCurrentSession(current);
  };

  /**
   * 创建新会话
   * @param {string} title - 会话标题
   * @returns {Object} - 新创建的会话
   */
  const handleCreateSession = (title = '新会话') => {
    const newSession = createSession(title);
    loadSessions();
    return newSession;
  };

  /**
   * 切换当前会话
   * @param {string} sessionId - 要切换到的会话ID
   */
  const handleSwitchSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    const session = sessions.find(s => s.id === sessionId);
    setCurrentSession(session);
  };

  /**
   * 删除会话
   * @param {string} sessionId - 要删除的会话ID
   */
  const handleDeleteSession = (sessionId) => {
    deleteSession(sessionId);
    loadSessions();
  };

  /**
   * 发送消息
   * @param {string} content - 消息内容
   * @param {Function} onChunk - 处理流式响应的回调函数
   * @returns {Promise<Object>} - 添加的AI回复消息
   */
  const handleSendMessage = async (content, onChunk = null) => {
    if (!isConfigured || !apiKey || !currentSession) {
      setError('请先配置API密钥');
      return null;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 添加用户消息到会话
      const userMessage = {
        id: Date.now().toString() + '-user-' + Math.random().toString(36).substring(2, 9),
        role: 'user',
        content,
        timestamp: new Date().toISOString()
      };

      const updatedSession = addMessageToSession(currentSession.id, userMessage);
      setCurrentSession(updatedSession);

      // 准备发送到API的消息历史
      const messages = updatedSession.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // 创建AI消息占位符
      const aiMessageId = Date.now().toString() + '-assistant-' + Math.random().toString(36).substring(2, 9);
      const aiMessage = {
        id: aiMessageId,
        role: 'assistant',
        content: '',
        timestamp: new Date().toISOString()
      };

      // 添加AI消息占位符到会话
      const sessionWithAiMessage = addMessageToSession(currentSession.id, aiMessage);
      setCurrentSession(sessionWithAiMessage);

      // 发送消息到API
      let fullResponse = '';
      const handleChunk = (chunk, fullText) => {
        fullResponse = fullText;
        
        // 更新AI消息内容
        const updatedAiMessage = {
          ...aiMessage,
          content: fullText
        };
        
        // 更新会话中的AI消息
        const updatedMessages = sessionWithAiMessage.messages.map(msg =>
          msg.id === aiMessageId ? updatedAiMessage : msg
        );
        
        const updatedSessionWithResponse = {
          ...sessionWithAiMessage,
          messages: updatedMessages
        };
        
        setCurrentSession(updatedSessionWithResponse);
        
        // 调用外部回调
        if (onChunk) {
          onChunk(chunk, fullText);
        }
      };

      await sendMessage(apiKey, messages, handleChunk);

      // 更新最终的AI消息
      const finalAiMessage = {
        ...aiMessage,
        content: fullResponse
      };

      // 更新会话中的最终AI消息
      const finalSession = updateSession(currentSession.id, {
        messages: sessionWithAiMessage.messages.map(msg =>
          msg.id === aiMessageId ? finalAiMessage : msg
        )
      });

      setCurrentSession(finalSession);
      loadSessions();

      return finalAiMessage;
    } catch (err) {
      setError(err.message || '发送消息失败');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 上下文值
  const value = {
    sessions,
    currentSession,
    isLoading,
    error,
    createSession: handleCreateSession,
    switchSession: handleSwitchSession,
    deleteSession: handleDeleteSession,
    sendMessage: handleSendMessage,
    refreshSessions: loadSessions
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// useChat Hook已移至useChatHook.js文件