import { useApiKey } from '../contexts/useApiKey';
import { useTheme } from '../contexts/useTheme';
import { useState } from 'react';

/**
 * 页面头部组件
 * @param {Object} props - 组件属性
 * @param {Function} props.toggleSidebar - 切换侧边栏的函数
 * @returns {JSX.Element} - 页面头部组件
 */
const Header = () => {
  const { isConfigured, clearApiKey } = useApiKey();
  const { darkMode, toggleTheme } = useTheme();
  const [showingLogoutConfirm, setShowingLogoutConfirm] = useState(false);
  
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">AI聊天助手</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label={darkMode ? '切换到浅色模式' : '切换到深色模式'}
            title={darkMode ? '切换到浅色模式' : '切换到深色模式'}
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          
          {isConfigured && (
            showingLogoutConfirm ? (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setShowingLogoutConfirm(false);
                  }}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    // 完全清除配置和会话记录
                    clearApiKey(false);
                    setShowingLogoutConfirm(false);
                  }}
                  className="text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 px-3 py-1.5 rounded-md transition-colors"
                >
                  确认退出
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowingLogoutConfirm(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-md transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                退出登录
              </button>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;