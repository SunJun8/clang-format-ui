import React, { useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useAppStore } from '../hooks/useAppStore';
import { formatter } from '../../core/formatter';
import { ConfigStore } from '../../core/config-store';
import { debounce } from '../utils/debounce';

const configStore = new ConfigStore();

export const PreviewPane: React.FC = () => {
  const {
    language,
    sourceCode,
    formattedCode,
    isFormatting,
    formatDuration,
    diffCount,
    setFormattedCode,
    setFormatting,
    setDiffCount,
  } = useAppStore();

  const calculateDiffCount = (original: string, formatted: string): number => {
    const originalLines = original.split('\n');
    const formattedLines = formatted.split('\n');
    
    let diffCount = 0;
    const maxLines = Math.max(originalLines.length, formattedLines.length);
    
    for (let i = 0; i < maxLines; i++) {
      if (originalLines[i] !== formattedLines[i]) {
        diffCount++;
      }
    }
    
    return diffCount;
  };

  const formatCode = async () => {
    if (!sourceCode.trim()) {
      setFormattedCode('', 0);
      setDiffCount(0);
      return;
    }

    setFormatting(true);
    
    try {
      const yamlConfig = configStore.toYaml();
      const result = await formatter.format(sourceCode, yamlConfig, language);
      
      if (result.error) {
        console.error('Formatting error:', result.error);
        setFormattedCode(sourceCode, 0);
        setDiffCount(0);
      } else {
        setFormattedCode(result.formatted, result.duration);
        setDiffCount(calculateDiffCount(sourceCode, result.formatted));
      }
    } catch (error) {
      console.error('Failed to format code:', error);
      setFormattedCode(sourceCode, 0);
      setDiffCount(0);
    } finally {
      setFormatting(false);
    }
  };

  const debouncedFormat = debounce(formatCode, 300);

  useEffect(() => {
    debouncedFormat();
  }, [sourceCode, language]);

  // Listen for config changes
  useEffect(() => {
    const unsubscribe = configStore.subscribe(() => {
      debouncedFormat();
    });
    
    return () => unsubscribe();
  }, [debouncedFormat]);

  return (
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-100/60 backdrop-blur-sm border-b border-base-300/30 px-4 py-3">
        <div className="flex-1 flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-secondary to-accent rounded-full"></div>
          <span className="text-lg font-semibold text-base-content/90">
            Formatted Preview
          </span>
          {isFormatting && (
            <span className="ml-2 text-sm text-info flex items-center gap-1 animate-pulse">
              <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Formatting...
            </span>
          )}
        </div>
        <div className="flex-none flex gap-3 items-center">
          {formatDuration > 0 && (
            <span className="text-sm text-base-content/70 bg-base-200/50 px-2 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 inline mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {formatDuration}ms
            </span>
          )}
          {diffCount > 0 && (
            <span className="text-sm text-warning bg-warning/10 px-2 py-1 rounded-md">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 inline mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.097m0 5.714v5.714c0 .597.237 1.17.659 1.591L15 21.75m-9.75-18.75c-.251.037-.502.068-.75.097m11.25-4.125c.251.037.502.068.75.097m0 5.714v5.714c0 .597-.237 1.17-.659 1.591L9 21.75M15 3.104c.251.037.502.068.75.097m0 5.714v5.714c0 .597.237 1.17.659 1.591L21 14.5" />
              </svg>
              {diffCount} lines
            </span>
          )}
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden bg-base-100/30 backdrop-blur-sm">
        <Editor
          height="100%"
          language={language === 'c' ? 'c' : 'cpp'}
          value={formattedCode}
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
            readOnly: true,
            domReadOnly: true,
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