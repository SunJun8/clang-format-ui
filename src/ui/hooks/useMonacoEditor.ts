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

// 全局存储所有已注册的主题
const registeredThemes = new Set<string>()

// 主题映射表 - 将主题名称映射到 monaco-themes 中的实际文件名
const THEME_FILE_MAP: Record<string, string> = {
  'GitHub Dark': 'GitHub Dark.json',
  'GitHub Light': 'GitHub Light.json',
  'Monokai': 'Monokai.json',
  'Dracula': 'Dracula.json',
  'Solarized-dark': 'Solarized-dark.json',
  'Solarized-light': 'Solarized-light.json',
  'Active4D': 'Active4D.json',
  'All Hallows Eve': 'All Hallows Eve.json',
  'Amy': 'Amy.json',
  'Birds of Paradise': 'Birds of Paradise.json',
  'Blackboard': 'Blackboard.json',
  'Brilliance Black': 'Brilliance Black.json',
  'Brilliance Dull': 'Brilliance Dull.json',
  'Chrome DevTools': 'Chrome DevTools.json',
  'Clouds': 'Clouds.json',
  'Clouds Midnight': 'Clouds Midnight.json',
  'Cobalt2': 'Cobalt2.json',
  'Cobalt': 'Cobalt.json',
  'Dawn': 'Dawn.json',
  'Dominion Day': 'Dominion Day.json',
  'Dreamweaver': 'Dreamweaver.json',
  'Eiffel': 'Eiffel.json',
  'Espresso Libre': 'Espresso Libre.json',
  'GitHub': 'GitHub.json',
  'idleFingers': 'idleFingers.json',
  'IDLE': 'IDLE.json',
  'iPlastic': 'iPlastic.json',
  'Katzenmilch': 'Katzenmilch.json',
  'krTheme': 'krTheme.json',
  'Kuroir Theme': 'Kuroir Theme.json',
  'LAZY': 'LAZY.json',
  'MagicWB (Amiga)': 'MagicWB (Amiga).json',
  'Merbivore': 'Merbivore.json',
  'Merbivore Soft': 'Merbivore Soft.json',
  'monoindustrial': 'monoindustrial.json',
  'Monokai Bright': 'Monokai Bright.json',
  'Night Owl': 'Night Owl.json',
  'Nord': 'Nord.json',
  'Oceanic Next': 'Oceanic Next.json',
  'Pastels on Dark': 'Pastels on Dark.json',
  'Slush and Poppies': 'Slush and Poppies.json',
  'SpaceCadet': 'SpaceCadet.json',
  'Sunburst': 'Sunburst.json',
  'Textmate (Mac Classic)': 'Textmate (Mac Classic).json',
  'Tomorrow': 'Tomorrow.json',
  'Tomorrow-Night-Blue': 'Tomorrow-Night-Blue.json',
  'Tomorrow-Night-Bright': 'Tomorrow-Night-Bright.json',
  'Tomorrow-Night-Eighties': 'Tomorrow-Night-Eighties.json',
  'Tomorrow-Night': 'Tomorrow-Night.json',
  'Twilight': 'Twilight.json',
  'Upstream Sunburst': 'Upstream Sunburst.json',
  'Vibrant Ink': 'Vibrant Ink.json',
  'Xcode_default': 'Xcode_default.json',
  'Zenburnesque': 'Zenburnesque.json'
}

// 动态加载并注册主题
const loadAndRegisterTheme = async (themeName: string) => {
  // 统一主题名称格式处理
  const normalizedThemeName = themeName.toLowerCase().replace(/ /g, '-')
  
  // 如果主题已经注册过，直接返回
  if (registeredThemes.has(normalizedThemeName)) {
    return normalizedThemeName
  }
  
  try {
    // 使用主题映射表获取文件名
    const fileName = THEME_FILE_MAP[themeName]
    if (!fileName) {
      throw new Error(`Theme ${themeName} not found in theme map`)
    }
    
    // 使用 @vite-ignore 注释来抑制动态导入警告
    const theme = await import(/* @vite-ignore */ `monaco-themes/themes/${fileName}`)
    
    monaco.editor.defineTheme(normalizedThemeName, theme.default as any)
    registeredThemes.add(normalizedThemeName)
    return normalizedThemeName
  } catch (error) {
    console.warn(`Failed to load theme: ${themeName}`, error)
    // 如果加载失败，返回默认主题
    return 'github-dark'
  }
}

// 预加载一些常用主题
const preloadCommonThemes = async () => {
  const commonThemes = ['GitHub Dark', 'GitHub Light', 'Monokai', 'Dracula', 'Solarized-dark', 'Solarized-light']
  try {
    await Promise.all(commonThemes.map(themeName => loadAndRegisterTheme(themeName)))
  } catch (error) {
    console.warn('Failed to preload some themes:', error)
  }
}

// 初始化时预加载常用主题
preloadCommonThemes()

// 全局更新主题的函数
export const updateEditorTheme = async (themeName: string) => {
  const normalizedThemeName = await loadAndRegisterTheme(themeName)
  monaco.editor.setTheme(normalizedThemeName)
}

export const useMonacoEditor = (
  containerRef: React.RefObject<HTMLDivElement>,
  options: monaco.editor.IStandaloneEditorConstructionOptions & { theme?: string }
) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    if (containerRef.current && !editorRef.current) {
      editorRef.current = monaco.editor.create(containerRef.current, options)
      
      // 如果有主题设置，应用主题
      if (options.theme) {
        updateEditorTheme(options.theme)
      }
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose()
        editorRef.current = null
      }
    }
  }, [containerRef, options])

  // 监听主题变化
  useEffect(() => {
    if (editorRef.current && options.theme) {
      updateEditorTheme(options.theme)
    }
  }, [options.theme])

  return { editorRef: editorRef as React.RefObject<monaco.editor.IStandaloneCodeEditor> }
}