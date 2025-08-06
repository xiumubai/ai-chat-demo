import { useState, useEffect } from 'react';
import { getApiKey, saveApiKey as saveApiKeyToStorage, removeApiKey } from '../utils/localStorage';
import { validateApiKey } from '../services/api';
import { ApiKeyContext } from './ApiKeyContextProvider';

/**
 * API密钥上下文提供者组件
 * @param {Object} props - 组件属性
 * @returns {JSX.Element} - 上下文提供者组件
 */
export const ApiKeyProvider = ({ children }) => {
  const [apiKey, setApiKey] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState(null);

  // 初始化时从本地存储加载API密钥
  useEffect(() => {
    const storedApiKey = getApiKey();
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setIsConfigured(true);
    }
  }, []);

  /**
   * 保存API密钥
   * @param {string} key - 要保存的API密钥
   * @returns {Promise<boolean>} - 是否成功保存
   */
  const saveApiKey = async (key) => {
    setIsValidating(true);
    setError(null);

    try {
      // 验证API密钥是否有效
      const isValid = await validateApiKey(key);

      if (isValid) {
        saveApiKeyToStorage(key);
        setApiKey(key);
        setIsConfigured(true);
        return true;
      } else {
        setError('API密钥无效，请检查后重试');
        return false;
      }
    } catch (err) {
      setError(err.message || '验证API密钥时出错');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  /**
   * 清除API密钥
   * @param {boolean} keepConfigured - 是否保持配置状态（不清除isConfigured标志）
   */
  const clearApiKey = (keepConfigured = false) => {
    if (!keepConfigured) {
      removeApiKey();
      setApiKey('');
      setIsConfigured(false);
    }
    setError(null);
  };

  // 上下文值
  const value = {
    apiKey,
    isConfigured,
    isValidating,
    error,
    saveApiKey,
    clearApiKey,
  };

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
};