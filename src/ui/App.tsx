import React, { useState, useEffect, useRef } from 'react'
import { useConfigStore } from '../core/config-store'
import { formatCode, configToYaml } from '../core/formatter'
import EditorPane, { EditorPaneRef } from './components/EditorPane'
import ConfigPanel from './components/ConfigPanel'
import Header from './components/Header'
import { getDefaultExample } from './examples'

const App: React.FC = () => {
  const { config } = useConfigStore()
  const [sourceCode, setSourceCode] = useState<string>('')
  const [formattedCode, setFormattedCode] = useState<string>('')
  const [language, setLanguage] = useState<'cpp' | 'c'>('cpp')
  const [exampleLevel, setExampleLevel] = useState<'basic' | 'advanced'>('basic')
  const [leftWidth, setLeftWidth] = useState<number>(66.66) // 默认左侧占2/3宽度
  const [sourceWidth, setSourceWidth] = useState<number>(50) // Source Code在左侧区域中占50%宽度
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [isDraggingInner, setIsDraggingInner] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const sourceEditorRef = useRef<EditorPaneRef>(null)
  const formattedEditorRef = useRef<EditorPaneRef>(null)
  const isScrollSyncing = useRef<boolean>(false)

  // Initialize source code based on language and example level
  useEffect(() => {
    setSourceCode(getDefaultExample(language, exampleLevel))
  }, [language, exampleLevel])

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

  // 滚动同步逻辑
  useEffect(() => {
    const sourceEditor = sourceEditorRef.current?.getEditor()
    const formattedEditor = formattedEditorRef.current?.getEditor()

    if (!sourceEditor || !formattedEditor) return

    const handleSourceScroll = () => {
      if (isScrollSyncing.current) return
      isScrollSyncing.current = true

      const scrollTop = sourceEditor.getScrollTop()
      const scrollLeft = sourceEditor.getScrollLeft()
      
      formattedEditor.setScrollTop(scrollTop)
      formattedEditor.setScrollLeft(scrollLeft)

      setTimeout(() => {
        isScrollSyncing.current = false
      }, 50)
    }

    const handleFormattedScroll = () => {
      if (isScrollSyncing.current) return
      isScrollSyncing.current = true

      const scrollTop = formattedEditor.getScrollTop()
      const scrollLeft = formattedEditor.getScrollLeft()
      
      sourceEditor.setScrollTop(scrollTop)
      sourceEditor.setScrollLeft(scrollLeft)

      setTimeout(() => {
        isScrollSyncing.current = false
      }, 50)
    }

    sourceEditor.onDidScrollChange(handleSourceScroll)
    formattedEditor.onDidScrollChange(handleFormattedScroll)

    return () => {
      // 清理事件监听器
      // 注意：Monaco Editor的dispose方法会自动清理所有事件监听器
    }
  }, [formattedCode])

  
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

  // 外部拖动条功能（主区域分割）
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

  // 内部拖动条功能（编辑器分割）
  const startInnerDrag = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDraggingInner(true)
  }

  const onInnerDrag = (e: MouseEvent) => {
    if (!isDraggingInner || !containerRef.current) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const leftContainerWidth = containerRect.width * (leftWidth / 100)
    const x = e.clientX - containerRect.left
    const relativeX = x - (containerRect.width * (100 - leftWidth) / 100) // 减去右侧配置面板宽度
    const percentage = Math.min(Math.max((relativeX / leftContainerWidth) * 100, 25), 75) // 限制在25%-75%之间
    setSourceWidth(percentage)
  }

  const stopInnerDrag = () => {
    setIsDraggingInner(false)
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

  useEffect(() => {
    if (isDraggingInner) {
      document.addEventListener('mousemove', onInnerDrag)
      document.addEventListener('mouseup', stopInnerDrag)
    }
    
    return () => {
      document.removeEventListener('mousemove', onInnerDrag)
      document.removeEventListener('mouseup', stopInnerDrag)
    }
  }, [isDraggingInner])

  return (
    <div className="flex flex-col h-screen bg-base-200">
      <Header 
        onDownload={handleDownload}
        onCopy={handleCopyToClipboard}
      />
      
      <div 
        ref={containerRef}
        className="flex flex-1 overflow-hidden"
        style={{ cursor: isDragging || isDraggingInner ? 'col-resize' : 'default' }}
      >
        {/* Left side: Source and Formatted Code editors side by side */}
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
            <span className="mr-4 font-semibold">Example Level:</span>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">Basic</span>
                <input
                  type="radio"
                  name="exampleLevel"
                  className="radio radio-primary"
                  checked={exampleLevel === 'basic'}
                  onChange={() => setExampleLevel('basic')}
                />
              </label>
            </div>
            <div className="form-control ml-4">
              <label className="label cursor-pointer">
                <span className="label-text mr-2">Advanced</span>
                <input
                  type="radio"
                  name="exampleLevel"
                  className="radio radio-primary"
                  checked={exampleLevel === 'advanced'}
                  onChange={() => setExampleLevel('advanced')}
                />
              </label>
            </div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            {/* Source Code Editor */}
            <div 
              className="h-full pr-2"
              style={{ width: `${sourceWidth}%` }}
            >
              <EditorPane
                ref={sourceEditorRef}
                title="Source Code"
                language={language}
                value={sourceCode}
                onChange={setSourceCode}
              />
            </div>
            
            {/* Inner splitter */}
            <div 
              className="w-2 bg-base-300 cursor-col-resize flex items-center justify-center hover:bg-primary transition-colors"
              onMouseDown={startInnerDrag}
            >
              <div className="w-1 h-8 bg-base-content bg-opacity-20 rounded-full"></div>
            </div>
            
            {/* Formatted Code Editor */}
            <div 
              className="h-full pl-2"
              style={{ width: `${100 - sourceWidth}%` }}
            >
              <EditorPane
                ref={formattedEditorRef}
                title="Formatted Code"
                language={language}
                value={formattedCode}
                readOnly
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