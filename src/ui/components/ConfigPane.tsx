import React, { useState, useEffect } from 'react';
import { ConfigStore } from '../../core/config-store';

const configStore = new ConfigStore();

const CONFIG_CATEGORIES = {
  Core: [
    'BasedOnStyle',
    'IndentWidth',
    'UseTab',
    'TabWidth',
    'ColumnLimit',
    'Language',
  ],
  Indent: [
    'IndentCaseLabels',
    'IndentWrappedFunctionNames',
    'IndentPPDirectives',
    'IndentExternBlock',
    'IndentGotoLabels',
  ],
  Break: [
    'BreakBeforeBraces',
    'BreakBeforeBinaryOperators',
    'BreakBeforeTernaryOperators',
    'BreakConstructorInitializers',
    'BreakInheritanceList',
  ],
  Align: [
    'AlignAfterOpenBracket',
    'AlignConsecutiveAssignments',
    'AlignConsecutiveDeclarations',
    'AlignOperands',
    'AlignTrailingComments',
  ],
  Penalty: [
    'PenaltyBreakAssignment',
    'PenaltyBreakBeforeFirstCallParameter',
    'PenaltyBreakComment',
    'PenaltyExcessCharacter',
    'PenaltyReturnTypeOnItsOwnLine',
  ],
  Other: [
    'AllowShortIfStatementsOnASingleLine',
    'AllowShortFunctionsOnASingleLine',
    'AllowShortBlocksOnASingleLine',
    'AllowShortCaseLabelsOnASingleLine',
    'SortIncludes',
    'SortUsingDeclarations',
  ],
};

const ConfigInput: React.FC<{
  name: string;
  value: any;
  onChange: (value: any) => void;
}> = ({ name, value, onChange }) => {
  if (typeof value === 'boolean') {
    return (
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <div className="flex items-center space-x-3">
        <input
          type="range"
          min={0}
          max={name === 'IndentWidth' || name === 'TabWidth' ? 8 : 120}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
        <input
          type="number"
          className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
        />
      </div>
    );
  }

  if (typeof value === 'string') {
    const enumValues = getEnumValues(name);
    if (enumValues) {
      return (
        <select
          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {enumValues.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="text"
        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }

  return null;
};

const getEnumValues = (key: string): string[] | null => {
  const enumMap: Record<string, string[]> = {
    BasedOnStyle: ['LLVM', 'Google', 'Chromium', 'Mozilla', 'WebKit', 'Microsoft', 'GNU'],
    BreakBeforeBraces: ['Attach', 'Linux', 'Mozilla', 'Stroustrup', 'Allman', 'Whitesmiths'],
    AlignAfterOpenBracket: ['Align', 'DontAlign', 'AlwaysBreak'],
    AllowShortFunctionsOnASingleLine: ['None', 'InlineOnly', 'Empty', 'Inline', 'All'],
    AllowShortBlocksOnASingleLine: ['Never', 'Empty', 'Always'],
    BreakBeforeBinaryOperators: ['None', 'NonAssignment', 'All'],
    BreakConstructorInitializers: ['BeforeColon', 'BeforeComma', 'AfterColon'],
    NamespaceIndentation: ['None', 'Inner', 'All'],
    PointerAlignment: ['Left', 'Right', 'Middle'],
    SpaceBeforeParens: ['Never', 'ControlStatements', 'NonEmptyParentheses', 'Always'],
    Standard: ['Cpp03', 'Cpp11', 'Auto', 'Latest'],
    UseTab: ['Never', 'ForIndentation', 'ForContinuationAndIndentation', 'Always'],
  };

  return enumMap[key] || null;
};

const ConfigCategory: React.FC<{
  title: string;
  keys: string[];
  config: any;
  onChange: (key: string, value: any) => void;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ title, keys, config, onChange, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
            <span className="text-lg">{getCategoryIcon(title)}</span>
          </div>
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{keys.length} settings</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-4 space-y-4 bg-white dark:bg-gray-900">
          {keys.map((key) => {
            const value = config[key as keyof typeof config];
            if (value === undefined) return null;

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {key}
                  </label>
                  <button
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
                    onClick={() => {
                      const defaultConfig = configStore.getAll();
                      onChange(key, defaultConfig[key as keyof typeof defaultConfig]);
                    }}
                    title="Reset to default"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
                <ConfigInput
                  name={key}
                  value={value}
                  onChange={(newValue) => onChange(key, newValue)}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    Core: '⚙️',
    Indent: '↔️',
    Break: '🔨',
    Align: '📏',
    Penalty: '⚡',
    Other: '🌟',
  };
  return icons[category] || '📋';
};

export const ConfigPane: React.FC = () => {
  const [config, setConfig] = useState(configStore.getAll());
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({
    Core: true,
    Indent: false,
    Break: false,
    Align: false,
    Penalty: false,
    Other: false,
  });

  useEffect(() => {
    const unsubscribe = configStore.subscribe((newConfig) => {
      setConfig(newConfig);
    });

    return unsubscribe;
  }, []);

  const handleChange = (key: string, value: any) => {
    configStore.set(key as keyof typeof config, value);
  };

  const handleResetAll = () => {
    configStore.reset();
  };

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const diff = configStore.diff();

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Configuration</h2>
            {diff.isModified && (
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {diff.changes.length} modified
              </span>
            )}
          </div>
          <button
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            onClick={handleResetAll}
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(CONFIG_CATEGORIES).map(([category, keys]) => (
          <ConfigCategory
            key={category}
            title={category}
            keys={keys}
            config={config}
            onChange={handleChange}
            isOpen={openCategories[category]}
            onToggle={() => toggleCategory(category)}
          />
        ))}
      </div>
    </div>
  );
};