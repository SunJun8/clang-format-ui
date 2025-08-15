import { useEffect, useRef } from 'react'
import * as monaco from 'monaco-editor'

// This workaround is needed because Monaco uses dynamic imports
// In a production app, you would use the Monaco webpack plugin
self.MonacoEnvironment = {
  getWorkerUrl: function (_moduleId, label) {
    if (label === 'json') {
      return './json.worker.js'
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.js'
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.js'
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js'
    }
    return './editor.worker.js'
  }
}

export const useMonacoEditor = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: monaco.editor.IStandaloneEditorConstructionOptions
) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, options)
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose()
        editorRef.current = null
      }
    }
  }, [containerRef, options])

  return { editorRef: editorRef as React.RefObject<monaco.editor.IStandaloneCodeEditor> }
}