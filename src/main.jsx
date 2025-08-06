import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ApiKeyProvider } from './contexts/ApiKeyContext.jsx'
import { ChatProvider } from './contexts/ChatContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ApiKeyProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </ApiKeyProvider>
    </ThemeProvider>
  </StrictMode>,
)
