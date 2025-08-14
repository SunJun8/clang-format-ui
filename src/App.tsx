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
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className={`h-screen w-screen flex flex-col transition-all duration-300 bg-gradient-to-br from-base-100 to-base-200`}>
      <Header 
        theme={theme}
        onThemeChange={setTheme}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden p-4">
        <div className="h-full bg-base-100/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-base-300/30">
          <SplitPane direction="horizontal" className="flex-1">
            <SplitPane direction="vertical" className="flex-1">
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
