import React from 'react'
import { ClangFormatConfig } from '../../core/formatter'

interface ConfigOptionProps {
  option: {
    key: keyof ClangFormatConfig
    label: string
    type: 'boolean' | 'number' | 'select'
    options?: string[]
    min?: number
    max?: number
  }
  value: any
  onChange: (value: any) => void
}

const ConfigOption: React.FC<ConfigOptionProps> = ({
  option,
  value,
  onChange
}) => {
  const { label, type, options, min, max } = option

  const renderControl = () => {
    switch (type) {
      case 'boolean':
        return (
          <input
            type="checkbox"
            className="toggle toggle-primary"
            checked={value as boolean}
            onChange={(e) => onChange(e.target.checked)}
          />
        )
      
      case 'number':
        return (
          <input
            type="number"
            min={min ?? 0}
            max={max ?? 100}
            value={value as number}
            onChange={(e) => {
              const newValue = parseInt(e.target.value)
              if (!isNaN(newValue)) {
                onChange(newValue)
              }
            }}
            className="input input-bordered input-sm w-20 text-center"
          />
        )
      
      case 'select':
        return (
          <select
            className="select select-bordered select-sm w-32 min-w-0"
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
      
      default:
        return null
    }
  }

  return (
    <div className="form-control">
      <div className="flex items-center justify-between min-w-0">
        <label className="label py-1 cursor-pointer">
          <span className="label-text text-sm leading-tight truncate">{label}</span>
        </label>
        <div className="flex-shrink-0">
          {renderControl()}
        </div>
      </div>
    </div>
  )
}

export default ConfigOption