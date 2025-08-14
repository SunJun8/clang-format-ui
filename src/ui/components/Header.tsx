import React, { useEffect, useState } from 'react'

interface HeaderProps {
  onDownload: () => void
  onCopy: () => void
}

const Header: React.FC<HeaderProps> = ({ onDownload, onCopy }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')

  useEffect(() => {
    // 从 localStorage 获取保存的主题，如果没有则默认为 system
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null
    const initialTheme = savedTheme || 'system'
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <header className="bg-base-100 border-b border-base-300 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <span className="text-primary">Clang</span>-Format Visualizer
        </h1>
        <div className="flex space-x-2 items-center">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
              Theme
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-32 p-2 shadow">
              <li>
                <button 
                  className={theme === 'light' ? 'font-bold' : ''}
                  onClick={() => handleThemeChange('light')}
                >
                  Light
                </button>
              </li>
              <li>
                <button 
                  className={theme === 'dark' ? 'font-bold' : ''}
                  onClick={() => handleThemeChange('dark')}
                >
                  Dark
                </button>
              </li>
              <li>
                <button 
                  className={theme === 'system' ? 'font-bold' : ''}
                  onClick={() => handleThemeChange('system')}
                >
                  System
                </button>
              </li>
            </ul>
          </div>
          <button 
            className="btn btn-primary btn-sm"
            onClick={onCopy}
          >
            Copy Config
          </button>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={onDownload}
          >
            Download .clang-format
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header