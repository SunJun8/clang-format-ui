// Implementation of clang-format using WASM
import init, { format } from '@wasm-fmt/clang-format'

export interface ClangFormatConfig {
  // 基础设置
  BasedOnStyle: 'LLVM' | 'Google' | 'Chromium' | 'Mozilla' | 'WebKit' | 'Microsoft' | 'GNU'
  AccessModifierOffset: number
  ColumnLimit: number
  DisableFormat: boolean
  
  // 缩进设置
  IndentWidth: number
  TabWidth: number
  UseTab: 'Never' | 'ForIndentation' | 'ForContinuationAndIndentation' | 'Always'
  IndentCaseLabels: boolean
  IndentWrappedFunctionNames: boolean
  ContinuationIndentWidth: number
  NamespaceIndentation: 'None' | 'Inner' | 'All'
  
  // 对齐设置
  AlignAfterOpenBracket: 'Align' | 'DontAlign' | 'AlwaysBreak'
  AlignConsecutiveAssignments: boolean
  AlignConsecutiveBitFields: 'None' | 'Consecutive' | 'AcrossEmptyLines' | 'AcrossEmptyLinesAndComments'
  AlignConsecutiveDeclarations: boolean
  AlignConsecutiveMacros: 'None' | 'Consecutive' | 'AcrossEmptyLines' | 'AcrossEmptyLinesAndComments'
  AlignEscapedNewlines: 'DontAlign' | 'Left' | 'Right'
  AlignOperands: boolean
  AlignTrailingComments: boolean
  
  // 括号和换行设置
  BreakBeforeBraces: 'Attach' | 'Linux' | 'Mozilla' | 'Stroustrup' | 'Allman' | 'Whitesmiths' | 'GNU' | 'WebKit' | 'Custom'
  BreakBeforeBinaryOperators: 'None' | 'NonAssignment' | 'All'
  BreakBeforeTernaryOperators: boolean
  BreakConstructorInitializersBeforeComma: boolean
  AlwaysBreakAfterDefinitionReturnType: 'None' | 'All' | 'TopLevel' | 'AllDefinitions' | 'TopLevelDefinitions'
  AlwaysBreakAfterReturnType: 'None' | 'All' | 'TopLevel' | 'AllDefinitions' | 'TopLevelDefinitions'
  AlwaysBreakBeforeMultilineStrings: boolean
  AlwaysBreakTemplateDeclarations: 'No' | 'Yes' | 'MultiLine'
  
  // 大括号包装配置
  BraceWrapping: {
    AfterClass: boolean
    AfterControlStatement: boolean
    AfterEnum: boolean
    AfterFunction: boolean
    AfterNamespace: boolean
    AfterObjCDeclaration: boolean
    AfterStruct: boolean
    AfterUnion: boolean
    AfterExternBlock: boolean
    BeforeCatch: boolean
    BeforeElse: boolean
    IndentBraces: boolean
    SplitEmptyFunction: boolean
    SplitEmptyRecord: boolean
    SplitEmptyNamespace: boolean
  }
  
  // 参数包装
  BinPackArguments: boolean
  BinPackParameters: boolean
  AllowAllArgumentsOnNextLine: boolean
  AllowAllParametersOfDeclarationOnNextLine: boolean
  
  // 短代码块设置
  AllowShortBlocksOnASingleLine: 'Never' | 'Empty' | 'InlineOnly' | 'All'
  AllowShortCaseLabelsOnASingleLine: boolean
  AllowShortFunctionsOnASingleLine: 'None' | 'InlineOnly' | 'Empty' | 'Inline' | 'All'
  AllowShortIfStatementsOnASingleLine: 'Never' | 'WithoutElse' | 'OnlyFirstIf' | 'AllIfsAndElse'
  AllowShortLoopsOnASingleLine: boolean
  
  // 空格控制
  SpaceBeforeParens: 'Never' | 'ControlStatements' | 'Always'
  SpaceInEmptyParentheses: boolean
  SpacesBeforeTrailingComments: number
  SpacesInAngles: boolean
  SpacesInContainerLiterals: boolean
  SpacesInCStyleCastParentheses: boolean
  SpacesInParentheses: boolean
  SpacesInSquareBrackets: boolean
  SpaceAfterCStyleCast: boolean
  SpaceBeforeAssignmentOperators: boolean
  
  // 指针和引用
  PointerAlignment: 'Left' | 'Right' | 'Middle'
  DerivePointerAlignment: boolean
  
  // 其他设置
  CompactNamespaces: boolean
  ConstructorInitializerAllOnOneLineOrOnePerLine: boolean
  ConstructorInitializerIndentWidth: number
  CommentPragmas: string
  Cpp11BracedListStyle: boolean
  ForEachMacros: string[]
  IncludeBlocks: 'Preserve' | 'Sort' | 'Merge'
  IndentPPDirectives: 'None' | 'AfterHash' | 'BeforeHash'
  KeepEmptyLinesAtTheStartOfBlocks: boolean
  MacroBlockBegin: string
  MacroBlockEnd: string
  MaxEmptyLinesToKeep: number
  ObjCBlockIndentWidth: number
  ObjCSpaceAfterProperty: boolean
  ObjCSpaceBeforeProtocolList: boolean
  ReflowComments: boolean
  SortIncludes: boolean
  
  // 惩罚设置
  PenaltyBreakBeforeFirstCallParameter: number
  PenaltyBreakComment: number
  PenaltyBreakFirstLessLess: number
  PenaltyBreakString: number
  PenaltyExcessCharacter: number
  PenaltyReturnTypeOnItsOwnLine: number
  
  // 语言设置
  Language: 'C' | 'Cpp' | 'ObjC' | 'ObjCpp' | 'Java' | 'JavaScript' | 'Proto' | 'TableGen' | 'TextProto'
  Standard: 'Cpp03' | 'Cpp11' | 'Cpp14' | 'Cpp17' | 'Cpp20' | 'Cpp23' | 'C89' | 'C99' | 'C11' | 'C17' | 'C23'
}

export const clangFormatConfig: ClangFormatConfig = {
  // 基础设置
  BasedOnStyle: 'LLVM',
  AccessModifierOffset: -4,
  ColumnLimit: 0,
  DisableFormat: false,
  
  // 缩进设置
  IndentWidth: 4,
  TabWidth: 4,
  UseTab: 'Never',
  IndentCaseLabels: true,
  IndentWrappedFunctionNames: false,
  ContinuationIndentWidth: 4,
  NamespaceIndentation: 'None',
  
  // 对齐设置
  AlignAfterOpenBracket: 'Align',
  AlignConsecutiveAssignments: false,
  AlignConsecutiveBitFields: 'Consecutive',
  AlignConsecutiveDeclarations: false,
  AlignConsecutiveMacros: 'AcrossEmptyLinesAndComments',
  AlignEscapedNewlines: 'Left',
  AlignOperands: true,
  AlignTrailingComments: true,
  
  // 括号和换行设置
  BreakBeforeBraces: 'Custom',
  BreakBeforeBinaryOperators: 'None',
  BreakBeforeTernaryOperators: false,
  BreakConstructorInitializersBeforeComma: false,
  AlwaysBreakAfterDefinitionReturnType: 'None',
  AlwaysBreakAfterReturnType: 'None',
  AlwaysBreakBeforeMultilineStrings: false,
  AlwaysBreakTemplateDeclarations: 'No',
  
  // 大括号包装配置
  BraceWrapping: {
    AfterClass: false,
    AfterControlStatement: false,
    AfterEnum: false,
    AfterFunction: true,
    AfterNamespace: false,
    AfterObjCDeclaration: false,
    AfterStruct: false,
    AfterUnion: false,
    AfterExternBlock: false,
    BeforeCatch: false,
    BeforeElse: false,
    IndentBraces: false,
    SplitEmptyFunction: true,
    SplitEmptyRecord: true,
    SplitEmptyNamespace: true
  },
  
  // 参数包装
  BinPackArguments: true,
  BinPackParameters: true,
  AllowAllArgumentsOnNextLine: true,
  AllowAllParametersOfDeclarationOnNextLine: true,
  
  // 短代码块设置
  AllowShortBlocksOnASingleLine: 'Empty',
  AllowShortCaseLabelsOnASingleLine: false,
  AllowShortFunctionsOnASingleLine: 'None',
  AllowShortIfStatementsOnASingleLine: 'Never',
  AllowShortLoopsOnASingleLine: false,
  
  // 空格控制
  SpaceBeforeParens: 'ControlStatements',
  SpaceInEmptyParentheses: false,
  SpacesBeforeTrailingComments: 1,
  SpacesInAngles: false,
  SpacesInContainerLiterals: false,
  SpacesInCStyleCastParentheses: false,
  SpacesInParentheses: false,
  SpacesInSquareBrackets: false,
  SpaceAfterCStyleCast: false,
  SpaceBeforeAssignmentOperators: true,
  
  // 指针和引用
  PointerAlignment: 'Right',
  DerivePointerAlignment: false,
  
  // 其他设置
  CompactNamespaces: false,
  ConstructorInitializerAllOnOneLineOrOnePerLine: false,
  ConstructorInitializerIndentWidth: 4,
  CommentPragmas: '^ IWYU pragma:',
  Cpp11BracedListStyle: false,
  ForEachMacros: ['SHELL_EXPORT_CMD'],
  IncludeBlocks: 'Preserve',
  KeepEmptyLinesAtTheStartOfBlocks: false,
  MacroBlockBegin: '',
  MacroBlockEnd: '',
  MaxEmptyLinesToKeep: 1,
  ObjCBlockIndentWidth: 4,
  ObjCSpaceAfterProperty: false,
  ObjCSpaceBeforeProtocolList: true,
  ReflowComments: false,
  SortIncludes: false,
  
  // 惩罚设置
  PenaltyBreakBeforeFirstCallParameter: 30,
  PenaltyBreakComment: 10,
  PenaltyBreakFirstLessLess: 0,
  PenaltyBreakString: 10,
  PenaltyExcessCharacter: 100,
  PenaltyReturnTypeOnItsOwnLine: 60,
  
  // 语言设置
  Language: 'Cpp',
  Standard: 'Cpp03',
  
  // 缺少的属性
  IndentPPDirectives: 'None'
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