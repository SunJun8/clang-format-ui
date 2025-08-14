import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import { ConfigStore } from '../../core/config-store';

interface HeaderProps {
  theme: 'light' | 'dark' | 'midnight';
  onThemeChange: (theme: 'light' | 'dark' | 'midnight') => void;
}

const configStore = new ConfigStore();

export const Header: React.FC<HeaderProps> = ({ theme, onThemeChange }) => {
  const { language, setLanguage } = useAppStore();
  const [version] = useState('18.1.0'); // TODO: Get from VersionMgr

  const handleExport = () => {
    const yaml = configStore.toYaml();
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = '.clang-format';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyToClipboard = async () => {
    const yaml = configStore.toYaml();
    try {
      await navigator.clipboard.writeText(yaml);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getThemeIcon = (currentTheme: string) => {
    switch (currentTheme) {
      case 'light':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
          </svg>
        );
      case 'midnight':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        );
    }
  };

  return (
    <div className="navbar bg-base-100/80 backdrop-blur-xl border-b border-base-300/30 px-6 py-3 shadow-lg">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] bg-clip-text text-transparent">
              ClangFormat UI
            </h1>
            <p className="text-sm text-base-content/60">Modern C/C++ Code Formatter</p>
          </div>
        </div>
      </div>
      
      <div className="flex-none gap-4 items-center">
        
        <div className="flex items-center gap-2 bg-base-200/50 rounded-full px-3 py-1">
          <span className="text-sm font-medium text-base-content/70">Language</span>
          <div className="flex items-center gap-1">
            <label className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-full hover:bg-primary/10 transition-all duration-200">
              <input 
                type="radio" 
                name="language" 
                className="radio radio-primary radio-xs" 
                checked={language === 'c'}
                onChange={() => setLanguage('c')}
              />
              <span className="text-sm font-medium">C</span>
            </label>
            <label className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-full hover:bg-primary/10 transition-all duration-200">
              <input 
                type="radio" 
                name="language" 
                className="radio radio-primary radio-xs" 
                checked={language === 'cpp'}
                onChange={() => setLanguage('cpp')}
              />
              <span className="text-sm font-medium">C++</span>
            </label>
          </div>
        </div>

        
        <select className="select select-sm select-modern w-28 bg-base-100/50" defaultValue={version}>
          <option value="18.1.0">v18.1.0</option>
        </select>

        
        <button 
          className="btn btn-sm btn-ghost gap-2" 
          onClick={handleCopyToClipboard}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0c0 .7-.191 1.375-.553 1.958m-11.056 0c.362-.583.553-1.258.553-1.958v0c0-.212.029-.418.084-.612m11.056 0A2.25 2.25 0 0110.5 2.25h3c.23 0 .457.034.673.1M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Copy YAML
        </button>

        <button 
          className="btn btn-sm bg-gradient-to-r from-[hsl(var(--p))] to-[hsl(var(--s))] hover:from-[hsl(var(--p))/90] hover:to-[hsl(var(--s))/90] text-white border-0 gap-2" 
          onClick={handleExport}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download
        </button>

        
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-sm btn-ghost btn-square">
            {getThemeIcon(theme)}
          </label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100/90 backdrop-blur-xl rounded-box w-36">
            <li>
              <a 
                className={`${theme === 'light' ? 'active' : ''} hover:bg-primary/10 transition-colors`}
                onClick={() => onThemeChange('light')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591" />
                </svg>
                Light
              </a>
            </li>
            <li>
              <a 
                className={`${theme === 'dark' ? 'active' : ''} hover:bg-primary/10 transition-colors`}
                onClick={() => onThemeChange('dark')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                Dark
              </a>
            </li>
            <li>
              <a 
                className={`${theme === 'midnight' ? 'active' : ''} hover:bg-primary/10 transition-colors`}
                onClick={() => onThemeChange('midnight')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
                Midnight
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};