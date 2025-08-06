/**
 * 本地存储工具函数
 */

// API密钥存储键名
const API_KEY_STORAGE_KEY = 'deepseek_api_key';

// 会话存储键名
const SESSIONS_STORAGE_KEY = 'chat_sessions';

// 当前会话ID存储键名
const CURRENT_SESSION_ID_KEY = 'current_session_id';

/**
 * 保存API密钥到本地存储
 * @param {string} apiKey - 要保存的API密钥
 */
export const saveApiKey = (apiKey) => {
  localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
};

/**
 * 从本地存储获取API密钥
 * @returns {string|null} - 存储的API密钥，如果不存在则返回null
 */
export const getApiKey = () => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

/**
 * 从本地存储删除API密钥
 */
export const removeApiKey = () => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

/**
 * 创建新会话
 * @param {string} title - 会话标题
 * @returns {Object} - 新创建的会话对象
 */
export const createSession = (title = '新会话') => {
  const sessions = getSessions();
  
  const newSession = {
    id: Date.now().toString(),
    title,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  // 添加新会话到会话列表
  sessions.push(newSession);
  saveSessions(sessions);
  
  // 设置为当前会话
  setCurrentSessionId(newSession.id);
  
  return newSession;
};

/**
 * 获取所有会话
 * @returns {Array} - 会话列表
 */
export const getSessions = () => {
  const sessionsJson = localStorage.getItem(SESSIONS_STORAGE_KEY);
  return sessionsJson ? JSON.parse(sessionsJson) : [];
};

/**
 * 保存会话列表
 * @param {Array} sessions - 要保存的会话列表
 */
export const saveSessions = (sessions) => {
  localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions));
};

/**
 * 获取当前会话ID
 * @returns {string|null} - 当前会话ID，如果不存在则返回null
 */
export const getCurrentSessionId = () => {
  return localStorage.getItem(CURRENT_SESSION_ID_KEY);
};

/**
 * 设置当前会话ID
 * @param {string} sessionId - 要设置的会话ID
 */
export const setCurrentSessionId = (sessionId) => {
  localStorage.setItem(CURRENT_SESSION_ID_KEY, sessionId);
};

/**
 * 获取当前会话
 * @returns {Object|null} - 当前会话对象，如果不存在则返回null
 */
export const getCurrentSession = () => {
  const currentSessionId = getCurrentSessionId();
  if (!currentSessionId) return null;
  
  const sessions = getSessions();
  return sessions.find(session => session.id === currentSessionId) || null;
};

/**
 * 更新会话
 * @param {string} sessionId - 要更新的会话ID
 * @param {Object} updates - 要更新的字段
 * @returns {Object|null} - 更新后的会话对象，如果会话不存在则返回null
 */
export const updateSession = (sessionId, updates) => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex === -1) return null;
  
  // 更新会话
  const updatedSession = {
    ...sessions[sessionIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  sessions[sessionIndex] = updatedSession;
  saveSessions(sessions);
  
  return updatedSession;
};

/**
 * 删除会话
 * @param {string} sessionId - 要删除的会话ID
 * @returns {boolean} - 是否成功删除
 */
export const deleteSession = (sessionId) => {
  const sessions = getSessions();
  const filteredSessions = sessions.filter(session => session.id !== sessionId);
  
  if (filteredSessions.length === sessions.length) return false;
  
  saveSessions(filteredSessions);
  
  // 如果删除的是当前会话，则设置新的当前会话
  if (getCurrentSessionId() === sessionId) {
    if (filteredSessions.length > 0) {
      setCurrentSessionId(filteredSessions[0].id);
    } else {
      localStorage.removeItem(CURRENT_SESSION_ID_KEY);
    }
  }
  
  return true;
};

/**
 * 添加消息到会话
 * @param {string} sessionId - 会话ID
 * @param {Object} message - 要添加的消息
 * @returns {Object|null} - 更新后的会话对象，如果会话不存在则返回null
 */
export const addMessageToSession = (sessionId, message) => {
  const sessions = getSessions();
  const sessionIndex = sessions.findIndex(session => session.id === sessionId);
  
  if (sessionIndex === -1) return null;
  
  // 添加消息到会话
  const updatedSession = {
    ...sessions[sessionIndex],
    messages: [...sessions[sessionIndex].messages, message],
    updatedAt: new Date().toISOString()
  };
  
  sessions[sessionIndex] = updatedSession;
  saveSessions(sessions);
  
  return updatedSession;
};

/**
 * 初始化本地存储
 * 如果没有会话，创建一个默认会话
 */
export const initializeStorage = () => {
  const sessions = getSessions();
  
  if (sessions.length === 0) {
    // 创建默认会话
    createSession('默认会话');
  } else if (!getCurrentSessionId()) {
    // 如果有会话但没有设置当前会话，则设置第一个会话为当前会话
    setCurrentSessionId(sessions[0].id);
  }
};