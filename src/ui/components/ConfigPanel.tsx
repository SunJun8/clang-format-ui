import React, { useState } from 'react'
import { useConfigStore } from '../../core/config-store'
import ConfigCategory from './ConfigCategory'
import BraceWrappingConfig from './BraceWrappingConfig'
import { ClangFormatConfig, clangFormatConfig } from '../../core/formatter'

const ConfigPanel: React.FC = () => {
  const { config, updateConfig } = useConfigStore()
  const [expandedCategory, setExpandedCategory] = useState<string>('基础设置')

  // 基础设置
  const basicOptions = [
    { key: 'BasedOnStyle' as keyof ClangFormatConfig, label: '基础风格', englishLabel: 'BasedOnStyle', type: 'select' as const, options: ['LLVM', 'Google', 'Chromium', 'Mozilla', 'WebKit', 'Microsoft', 'GNU'], description: '基于哪种预定义风格' },
    { key: 'AccessModifierOffset' as keyof ClangFormatConfig, label: '访问修饰符偏移', englishLabel: 'AccessModifierOffset', type: 'number' as const, min: -8, max: 8, description: 'public/private等修饰符的缩进偏移' },
    { key: 'ColumnLimit' as keyof ClangFormatConfig, label: '列限制', englishLabel: 'ColumnLimit', type: 'number' as const, min: 0, max: 200, description: '每行最大字符数，0表示无限制' },
    { key: 'DisableFormat' as keyof ClangFormatConfig, label: '禁用格式化', englishLabel: 'DisableFormat', type: 'boolean' as const, description: '完全禁用格式化功能' }
  ]

  // 缩进设置
  const indentOptions = [
    { key: 'IndentWidth' as keyof ClangFormatConfig, label: '缩进宽度', englishLabel: 'IndentWidth', type: 'number' as const, min: 1, max: 8, description: '缩进使用的空格数' },
    { key: 'TabWidth' as keyof ClangFormatConfig, label: '制表符宽度', englishLabel: 'TabWidth', type: 'number' as const, min: 1, max: 8, description: '制表符显示的空格数' },
    { key: 'UseTab' as keyof ClangFormatConfig, label: '使用制表符', englishLabel: 'UseTab', type: 'select' as const, options: ['Never', 'ForIndentation', 'ForContinuationAndIndentation', 'Always'], description: '何时使用制表符' },
    { key: 'IndentCaseLabels' as keyof ClangFormatConfig, label: '缩进case标签', englishLabel: 'IndentCaseLabels', type: 'boolean' as const, description: '是否缩进switch语句中的case标签' },
    { key: 'IndentWrappedFunctionNames' as keyof ClangFormatConfig, label: '缩进换行函数名', englishLabel: 'IndentWrappedFunctionNames', type: 'boolean' as const, description: '返回类型换行时是否缩进函数名' },
    { key: 'ContinuationIndentWidth' as keyof ClangFormatConfig, label: '延续行缩进', englishLabel: 'ContinuationIndentWidth', type: 'number' as const, min: 1, max: 8, description: '延续行的缩进宽度' },
    { key: 'NamespaceIndentation' as keyof ClangFormatConfig, label: '命名空间缩进', englishLabel: 'NamespaceIndentation', type: 'select' as const, options: ['None', 'Inner', 'All'], description: '命名空间的缩进方式' }
  ]

  // 对齐设置
  const alignOptions = [
    { key: 'AlignAfterOpenBracket' as keyof ClangFormatConfig, label: '开括号后对齐', englishLabel: 'AlignAfterOpenBracket', type: 'select' as const, options: ['Align', 'DontAlign', 'AlwaysBreak'], description: '开括号后的对齐方式' },
    { key: 'AlignConsecutiveAssignments' as keyof ClangFormatConfig, label: '连续赋值对齐', englishLabel: 'AlignConsecutiveAssignments', type: 'boolean' as const, description: '是否对齐连续的赋值语句' },
    { key: 'AlignConsecutiveBitFields' as keyof ClangFormatConfig, label: '连续位域对齐', englishLabel: 'AlignConsecutiveBitFields', type: 'select' as const, options: ['None', 'Consecutive', 'AcrossEmptyLines', 'AcrossEmptyLinesAndComments'], description: '位域对齐方式' },
    { key: 'AlignConsecutiveDeclarations' as keyof ClangFormatConfig, label: '连续声明对齐', englishLabel: 'AlignConsecutiveDeclarations', type: 'boolean' as const, description: '是否对齐连续的变量声明' },
    { key: 'AlignConsecutiveMacros' as keyof ClangFormatConfig, label: '连续宏对齐', englishLabel: 'AlignConsecutiveMacros', type: 'select' as const, options: ['None', 'Consecutive', 'AcrossEmptyLines', 'AcrossEmptyLinesAndComments'], description: '宏定义对齐方式' },
    { key: 'AlignEscapedNewlines' as keyof ClangFormatConfig, label: '转义换行对齐', englishLabel: 'AlignEscapedNewlines', type: 'select' as const, options: ['DontAlign', 'Left', 'Right'], description: '反斜杠换行的对齐方式' },
    { key: 'AlignOperands' as keyof ClangFormatConfig, label: '操作数对齐', englishLabel: 'AlignOperands', type: 'boolean' as const, description: '是否对齐二元和三元表达式的操作数' },
    { key: 'AlignTrailingComments' as keyof ClangFormatConfig, label: '尾随注释对齐', englishLabel: 'AlignTrailingComments', type: 'boolean' as const, description: '是否对齐连续的尾随注释' }
  ]

  // 括号和换行设置
  const braceOptions = [
    { key: 'BreakBeforeBraces' as keyof ClangFormatConfig, label: '大括号换行', englishLabel: 'BreakBeforeBraces', type: 'select' as const, options: ['Attach', 'Linux', 'Mozilla', 'Stroustrup', 'Allman', 'Whitesmiths', 'GNU', 'WebKit', 'Custom'], description: '大括号的换行风格' },
    { key: 'BreakBeforeBinaryOperators' as keyof ClangFormatConfig, label: '二元运算符换行', englishLabel: 'BreakBeforeBinaryOperators', type: 'select' as const, options: ['None', 'NonAssignment', 'All'], description: '二元运算符前的换行策略' },
    { key: 'BreakBeforeTernaryOperators' as keyof ClangFormatConfig, label: '三元运算符换行', englishLabel: 'BreakBeforeTernaryOperators', type: 'boolean' as const, description: '是否在三元运算符前换行' },
    { key: 'BreakConstructorInitializersBeforeComma' as keyof ClangFormatConfig, label: '构造函数初始化逗号前换行', englishLabel: 'BreakConstructorInitializersBeforeComma', type: 'boolean' as const, description: '构造函数初始化列表是否在逗号前换行' },
    { key: 'AlwaysBreakAfterDefinitionReturnType' as keyof ClangFormatConfig, label: '定义返回类型后换行', englishLabel: 'AlwaysBreakAfterDefinitionReturnType', type: 'select' as const, options: ['None', 'All', 'TopLevel', 'AllDefinitions', 'TopLevelDefinitions'], description: '函数定义返回类型后的换行策略' },
    { key: 'AlwaysBreakAfterReturnType' as keyof ClangFormatConfig, label: '返回类型后换行', englishLabel: 'AlwaysBreakAfterReturnType', type: 'select' as const, options: ['None', 'All', 'TopLevel', 'AllDefinitions', 'TopLevelDefinitions'], description: '函数返回类型后的换行策略' },
    { key: 'AlwaysBreakBeforeMultilineStrings' as keyof ClangFormatConfig, label: '多行字符串前换行', englishLabel: 'AlwaysBreakBeforeMultilineStrings', type: 'boolean' as const, description: '是否在多行字符串字面量前换行' },
    { key: 'AlwaysBreakTemplateDeclarations' as keyof ClangFormatConfig, label: '模板声明换行', englishLabel: 'AlwaysBreakTemplateDeclarations', type: 'select' as const, options: ['No', 'Yes', 'MultiLine'], description: '模板声明的换行策略' }
  ]

  // 参数包装设置
  const packingOptions = [
    { key: 'BinPackArguments' as keyof ClangFormatConfig, label: '参数打包', englishLabel: 'BinPackArguments', type: 'boolean' as const, description: '是否将函数参数打包到一行' },
    { key: 'BinPackParameters' as keyof ClangFormatConfig, label: '形参打包', englishLabel: 'BinPackParameters', type: 'boolean' as const, description: '是否将函数形参打包到一行' },
    { key: 'AllowAllArgumentsOnNextLine' as keyof ClangFormatConfig, label: '允许参数全在下一行', englishLabel: 'AllowAllArgumentsOnNextLine', type: 'boolean' as const, description: '允许所有参数放在下一行' },
    { key: 'AllowAllParametersOfDeclarationOnNextLine' as keyof ClangFormatConfig, label: '允许声明参数全在下一行', englishLabel: 'AllowAllParametersOfDeclarationOnNextLine', type: 'boolean' as const, description: '允许函数声明的所有参数放在下一行' }
  ]

  // 短代码块设置
  const shortCodeOptions = [
    { key: 'AllowShortBlocksOnASingleLine' as keyof ClangFormatConfig, label: '短块单行', englishLabel: 'AllowShortBlocksOnASingleLine', type: 'select' as const, options: ['Never', 'Empty', 'InlineOnly', 'All'], description: '允许短代码块放在同一行' },
    { key: 'AllowShortCaseLabelsOnASingleLine' as keyof ClangFormatConfig, label: '短case标签单行', englishLabel: 'AllowShortCaseLabelsOnASingleLine', type: 'boolean' as const, description: '允许短的case标签放在同一行' },
    { key: 'AllowShortFunctionsOnASingleLine' as keyof ClangFormatConfig, label: '短函数单行', englishLabel: 'AllowShortFunctionsOnASingleLine', type: 'select' as const, options: ['None', 'InlineOnly', 'Empty', 'Inline', 'All'], description: '允许短函数放在同一行' },
    { key: 'AllowShortIfStatementsOnASingleLine' as keyof ClangFormatConfig, label: '短if语句单行', englishLabel: 'AllowShortIfStatementsOnASingleLine', type: 'select' as const, options: ['Never', 'WithoutElse', 'OnlyFirstIf', 'AllIfsAndElse'], description: '允许短if语句放在同一行' },
    { key: 'AllowShortLoopsOnASingleLine' as keyof ClangFormatConfig, label: '短循环单行', englishLabel: 'AllowShortLoopsOnASingleLine', type: 'boolean' as const, description: '允许短循环语句放在同一行' }
  ]

  // 空格控制设置
  const spaceOptions = [
    { key: 'SpaceBeforeParens' as keyof ClangFormatConfig, label: '括号前空格', englishLabel: 'SpaceBeforeParens', type: 'select' as const, options: ['Never', 'ControlStatements', 'Always'], description: '开圆括号前是否添加空格' },
    { key: 'SpaceInEmptyParentheses' as keyof ClangFormatConfig, label: '空括号内空格', englishLabel: 'SpaceInEmptyParentheses', type: 'boolean' as const, description: '在空圆括号中添加空格' },
    { key: 'SpacesBeforeTrailingComments' as keyof ClangFormatConfig, label: '尾随注释前空格', englishLabel: 'SpacesBeforeTrailingComments', type: 'number' as const, min: 0, max: 10, description: '尾随注释前的空格数' },
    { key: 'SpacesInAngles' as keyof ClangFormatConfig, label: '尖括号内空格', englishLabel: 'SpacesInAngles', type: 'boolean' as const, description: '在尖括号内添加空格' },
    { key: 'SpacesInContainerLiterals' as keyof ClangFormatConfig, label: '容器字面量空格', englishLabel: 'SpacesInContainerLiterals', type: 'boolean' as const, description: '在容器字面量中添加空格' },
    { key: 'SpacesInCStyleCastParentheses' as keyof ClangFormatConfig, label: 'C风格转换括号空格', englishLabel: 'SpacesInCStyleCastParentheses', type: 'boolean' as const, description: '在C风格类型转换的括号中添加空格' },
    { key: 'SpacesInParentheses' as keyof ClangFormatConfig, label: '圆括号内空格', englishLabel: 'SpacesInParentheses', type: 'boolean' as const, description: '在圆括号内添加空格' },
    { key: 'SpacesInSquareBrackets' as keyof ClangFormatConfig, label: '方括号内空格', englishLabel: 'SpacesInSquareBrackets', type: 'boolean' as const, description: '在方括号内添加空格' },
    { key: 'SpaceAfterCStyleCast' as keyof ClangFormatConfig, label: 'C风格转换后空格', englishLabel: 'SpaceAfterCStyleCast', type: 'boolean' as const, description: '在C风格类型转换后添加空格' },
    { key: 'SpaceBeforeAssignmentOperators' as keyof ClangFormatConfig, label: '赋值运算符前空格', englishLabel: 'SpaceBeforeAssignmentOperators', type: 'boolean' as const, description: '在赋值运算符前添加空格' }
  ]

  // 指针和引用设置
  const pointerOptions = [
    { key: 'PointerAlignment' as keyof ClangFormatConfig, label: '指针对齐', englishLabel: 'PointerAlignment', type: 'select' as const, options: ['Left', 'Right', 'Middle'], description: '指针和引用的对齐方式' },
    { key: 'DerivePointerAlignment' as keyof ClangFormatConfig, label: '推导指针对齐', englishLabel: 'DerivePointerAlignment', type: 'boolean' as const, description: '是否自动推导指针和引用的对齐方式' }
  ]

  // 其他设置
  const otherOptions = [
    { key: 'CompactNamespaces' as keyof ClangFormatConfig, label: '紧凑命名空间', englishLabel: 'CompactNamespaces', type: 'boolean' as const, description: '是否将命名空间声明合并为一行' },
    { key: 'ConstructorInitializerAllOnOneLineOrOnePerLine' as keyof ClangFormatConfig, label: '构造函数初始化单行', englishLabel: 'ConstructorInitializerAllOnOneLineOrOnePerLine', type: 'boolean' as const, description: '构造函数初始化列表要么全在一行，要么每行一个' },
    { key: 'ConstructorInitializerIndentWidth' as keyof ClangFormatConfig, label: '构造函数初始化缩进', englishLabel: 'ConstructorInitializerIndentWidth', type: 'number' as const, min: 1, max: 8, description: '构造函数初始化列表的缩进宽度' },
    { key: 'CommentPragmas' as keyof ClangFormatConfig, label: '注释编译指示', englishLabel: 'CommentPragmas', type: 'text' as const, description: '具有特殊意义的注释的正则表达式' },
    { key: 'Cpp11BracedListStyle' as keyof ClangFormatConfig, label: 'C++11大括号列表风格', englishLabel: 'Cpp11BracedListStyle', type: 'boolean' as const, description: '使用C++11的大括号列表初始化风格' },
    { key: 'ForEachMacros' as keyof ClangFormatConfig, label: 'ForEach宏', englishLabel: 'ForEachMacros', type: 'array' as const, description: '被当作foreach循环的宏列表' },
    { key: 'IncludeBlocks' as keyof ClangFormatConfig, label: '包含块', englishLabel: 'IncludeBlocks', type: 'select' as const, options: ['Preserve', 'Sort', 'Merge'], description: '#include块的处理方式' },
    { key: 'IndentPPDirectives' as keyof ClangFormatConfig, label: '预处理指令缩进', englishLabel: 'IndentPPDirectives', type: 'select' as const, options: ['None', 'AfterHash', 'BeforeHash'], description: '预处理指令的缩进方式' },
    { key: 'KeepEmptyLinesAtTheStartOfBlocks' as keyof ClangFormatConfig, label: '块开始空行', englishLabel: 'KeepEmptyLinesAtTheStartOfBlocks', type: 'boolean' as const, description: '保留块开始处的空行' },
    { key: 'MacroBlockBegin' as keyof ClangFormatConfig, label: '宏块开始', englishLabel: 'MacroBlockBegin', type: 'text' as const, description: '标识块开始的宏的正则表达式' },
    { key: 'MacroBlockEnd' as keyof ClangFormatConfig, label: '宏块结束', englishLabel: 'MacroBlockEnd', type: 'text' as const, description: '标识块结束的宏的正则表达式' },
    { key: 'MaxEmptyLinesToKeep' as keyof ClangFormatConfig, label: '最大空行数', englishLabel: 'MaxEmptyLinesToKeep', type: 'number' as const, min: 0, max: 10, description: '连续空行的最大数量' },
    { key: 'ObjCBlockIndentWidth' as keyof ClangFormatConfig, label: 'ObjC块缩进', englishLabel: 'ObjCBlockIndentWidth', type: 'number' as const, min: 1, max: 8, description: 'Objective-C块的缩进宽度' },
    { key: 'ObjCSpaceAfterProperty' as keyof ClangFormatConfig, label: 'ObjC属性后空格', englishLabel: 'ObjCSpaceAfterProperty', type: 'boolean' as const, description: '@property后是否添加空格' },
    { key: 'ObjCSpaceBeforeProtocolList' as keyof ClangFormatConfig, label: 'ObjC协议列表前空格', englishLabel: 'ObjCSpaceBeforeProtocolList', type: 'boolean' as const, description: '协议列表前是否添加空格' },
    { key: 'ReflowComments' as keyof ClangFormatConfig, label: '重排注释', englishLabel: 'ReflowComments', type: 'boolean' as const, description: '是否重新排版注释' },
    { key: 'SortIncludes' as keyof ClangFormatConfig, label: '排序包含', englishLabel: 'SortIncludes', type: 'boolean' as const, description: '是否排序#include指令' }
  ]

  // 惩罚设置
  const penaltyOptions = [
    { key: 'PenaltyBreakBeforeFirstCallParameter' as keyof ClangFormatConfig, label: '首调用参数前换行惩罚', englishLabel: 'PenaltyBreakBeforeFirstCallParameter', type: 'number' as const, min: 0, max: 1000, description: '在第一个调用参数前换行的惩罚值' },
    { key: 'PenaltyBreakComment' as keyof ClangFormatConfig, label: '注释换行惩罚', englishLabel: 'PenaltyBreakComment', type: 'number' as const, min: 0, max: 1000, description: '在注释中换行的惩罚值' },
    { key: 'PenaltyBreakFirstLessLess' as keyof ClangFormatConfig, label: '首个<<前换行惩罚', englishLabel: 'PenaltyBreakFirstLessLess', type: 'number' as const, min: 0, max: 1000, description: '在第一个<<前换行的惩罚值' },
    { key: 'PenaltyBreakString' as keyof ClangFormatConfig, label: '字符串换行惩罚', englishLabel: 'PenaltyBreakString', type: 'number' as const, min: 0, max: 1000, description: '在字符串字面量中换行的惩罚值' },
    { key: 'PenaltyExcessCharacter' as keyof ClangFormatConfig, label: '超出字符惩罚', englishLabel: 'PenaltyExcessCharacter', type: 'number' as const, min: 0, max: 1000, description: '每超出列限制一个字符的惩罚值' },
    { key: 'PenaltyReturnTypeOnItsOwnLine' as keyof ClangFormatConfig, label: '返回类型独占一行惩罚', englishLabel: 'PenaltyReturnTypeOnItsOwnLine', type: 'number' as const, min: 0, max: 1000, description: '返回类型独占一行的惩罚值' }
  ]

  // 语言设置
  const languageOptions = [
    { key: 'Language' as keyof ClangFormatConfig, label: '语言', englishLabel: 'Language', type: 'select' as const, options: ['C', 'Cpp', 'ObjC', 'ObjCpp', 'Java', 'JavaScript', 'Proto', 'TableGen', 'TextProto'], description: '代码语言' },
    { key: 'Standard' as keyof ClangFormatConfig, label: '标准', englishLabel: 'Standard', type: 'select' as const, options: ['Cpp03', 'Cpp11', 'Cpp14', 'Cpp17', 'Cpp20', 'Cpp23', 'C89', 'C99', 'C11', 'C17', 'C23'], description: '语言标准' }
  ]

  const categories = [
    { id: '基础设置', title: '基础设置', options: basicOptions },
    { id: '缩进设置', title: '缩进设置', options: indentOptions },
    { id: '对齐设置', title: '对齐设置', options: alignOptions },
    { id: '括号换行', title: '括号和换行', options: braceOptions },
    { id: '大括号包装', title: '大括号包装', options: [] },
    { id: '参数包装', title: '参数包装', options: packingOptions },
    { id: '短代码块', title: '短代码块', options: shortCodeOptions },
    { id: '空格控制', title: '空格控制', options: spaceOptions },
    { id: '指针引用', title: '指针和引用', options: pointerOptions },
    { id: '其他设置', title: '其他设置', options: otherOptions },
    { id: '惩罚设置', title: '惩罚设置', options: penaltyOptions },
    { id: '语言设置', title: '语言设置', options: languageOptions }
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? '' : categoryId)
  }

  return (
    <div className="config-panel flex flex-col h-full">
      <div className="bg-base-300 px-6 py-4 border-b border-base-300">
        <h2 className="panel-title">Clang-Format 配置</h2>
        <p className="text-sm text-base-content/70 mt-1">调整代码格式化的各项参数</p>
      </div>
      
      <div className="flex-1 overflow-auto config-scrollbar p-4">
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.id} className="collapse collapse-arrow collapse-custom">
              <input 
                type="checkbox" 
                checked={expandedCategory === category.id}
                onChange={() => toggleCategory(category.id)}
                className="min-h-12"
              />
              <div className="collapse-title">
                {category.title}
                <span className="text-sm text-base-content/70 ml-2">({category.options.length})</span>
              </div>
              <div className="collapse-content">
                <div className="pt-2">
                  {category.id === '大括号包装' ? (
                    <BraceWrappingConfig 
                      braceWrapping={config.BraceWrapping || clangFormatConfig.BraceWrapping}
                      onChange={(value) => updateConfig({ ...config, BraceWrapping: value })}
                    />
                  ) : (
                    <ConfigCategory 
                      options={category.options} 
                      config={config} 
                      onUpdate={updateConfig} 
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConfigPanel