import React, { useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../hooks/useAppStore';

export const SourcePane: React.FC = () => {
  const { language, sourceCode, setSourceCode, resetSourceCode } = useAppStore();

  const handleEditorChange = useCallback((value: string | undefined) => {
    if (value !== undefined) {
      setSourceCode(value);
    }
  }, [setSourceCode]);

  const handleReset = () => {
    resetSourceCode();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-100/60 backdrop-blur-sm border-b border-base-300/30 px-4 py-3">
        <div className="flex-1 flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
          <span className="text-lg font-semibold text-base-content/90">
            Source Code 
            <span className="text-sm font-normal text-base-content/60">({language.toUpperCase()})</span>
          </span>
        </div>
        <div className="flex-none">
          <button 
            className="btn btn-sm btn-ghost gap-2" 
            onClick={handleReset}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset Example
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden bg-base-100/30 backdrop-blur-sm">
        <Editor
          height="100%"
          language={language === 'c' ? 'c' : 'cpp'}
          value={sourceCode}
          onChange={handleEditorChange}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            tabSize: 4,
            insertSpaces: true,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            smoothScrolling: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
          }}
        />
      </div>
    </div>
  );
};