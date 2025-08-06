import { useState } from 'react';
import { useChat } from '../contexts/useChatHook';

/**
 * 会话列表组件
 * @param {Object} props - 组件属性
 * @param {Function} props.closeSidebar - 关闭侧边栏的函数（移动端使用）
 * @returns {JSX.Element} - 会话列表组件
 */
const SessionList = ({ closeSidebar }) => {
  const { sessions, currentSession, createSession, switchSession, deleteSession } = useChat();
  const [isCreating, setIsCreating] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  
  /**
   * 处理创建新会话
   */
  const handleCreateSession = () => {
    if (isCreating) {
      if (newSessionTitle.trim()) {
        createSession(newSessionTitle.trim());
        setNewSessionTitle('');
      } else {
        createSession();
      }
      setIsCreating(false);
    } else {
      setIsCreating(true);
    }
  };
  
  /**
   * 处理取消创建新会话
   */
  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewSessionTitle('');
  };
  
  /**
   * 处理删除会话
   * @param {string} sessionId - 要删除的会话ID
   * @param {Event} e - 事件对象
   */
  const handleDeleteSession = (sessionId, e) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这个会话吗？')) {
      deleteSession(sessionId);
    }
  };
  
  /**
   * 处理切换会话
   * @param {string} sessionId - 要切换到的会话ID
   */
  const handleSwitchSession = (sessionId) => {
    switchSession(sessionId);
    // 在移动端上关闭侧边栏
    if (closeSidebar) {
      closeSidebar();
    }
  };

  /**
   * 格式化日期
   * @param {string} dateString - ISO格式的日期字符串
   * @returns {string} - 格式化后的日期字符串
   */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="w-72 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        {/* <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">AI聊天助手</h2> */}
        
        {isCreating ? (
          <div className="mb-2">
            <input
              type="text"
              value={newSessionTitle}
              onChange={(e) => setNewSessionTitle(e.target.value)}
              placeholder="会话名称"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2"
              autoFocus
            />
            <div className="flex space-x-2">
              <button
                onClick={handleCreateSession}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-1.5 px-2 rounded-md text-sm"
              >
                创建
              </button>
              <button
                onClick={handleCancelCreate}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-1.5 px-2 rounded-md text-sm"
              >
                取消
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleCreateSession}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center justify-center mb-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            新建会话
          </button>
        )}
      </div>
      
      <div className="overflow-y-auto flex-1 py-2">
        {sessions.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            没有会话，点击上方按钮创建新会话
          </p>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              onClick={() => handleSwitchSession(session.id)}
              className={`px-4 py-3 cursor-pointer flex justify-between items-start group ${currentSession?.id === session.id 
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-l-4 border-blue-600 dark:border-blue-500' 
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'}`}
            >
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{session.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {formatDate(session.updatedAt)}
                </div>
              </div>
              
              {sessions.length > 1 && (
                <button
                  onClick={(e) => handleDeleteSession(session.id, e)}
                  className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  title="删除会话"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SessionList;