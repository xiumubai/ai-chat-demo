import axios from 'axios';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

/**
 * 创建一个配置了API密钥的axios实例
 * @param {string} apiKey - DeepSeek API密钥
 * @returns {import('axios').AxiosInstance} - 配置好的axios实例
 */
const createApiClient = (apiKey) => {
  return axios.create({
    baseURL: DEEPSEEK_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }
  });
};

/**
 * 验证API密钥是否有效
 * @param {string} apiKey - 要验证的API密钥
 * @returns {Promise<boolean>} - 密钥是否有效
 */
export const validateApiKey = async (apiKey) => {
  try {
    const client = createApiClient(apiKey);
    // 发送一个简单的请求来验证API密钥
    await client.post('', {
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: 'Hello' }],
      max_tokens: 5
    });
    return true;
  } catch (error) {
    console.error('API密钥验证失败:', error);
    return false;
  }
};

/**
 * 发送消息到DeepSeek API
 * @param {string} apiKey - DeepSeek API密钥
 * @param {Array} messages - 消息历史数组
 * @param {Function} onChunk - 处理流式响应的回调函数
 * @returns {Promise<string>} - 完整的响应文本
 */
export const sendMessage = async (apiKey, messages, onChunk = null) => {
  const client = createApiClient(apiKey);
  
  try {
    // 如果提供了onChunk回调，使用流式响应
    if (onChunk) {
      let fullText = '';
      let lastProcessedText = '';
      
      await client.post('', {
        model: 'deepseek-chat',
        messages,
        stream: true
      }, {
        responseType: 'text',
        onDownloadProgress: (progressEvent) => {
          // 获取当前接收到的所有文本
          const responseText = progressEvent.event.target.responseText || '';
          
          // 只处理新增的部分
          const newText = responseText.substring(lastProcessedText.length);
          lastProcessedText = responseText;
          
          // 按行分割新文本
          const newLines = newText.split('\n').filter(line => line.trim() !== '');
          
          for (const line of newLines) {
            if (line.startsWith('data: ')) {
              const data = line.substring(6);
              if (data === '[DONE]') continue;
              
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices[0]?.delta?.content || '';
                if (content) {
                  fullText += content;
                  onChunk(content, fullText);
                }
              } catch (e) {
                console.error('解析流式响应失败:', e);
              }
            }
          }
        }
      });
      
      // 返回累积的完整文本
      return fullText;
    } else {
      // 非流式响应
      const response = await client.post('', {
        model: 'deepseek-chat',
        messages
      });
      
      return response.data.choices[0].message.content;
    }
  } catch (error) {
    console.error('发送消息失败:', error);
    throw error;
  }
};