import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import * as monaco from 'monaco-editor'
import { useMonacoEditor } from '../hooks/useMonacoEditor'

export interface EditorPaneRef {
  getEditor: () => monaco.editor.IStandaloneCodeEditor | null
}

interface EditorPaneProps {
  title: string
  language: 'cpp' | 'c'
  value: string
  onChange?: (value: string) => void
  readOnly?: boolean
}

const EditorPane = forwardRef<EditorPaneRef, EditorPaneProps>(({
  title,
  language,
  value,
  onChange,
  readOnly = false
}, ref) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { editorRef: monacoEditorRef } = useMonacoEditor(editorRef as React.RefObject<HTMLDivElement>, {
    value,
    language: language === 'c' ? 'c' : 'cpp',
    readOnly,
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    folding: true,
    renderLineHighlight: 'all',
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto'
    }
  })

  // 暴露editor实例给父组件
  useImperativeHandle(ref, () => ({
    getEditor: () => monacoEditorRef.current
  }))

  // 只在非只读模式下使用onChange
  useEffect(() => {
    if (onChange && !readOnly && monacoEditorRef.current) {
      monacoEditorRef.current.onDidChangeModelContent(() => {
        const newValue = monacoEditorRef.current?.getValue()
        if (newValue !== undefined) {
          onChange(newValue)
        }
      })
    }
  }, [onChange, readOnly])

  useEffect(() => {
    if (monacoEditorRef.current) {
      const currentValue = monacoEditorRef.current.getValue()
      if (currentValue !== value) {
        monacoEditorRef.current.setValue(value)
      }
      
      // Update language if needed
      const model = monacoEditorRef.current.getModel()
      if (model) {
        const targetLanguage = language === 'c' ? 'c' : 'cpp'
        monaco.editor.setModelLanguage(model, targetLanguage)
      }
    }
  }, [value, language])

  return (
    <div className="flex flex-col h-full border border-base-300 rounded-lg overflow-hidden">
      <div className="bg-base-300 px-4 py-2 border-b border-base-300">
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div ref={editorRef} className="flex-1 min-h-[200px]" />
    </div>
  )
})

EditorPane.displayName = 'EditorPane'

export default EditorPane