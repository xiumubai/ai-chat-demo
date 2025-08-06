import { useState } from 'react';
import { useApiKey } from '../contexts/useApiKey';

/**
 * API密钥配置组件
 * @returns {JSX.Element} - API密钥配置组件
 */
const ApiKeyConfig = () => {
  const { apiKey: storedApiKey, isValidating, error, saveApiKey } = useApiKey();
  const [apiKey, setApiKey] = useState(storedApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);

  /**
   * 处理保存API密钥
   */
  const handleSave = async () => {
    if (!apiKey.trim()) return;
    await saveApiKey(apiKey.trim());
  };

  /**
   * 切换API密钥显示/隐藏
   */
  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">配置DeepSeek API密钥</h2>
      
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        请输入您的DeepSeek API密钥以开始使用AI聊天助手。
        您的API密钥将只存储在您的浏览器中，不会发送到任何其他服务器。
      </p>
      
      <div className="mt-4">
        <div className="relative">
          <input
            type={showApiKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="输入您的DeepSeek API密钥"
            className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
          <button
            type="button"
            onClick={toggleShowApiKey}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400"
          >
            {showApiKey ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
        
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        
        <button
          onClick={handleSave}
          disabled={!apiKey.trim() || isValidating}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 flex justify-center items-center"
        >
          {isValidating ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              验证中...
            </>
          ) : (
            '保存并开始聊天'
          )}
        </button>
      </div>
    </div>
  );
};

export default ApiKeyConfig;