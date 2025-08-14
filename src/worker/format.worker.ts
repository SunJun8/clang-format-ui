// Web Worker that handles formatting using WASM
import init, { format } from '@wasm-fmt/clang-format'
import { ClangFormatConfig } from '../core/formatter'

// Convert config to YAML string for clang-format
const configToYAML = (config: ClangFormatConfig): string => {
  let yaml = '{'
  const entries = Object.entries(config)
  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    if (i > 0) yaml += ', '
    
    if (typeof value === 'boolean') {
      yaml += `${key}: ${value ? 'true' : 'false'}`
    } else if (typeof value === 'number') {
      yaml += `${key}: ${value}`
    } else {
      yaml += `${key}: ${value}`
    }
  }
  yaml += '}'
  return yaml
}

self.onmessage = async function(e: MessageEvent<{code: string, config: ClangFormatConfig}>) {
  const { code, config } = e.data
  
  try {
    // Initialize the WASM module
    await init()
    
    // Convert config to YAML format as required by clang-format
    const configYAML = configToYAML(config)
    
    // Format the code using the WASM module
    const formattedCode = format(code, 'main.cpp', configYAML)
    
    self.postMessage({
      formattedCode,
      success: true
    })
  } catch (error: any) {
    console.error('Formatting error:', error)
    
    self.postMessage({
      formattedCode: code, // Return original code on error
      success: false,
      error: error.message
    })
  }
}