import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import { useAppStore } from '../hooks/useAppStore';
import { debounce } from '../utils/debounce';

interface SourcePaneProps {
  className?: string;
}

const CODE_EXAMPLES = {
  c: `#include <stdio.h>
#include <stdlib.h>

typedef struct {
    int id;
    char name[50];
    float score;
} Student;

void print_student(Student s) {
    printf("ID: %d, Name: %s, Score: %.2f\\n", s.id, s.name, s.score);
}

int main() {
    Student students[3] = {
        {1, "Alice", 95.5f},
        {2, "Bob", 87.0f},
        {3, "Charlie", 92.3f}
    };
    
    for(int i = 0; i < 3; i++) {
        print_student(students[i]);
    }
    
    return 0;
}`,
  cpp: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

class Student {
private:
    int id;
    std::string name;
    double score;
    
public:
    Student(int id, const std::string& name, double score)
        : id(id), name(name), score(score) {}
    
    void print() const {
        std::cout << "ID: " << id << ", Name: " << name 
                  << ", Score: " << score << std::endl;
    }
    
    double getScore() const { return score; }
};

int main() {
    std::vector<Student> students = {
        Student(1, "Alice", 95.5),
        Student(2, "Bob", 87.0),
        Student(3, "Charlie", 92.3)
    };
    
    std::sort(students.begin(), students.end(), 
        [](const Student& a, const Student& b) {
            return a.getScore() > b.getScore();
        });
    
    for (const auto& student : students) {
        student.print();
    }
    
    return 0;
}`
};

export const SourcePane: React.FC<SourcePaneProps> = ({ className = '' }) => {
  const { language, setSourceCode, sourceCode } = useAppStore();
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const debouncedSetSourceCode = debounce((code: string) => {
    setSourceCode(code);
  }, 300);

  useEffect(() => {
    if (editorRef.current && !editorInstanceRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: sourceCode || CODE_EXAMPLES[language],
        language: language === 'c' ? 'c' : 'cpp',
        theme: 'vs-dark',
        automaticLayout: true,
        fontSize: 14,
        lineNumbers: 'on',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: 'on',
        folding: true,
        renderWhitespace: 'selection',
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        parameterHints: { enabled: true },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        formatOnPaste: true,
        formatOnType: true,
      });

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const value = editorInstanceRef.current?.getValue() || '';
        debouncedSetSourceCode(value);
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
    if (editorInstanceRef.current && language) {
      const model = editorInstanceRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language === 'c' ? 'c' : 'cpp');
      }
      
      if (!sourceCode || sourceCode.trim() === '') {
        editorInstanceRef.current.setValue(CODE_EXAMPLES[language]);
      }
    }
  }, [language]);

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 ${className}`}>
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Source Code</h2>
          <div className="flex items-center space-x-2">
            <button
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => {
                if (editorInstanceRef.current) {
                  editorInstanceRef.current.setValue(CODE_EXAMPLES[language]);
                }
              }}
            >
              Reset Example
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              onClick={() => {
                if (editorInstanceRef.current) {
                  editorInstanceRef.current.getAction('editor.action.formatDocument')?.run();
                }
              }}
            >
              Format
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
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