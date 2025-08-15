import React from 'react'
import { ClangFormatConfig } from '../../core/formatter'

interface BraceWrappingConfigProps {
  braceWrapping: ClangFormatConfig['BraceWrapping']
  onChange: (value: ClangFormatConfig['BraceWrapping']) => void
}

const BraceWrappingConfig: React.FC<BraceWrappingConfigProps> = ({
  braceWrapping,
  onChange
}) => {
  // 确保 braceWrapping 有默认值，避免 undefined 错误
  const safeBraceWrapping = braceWrapping || {
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
  }
  const options = [
    { key: 'AfterClass', label: 'After Class', description: '类定义后的大括号' },
    { key: 'AfterControlStatement', label: 'After Control Statement', description: '控制语句后的大括号' },
    { key: 'AfterEnum', label: 'After Enum', description: '枚举定义后的大括号' },
    { key: 'AfterFunction', label: 'After Function', description: '函数定义后的大括号' },
    { key: 'AfterNamespace', label: 'After Namespace', description: '命名空间后的大括号' },
    { key: 'AfterObjCDeclaration', label: 'After ObjC Declaration', description: 'Objective-C声明后的大括号' },
    { key: 'AfterStruct', label: 'After Struct', description: '结构体定义后的大括号' },
    { key: 'AfterUnion', label: 'After Union', description: '联合体定义后的大括号' },
    { key: 'AfterExternBlock', label: 'After Extern Block', description: 'extern块后的大括号' },
    { key: 'BeforeCatch', label: 'Before Catch', description: 'catch语句前的大括号' },
    { key: 'BeforeElse', label: 'Before Else', description: 'else语句前的大括号' },
    { key: 'IndentBraces', label: 'Indent Braces', description: '缩进大括号' },
    { key: 'SplitEmptyFunction', label: 'Split Empty Function', description: '空函数的大括号分行' },
    { key: 'SplitEmptyRecord', label: 'Split Empty Record', description: '空记录的大括号分行' },
    { key: 'SplitEmptyNamespace', label: 'Split Empty Namespace', description: '空命名空间的大括号分行' }
  ]

  const handleChange = (key: keyof ClangFormatConfig['BraceWrapping'], value: boolean) => {
    onChange({
      ...safeBraceWrapping,
      [key]: value
    })
  }

  return (
    <div className="brace-config-grid">
      {options.map((option) => (
        <div key={option.key} className="config-option">
          <div className="flex items-start justify-between min-w-0 gap-3">
            <div className="flex-1 min-w-0">
              <label className="config-label cursor-pointer">{option.label}</label>
              <p className="config-description">{option.description}</p>
            </div>
            <div className="flex-shrink-0 mt-1">
              <input
                type="checkbox"
                className="toggle toggle-primary config-toggle"
                checked={safeBraceWrapping[option.key as keyof ClangFormatConfig['BraceWrapping']] as boolean}
                onChange={(e) => handleChange(option.key as keyof ClangFormatConfig['BraceWrapping'], e.target.checked)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BraceWrappingConfig