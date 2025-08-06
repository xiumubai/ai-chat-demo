import { useContext } from 'react';
import { ThemeContext } from './ThemeContextProvider';

/**
 * 使用主题上下文的自定义Hook
 * @returns {Object} - 主题上下文值
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme必须在ThemeProvider内部使用');
  }
  return context;
};