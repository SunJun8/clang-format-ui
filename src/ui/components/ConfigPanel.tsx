import React from 'react'
import { useConfigStore } from '../../core/config-store'
import ConfigCategory from './ConfigCategory'
import { ClangFormatConfig } from '../../core/formatter'

const ConfigPanel: React.FC = () => {
  const { config, updateConfig } = useConfigStore()

  // Group config options by category
  const coreOptions: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }> = [
    { key: 'BasedOnStyle', label: 'Base Style', type: 'select', options: ['LLVM', 'Google', 'Chromium', 'Mozilla', 'WebKit'] },
    { key: 'IndentWidth', label: 'Indent Width', type: 'number', min: 0, max: 10 },
    { key: 'TabWidth', label: 'Tab Width', type: 'number', min: 0, max: 10 },
    { key: 'UseTab', label: 'Use Tab', type: 'boolean' },
    { key: 'BreakBeforeBraces', label: 'Break Before Braces', type: 'select', options: ['Attach', 'Linux', 'Mozilla', 'Stroustrup', 'Allman', 'Whitesmiths', 'GNU', 'WebKit', 'Custom'] },
    { key: 'AllowShortIfStatementsOnASingleLine', label: 'Allow Short If Statements On Single Line', type: 'boolean' },
    { key: 'AllowShortLoopsOnASingleLine', label: 'Allow Short Loops On Single Line', type: 'boolean' },
    { key: 'ColumnLimit', label: 'Column Limit', type: 'number', min: 0, max: 200 }
  ]

  const indentOptions: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }> = [
    { key: 'IndentCaseLabels', label: 'Indent Case Labels', type: 'boolean' },
    { key: 'IndentPPDirectives', label: 'Indent Preprocessor Directives', type: 'select', options: ['None', 'AfterHash', 'BeforeHash'] }
  ]

  const breakOptions: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }> = [
    { key: 'AlwaysBreakAfterDefinitionReturnType', label: 'Always Break After Definition Return Type', type: 'boolean' },
    { key: 'AlwaysBreakTemplateDeclarations', label: 'Always Break Template Declarations', type: 'boolean' }
  ]

  const alignOptions: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }> = [
    { key: 'AlignAfterOpenBracket', label: 'Align After Open Bracket', type: 'select', options: ['Align', 'DontAlign', 'AlwaysBreak'] },
    { key: 'AlignConsecutiveAssignments', label: 'Align Consecutive Assignments', type: 'boolean' }
  ]

  const penaltyOptions: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }> = [
    { key: 'PenaltyBreakBeforeFirstCallParameter', label: 'Penalty Break Before First Call Parameter', type: 'number', min: 0, max: 1000 },
    { key: 'PenaltyBreakComment', label: 'Penalty Break Comment', type: 'number', min: 0, max: 1000 }
  ]

  const otherOptions: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }> = [
    { key: 'SpacesBeforeTrailingComments', label: 'Spaces Before Trailing Comments', type: 'number', min: 0, max: 10 },
    { key: 'AllowShortFunctionsOnASingleLine', label: 'Allow Short Functions On Single Line', type: 'boolean' }
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="bg-base-300 px-4 py-3 border-b border-base-300">
        <h2 className="font-semibold text-lg">Configuration</h2>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <div className="space-y-6">
          <ConfigCategory 
            title="Core" 
            options={coreOptions} 
            config={config} 
            onUpdate={updateConfig} 
          />
          
          <ConfigCategory 
            title="Indent" 
            options={indentOptions} 
            config={config} 
            onUpdate={updateConfig} 
          />
          
          <ConfigCategory 
            title="Break" 
            options={breakOptions} 
            config={config} 
            onUpdate={updateConfig} 
          />
          
          <ConfigCategory 
            title="Align" 
            options={alignOptions} 
            config={config} 
            onUpdate={updateConfig} 
          />
          
          <ConfigCategory 
            title="Penalty" 
            options={penaltyOptions} 
            config={config} 
            onUpdate={updateConfig} 
          />
          
          <ConfigCategory 
            title="Other" 
            options={otherOptions} 
            config={config} 
            onUpdate={updateConfig} 
          />
        </div>
      </div>
    </div>
  )
}

export default ConfigPanel