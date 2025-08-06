import { useState } from 'react';
import TranslationAssistant from './TranslationAssistant';

/**
 * 助手容器组件，用于管理和显示所有助手工具
 * @returns {JSX.Element} - 助手容器组件
 */
const AssistantsContainer = () => {
  const [activeAssistant] = useState(null);
  
  // 助手列表
  const assistants = [
    { id: 'translation', name: '翻译助手', component: TranslationAssistant },
    // 未来可以在这里添加更多助手
  ];

  return (
    <div className="assistants-container">
      {/* 助手按钮 */}
      {!activeAssistant && (
        <div className="fixed bottom-24 right-4 md:right-8 flex flex-col space-y-2">
          {assistants.map((assistant) => {
            const AssistantComponent = assistant.component;
            return <AssistantComponent key={assistant.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default AssistantsContainer;