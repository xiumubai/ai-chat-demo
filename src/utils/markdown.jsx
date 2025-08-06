import { Highlight, themes } from 'prism-react-renderer';

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 */
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      // 可以添加复制成功的提示
      console.log('代码已复制到剪贴板');
    })
    .catch((err) => {
      console.error('复制失败:', err);
    });
};

/**
 * 自定义Markdown渲染组件配置
 * @param {Object} props - 组件属性
 * @returns {Object} - 自定义组件配置
 */
export const getMarkdownComponents = (props = {}) => {
  const { darkMode = false } = props;
  
  return {
    // 代码块渲染
    code({ inline, className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      
      return !inline ? (
        <div className="rounded-md overflow-hidden my-4">
          <div className="bg-gray-800 text-gray-200 px-4 py-2 text-xs font-mono flex justify-between items-center">
            <span>{language}</span>
            <button 
              onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))} 
              className="text-gray-400 hover:text-white"
            >
              复制
            </button>
          </div>
          <Highlight
            code={String(children).replace(/\n$/, '')}
            language={language}
            theme={darkMode ? themes.vsDark : themes.vsLight}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={{ 
                ...style, 
                margin: 0,
                padding: '1rem',
                borderRadius: '0 0 0.375rem 0.375rem',
              }}>
                {tokens.map((line, i) => (
                  <div key={`line-${i}`} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={`token-${i}-${key}`} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },
    
    // 表格渲染
    table(props) {
      return (
        <div className="overflow-x-auto my-4">
          <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700" {...props} />
        </div>
      );
    },
    
    thead(props) {
      return <thead className="bg-gray-100 dark:bg-gray-800" {...props} />;
    },
    
    th(props) {
      return (
        <th
          className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          {...props}
        />
      );
    },
    
    td(props) {
      return <td className="px-4 py-3 text-sm" {...props} />;
    },
    
    // 其他元素渲染
    p(props) {
      return <p className="mb-4" {...props} />;
    },
    
    h1(props) {
      return <h1 className="text-2xl font-bold mt-6 mb-4" {...props} />;
    },
    
    h2(props) {
      return <h2 className="text-xl font-bold mt-6 mb-3" {...props} />;
    },
    
    h3(props) {
      return <h3 className="text-lg font-bold mt-5 mb-2" {...props} />;
    },
    
    ul(props) {
      return <ul className="list-disc pl-5 mb-4" {...props} />;
    },
    
    ol(props) {
      return <ol className="list-decimal pl-5 mb-4" {...props} />;
    },
    
    li(props) {
      return <li className="mb-1" {...props} />;
    },
    
    blockquote(props) {
      return (
        <blockquote
          className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 py-2 mb-4 italic"
          {...props}
        />
      );
    },
    
    a(props) {
      return (
        <a
          className="text-blue-600 dark:text-blue-400 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      );
    },
    
    hr(props) {
      return <hr className="my-6 border-gray-300 dark:border-gray-700" {...props} />;
    },
  };
};