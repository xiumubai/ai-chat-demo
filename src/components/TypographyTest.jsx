import React from 'react';

const TypographyTest = () => {
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="prose dark:prose-invert max-w-none">
        <h1>Typography Plugin Test</h1>
        <p>This is a test of the Tailwind CSS typography plugin.</p>
        <h2>Features</h2>
        <ul>
          <li>Properly styled headings</li>
          <li>Beautiful typography</li>
          <li>Lists with proper spacing</li>
          <li>Code blocks with syntax highlighting</li>
        </ul>
        <blockquote>
          <p>This is a blockquote that should be styled nicely by the typography plugin.</p>
        </blockquote>
        <pre><code>{`// This is a code block
function test() {
  console.log('Hello, world!');
}`}</code></pre>
      </div>
    </div>
  );
};

export default TypographyTest;