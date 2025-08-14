import React from 'react'
import ConfigOption from './ConfigOption'
import { ClangFormatConfig } from '../../core/formatter'

interface ConfigCategoryProps {
  title: string
  options: Array<{
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }>
  config: ClangFormatConfig
  onUpdate: (newConfig: Partial<ClangFormatConfig>) => void
}

const ConfigCategory: React.FC<ConfigCategoryProps> = ({
  title,
  options,
  config,
  onUpdate
}) => {
  return (
    <div className="card bg-base-100 shadow-lg border border-base-200">
      <div className="card-body p-4">
        <h3 className="card-title text-lg pb-2 border-b border-base-200">{title}</h3>
        <div className="space-y-4 mt-2">
          {options.map((option) => (
            <ConfigOption
              key={option.key.toString()}
              option={option}
              value={config[option.key]}
              onChange={(value) => onUpdate({ [option.key]: value })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConfigCategory