import { useContext } from 'react';
import { ApiKeyContext } from './ApiKeyContextProvider';

/**
 * 使用API密钥上下文的自定义Hook
 * @returns {Object} - API密钥上下文值
 */
export const useApiKey = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKey必须在ApiKeyProvider内部使用');
  }
  return context;
};