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
            type="range"
            min={min ?? 0}
            max={max ?? 100}
            value={value as number}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="range range-primary range-xs w-full"
          />
        )
      
      case 'select':
        return (
          <select
            className="select select-bordered select-sm w-full min-w-0"
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
      <label className="label py-1">
        <span className="label-text text-sm leading-tight truncate">{label}</span>
      </label>
      {type === 'boolean' ? (
        <div className="flex items-center justify-between min-w-0">
          <span className="text-sm opacity-70 truncate mr-2">
            {value ? 'Enabled' : 'Disabled'}
          </span>
          <div className="flex-shrink-0">
            {renderControl()}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {type === 'number' && (
            <div className="flex justify-between text-xs">
              <span>{min ?? 0}</span>
              <span className="font-semibold">{value}</span>
              <span>{max ?? 100}</span>
            </div>
          )}
          {renderControl()}
        </div>
      )}
    </div>
  )
}

export default ConfigOption