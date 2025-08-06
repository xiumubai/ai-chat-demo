import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContextProvider';

/**
 * 主题上下文提供者组件
 * @param {Object} props - 组件属性
 * @returns {JSX.Element} - 上下文提供者组件
 */
export const ThemeProvider = ({ children }) => {
  // 初始化主题状态，优先使用本地存储的主题，否则使用系统主题
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 当主题变化时更新文档类和本地存储
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // 切换主题
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // 上下文值
  const value = {
    darkMode,
    toggleTheme
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};