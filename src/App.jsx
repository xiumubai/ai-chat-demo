import React, { useState } from 'react'
import './App.css'
import { ApiKeyProvider } from './contexts/ApiKeyContext'
import { ChatProvider } from './contexts/ChatContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Header from './components/Header'
import ApiKeyConfig from './components/ApiKeyConfig'
import ChatWindow from './components/ChatWindow'
import SessionList from './components/SessionList'
import { useApiKey } from './contexts/useApiKey'

// 内部组件，用于条件渲染聊天界面或API密钥配置界面
const AppContent = () => {
  const { isConfigured } = useApiKey();
  const [showSidebar, setShowSidebar] = useState(false);

  // 切换侧边栏显示状态
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header toggleSidebar={toggleSidebar} />

      <main className="h-[calc(100vh-4rem)]">
        {!isConfigured ? (
          <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <ApiKeyConfig />
          </div>
        ) : (
          <div className="flex h-full relative">
            {/* 移动端侧边栏遮罩层 */}
            {showSidebar && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
                onClick={toggleSidebar}
              ></div>
            )}
            
            {/* 会话列表侧边栏 - 在移动端可滑入滑出 */}
            <div 
              className={`${showSidebar ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 fixed md:static left-0 top-0 bottom-0 z-30 
                transition-transform duration-300 ease-in-out md:transition-none`}
            >
              <SessionList closeSidebar={() => setShowSidebar(false)} />
            </div>
            
            {/* 聊天窗口 */}
            <ChatWindow toggleSidebar={toggleSidebar} />
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ApiKeyProvider>
        <ChatProvider>
          <AppContent />
        </ChatProvider>
      </ApiKeyProvider>
    </ThemeProvider>
  )
}

export default App
