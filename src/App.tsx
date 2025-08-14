import { useState, useEffect } from 'react';
import { Header } from './ui/components/Header';
import { SplitPane } from './ui/components/SplitPane';
import { SourcePane } from './ui/components/SourcePane';
import { ConfigPane } from './ui/components/ConfigPane';
import { PreviewPane } from './ui/components/PreviewPane';
import { useAppStore } from './ui/hooks/useAppStore';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'midnight'>('dark');
  useAppStore();

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.backgroundColor = '#ffffff';
    } else if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#111827';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.style.backgroundColor = '#0f172a';
    }
  }, [theme]);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header 
        theme={theme}
        onThemeChange={setTheme}
      />
      
      <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <SplitPane direction="horizontal" className="h-full">
            <SplitPane direction="vertical" className="h-full">
              <SourcePane />
              <PreviewPane />
            </SplitPane>
            <ConfigPane />
          </SplitPane>
        </div>
      </div>
    </div>
  );
}

export default App;
