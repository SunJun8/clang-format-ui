import React, { useState, useEffect, useRef } from 'react'
import { useConfigStore } from '../core/config-store'
import { formatCode, configToYaml } from '../core/formatter'
import EditorPane from './components/EditorPane'
import ConfigPanel from './components/ConfigPanel'
import Header from './components/Header'
import { MONACO_THEMES } from '../core/themes'

const App: React.FC = () => {
  const { config } = useConfigStore()
  const [sourceCode, setSourceCode] = useState<string>(
    `#include <iostream>
#include <vector>

int main() {
for (int i = 0; i < 10; i++) {
if (i % 2 == 0) {
std::cout << i << " is even" << std::endl;
} else {
std::cout << i << " is odd" << std::endl;
}
}
return 0;
}`
  )
  const [formattedCode, setFormattedCode] = useState<string>('')
  const [language, setLanguage] = useState<'cpp' | 'c'>('cpp')
  const [editorTheme, setEditorTheme] = useState<string>('GitHub Dark')
  const [leftWidth, setLeftWidth] = useState<number>(66.66) // 默认左侧占2/3宽度
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Format code when source code or config changes
  useEffect(() => {
    const format = async () => {
      try {
        const result = await formatCode(sourceCode, config)
        setFormattedCode(result)
      } catch (error) {
        setFormattedCode(`// Error formatting code: ${error}`)
      }
    }

    // Debounce formatting
    const timer = setTimeout(format, 300)
    return () => clearTimeout(timer)
  }, [sourceCode, config])

  
  const handleDownload = () => {
    const yamlContent = configToYaml(config)
    const blob = new Blob([yamlContent], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = '.clang-format'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyToClipboard = () => {
    const yamlContent = configToYaml(config)
    navigator.clipboard.writeText(yamlContent)
  }

  // 拖动功能实现
  const startDrag = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDrag = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - containerRect.left
    const percentage = Math.min(Math.max((x / containerRect.width) * 100, 25), 75) // 限制在25%-75%之间
    setLeftWidth(percentage)
  }

  const stopDrag = () => {
    setIsDragging(false)
  }

  // 添加事件监听器
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onDrag)
      document.addEventListener('mouseup', stopDrag)
    }
    
    return () => {
      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)
    }
  }, [isDragging])

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <Header 
        onDownload={handleDownload}
        onCopy={handleCopyToClipboard}
      />
      
      <div 
        ref={containerRef}
        className="flex flex-1 overflow-hidden"
        style={{ cursor: isDragging ? 'col-resize' : 'default' }}
      >
        {/* Left side: Source and Formatted Code editors stacked vertically */}
        <div 
          className="flex flex-col h-full p-4"
          style={{ width: `${leftWidth}%` }}
        >
          <div className="flex items-center mb-2">
            <span className="mr-4 font-semibold">Language:</span>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">C++</span>
                <input
                  type="radio"
                  name="language"
                  className="radio radio-primary"
                  checked={language === 'cpp'}
                  onChange={() => setLanguage('cpp')}
                />
              </label>
            </div>
            <div className="form-control ml-4">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">C</span>
                <input
                  type="radio"
                  name="language"
                  className="radio radio-primary"
                  checked={language === 'c'}
                  onChange={() => setLanguage('c')}
                />
              </label>
            </div>
          </div>
          
          <div className="flex items-center mb-4">
            <span className="mr-4 font-semibold">Theme:</span>
            <div className="form-control w-full max-w-xs">
              <select 
                className="select select-bordered select-sm"
                value={editorTheme}
                onChange={(e) => setEditorTheme(e.target.value)}
              >
                {MONACO_THEMES.map(theme => (
                  <option key={theme} value={theme}>{theme}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 mb-4">
              <EditorPane
                title="Source Code"
                language={language}
                value={sourceCode}
                onChange={setSourceCode}
                theme={editorTheme}
              />
            </div>
            
            <div className="flex-1">
              <EditorPane
                title="Formatted Code"
                language={language}
                value={formattedCode}
                readOnly
                theme={editorTheme}
              />
            </div>
          </div>
        </div>
        
        {/* 拖动条 */}
        <div 
          className="w-2 bg-base-300 cursor-col-resize flex items-center justify-center hover:bg-primary transition-colors"
          onMouseDown={startDrag}
        >
          <div className="w-1 h-8 bg-base-content bg-opacity-20 rounded-full"></div>
        </div>
        
        {/* Right side: Configuration panel */}
        <div 
          className="border-l border-base-300"
          style={{ width: `${100 - leftWidth}%` }}
        >
          <ConfigPanel />
        </div>
      </div>
    </div>
  )
}

export default App