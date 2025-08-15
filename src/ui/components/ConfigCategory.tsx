import React from 'react'
import ConfigOption from './ConfigOption'
import { ClangFormatConfig } from '../../core/formatter'

interface ConfigCategoryProps {
  options: Array<{
    key: keyof ClangFormatConfig
    label: string
    englishLabel?: string
    type: 'boolean' | 'number' | 'select' | 'text' | 'array'
    options?: string[]
    min?: number
    max?: number
    description?: string
  }>
  config: ClangFormatConfig
  onUpdate: (newConfig: Partial<ClangFormatConfig>) => void
}

const ConfigCategory: React.FC<ConfigCategoryProps> = ({
  options,
  config,
  onUpdate
}) => {
  return (
    <div className="config-grid">
      {options.map((option) => (
        <ConfigOption
          key={option.key.toString()}
          option={option}
          value={config[option.key]}
          onChange={(value) => onUpdate({ [option.key]: value })}
        />
      ))}
    </div>
  )
}

export default ConfigCategory