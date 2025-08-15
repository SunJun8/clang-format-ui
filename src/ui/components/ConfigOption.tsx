import React from 'react'
import { ClangFormatConfig } from '../../core/formatter'

interface ConfigOptionProps {
  option: {
    key: keyof ClangFormatConfig
    label: string
    englishLabel?: string
    type: 'boolean' | 'number' | 'select' | 'text' | 'array'
    options?: string[]
    min?: number
    max?: number
    description?: string
  }
  value: any
  onChange: (value: any) => void
}

const ConfigOption: React.FC<ConfigOptionProps> = ({
  option,
  value,
  onChange
}) => {
  const { label, englishLabel, type, options, min, max, description } = option

  const renderControl = () => {
    switch (type) {
      case 'boolean':
        return (
          <input
            type="checkbox"
            className="toggle toggle-primary config-toggle"
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            min={min ?? -999}
            max={max ?? 9999}
            value={value as number}
            onChange={(e) => {
              const newValue = parseInt(e.target.value)
              if (!isNaN(newValue)) {
                onChange(newValue)
              }
            }}
            className="input input-bordered input-sm config-number config-control"
          />
        )
      
      case 'select':
        return (
          <select
            className="select select-bordered select-sm config-select config-control"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          >
            {options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )
      
      case 'text':
        return (
          <input
            type="text"
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            className="input input-bordered input-sm config-text config-control"
            placeholder="输入文本..."
          />
        )
      
      case 'array':
        return (
          <input
            type="text"
            value={Array.isArray(value) ? value.join(', ') : (value as string)}
            onChange={(e) => {
              const arrayValue = e.target.value.split(',').map(item => item.trim()).filter(item => item)
              onChange(arrayValue)
            }}
            className="input input-bordered input-sm config-text config-control"
            placeholder="用逗号分隔..."
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className="config-option">
      <div className="flex items-start justify-between min-w-0 gap-3">
        <div className="flex-1 min-w-0">
          <label className="config-label cursor-pointer">{label}</label>
          {englishLabel && (
            <p className="text-xs text-base-content/50 font-mono">{englishLabel}</p>
          )}
          {description && (
            <p className="config-description">{description}</p>
          )}
        </div>
        <div className="flex-shrink-0 mt-1">
          {renderControl()}
        </div>
      </div>
    </div>
  )
}

export default ConfigOption