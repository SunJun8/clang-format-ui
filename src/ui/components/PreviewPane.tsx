import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { useAppStore } from '../hooks/useAppStore';

interface PreviewPaneProps {
  className?: string;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ className = '' }) => {
  const { formattedCode, isFormatting, formatDuration } = useAppStore();
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current && !editorInstanceRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: formattedCode || '',
        language: 'cpp',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        folding: true,
        renderWhitespace: 'selection',
        readOnly: true,
        renderControlCharacters: false,
        scrollbar: {
          vertical: 'auto',
          horizontal: 'auto'
        },
        cursorBlinking: 'solid',
        mouseWheelZoom: true,
      });
    }

    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
        editorInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.setValue(formattedCode || '');
    }
  }, [formattedCode]);

  const copyToClipboard = async () => {
    if (formattedCode) {
      try {
        await navigator.clipboard.writeText(formattedCode);
      } catch (error) {
        console.error('Failed to copy to clipboard:', error);
      }
    }
  };

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Formatted Output</h2>
            {isFormatting && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Formatting...</span>
              </div>
            )}
            {formatDuration && !isFormatting && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDuration}ms
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={copyToClipboard}
              disabled={!formattedCode}
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </button>
          </div>
        </div>
      </div>

      
      <div className="flex-1 relative">
        {isFormatting && !formattedCode && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Formatting code...</p>
            </div>
          </div>
        )}
        
        <div
          ref={editorRef}
          className="absolute inset-0"
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
          }}
        />
      </div>
    </div>
  );
};