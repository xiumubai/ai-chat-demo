import React from 'react'
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />

      <main className="h-[calc(100vh-4rem)]">
        {!isConfigured ? (
          <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <ApiKeyConfig />
          </div>
        ) : (
          <div className="flex h-full">
            <SessionList />
            <ChatWindow />
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
