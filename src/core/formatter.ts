// Implementation of clang-format using WASM
import init, { format } from '@wasm-fmt/clang-format'

export interface ClangFormatConfig {
  // Core settings
  BasedOnStyle: 'LLVM' | 'Google' | 'Chromium' | 'Mozilla' | 'WebKit' | 'Microsoft' | 'GNU'
  IndentWidth: number
  TabWidth: number
  UseTab: boolean
  BreakBeforeBraces: 'Attach' | 'Linux' | 'Mozilla' | 'Stroustrup' | 'Allman' | 'Whitesmiths' | 'GNU' | 'WebKit' | 'Custom'
  AllowShortIfStatementsOnASingleLine: boolean
  AllowShortLoopsOnASingleLine: boolean
  ColumnLimit: number
  
  // Indent settings
  IndentCaseLabels: boolean
  IndentPPDirectives: 'None' | 'AfterHash' | 'BeforeHash'
  
  // Break settings
  AlwaysBreakAfterDefinitionReturnType: boolean
  AlwaysBreakTemplateDeclarations: boolean
  
  // Align settings
  AlignAfterOpenBracket: 'Align' | 'DontAlign' | 'AlwaysBreak'
  AlignConsecutiveAssignments: boolean
  
  // Penalty settings
  PenaltyBreakBeforeFirstCallParameter: number
  PenaltyBreakComment: number
  
  // Other settings
  SpacesBeforeTrailingComments: number
  AllowShortFunctionsOnASingleLine: boolean
}

export const clangFormatConfig: ClangFormatConfig = {
  // Core settings
  BasedOnStyle: 'LLVM',
  IndentWidth: 2,
  TabWidth: 2,
  UseTab: false,
  BreakBeforeBraces: 'Attach',
  AllowShortIfStatementsOnASingleLine: false,
  AllowShortLoopsOnASingleLine: false,
  ColumnLimit: 80,
  
  // Indent settings
  IndentCaseLabels: false,
  IndentPPDirectives: 'None',
  
  // Break settings
  AlwaysBreakAfterDefinitionReturnType: false,
  AlwaysBreakTemplateDeclarations: false,
  
  // Align settings
  AlignAfterOpenBracket: 'Align',
  AlignConsecutiveAssignments: false,
  
  // Penalty settings
  PenaltyBreakBeforeFirstCallParameter: 100,
  PenaltyBreakComment: 50,
  
  // Other settings
  SpacesBeforeTrailingComments: 2,
  AllowShortFunctionsOnASingleLine: false
}

let initialized = false

// Initialize the WASM module
const initialize = async () => {
  if (!initialized) {
    await init()
    initialized = true
  }
}

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

// Formatter function using WASM
export const formatCode = async (code: string, config: ClangFormatConfig): Promise<string> => {
  // Initialize the WASM module if not already done
  await initialize()
  
  try {
    // Convert config to YAML format as required by clang-format
    const configYAML = configToYAML(config)
    
    // Format the code using the WASM module
    const formattedCode = format(code, 'main.cpp', configYAML)
    return formattedCode
  } catch (error) {
    console.error('Formatting error:', error)
    // Fallback to original code if formatting fails
    return code
  }
}

// Convert config to YAML format for export
export const configToYaml = (config: ClangFormatConfig): string => {
  let yaml = ''
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'boolean') {
      yaml += `${key}: ${value ? 'true' : 'false'}
`
    } else if (typeof value === 'number') {
      yaml += `${key}: ${value}
`
    } else {
      yaml += `${key}: ${value}
`
    }
  }
  return yaml.trim()
}