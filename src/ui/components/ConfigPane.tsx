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
        <div className="w-11 h-6 bg-base-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-secondary"></div>
      </label>
    );
  }

  if (typeof value === 'number') {
    return (
      <div className="flex items-center gap-3 bg-base-100/50 rounded-lg p-2">
        <input
          type="range"
          className="range range-xs range-primary flex-1"
          min={0}
          max={name === 'IndentWidth' || name === 'TabWidth' ? 8 : 120}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
        <input
          type="number"
          className="input input-sm input-bordered w-16 text-center font-mono"
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
          className="select select-sm select-bordered w-full font-mono"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {enumValues.map((option) => (
            <option key={option} value={option} className="font-mono">
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type="text"
        className="input input-sm input-bordered w-full font-mono"
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

  return (
    <div className={`collapse collapse-arrow bg-base-100/50 backdrop-blur-sm border border-base-300/30 rounded-lg transition-all duration-300 ${isOpen ? 'mb-4' : 'mb-2'}`}>
      <input
        type="checkbox"
        className="peer"
        checked={isOpen}
        onChange={onToggle}
      />
      <div className="collapse-title text-lg font-semibold text-base-content/90 peer-checked:text-primary flex items-center gap-2"
      >
        <span className="text-xl">{getCategoryIcon(title)}</span>
        {title}
        <span className="ml-auto text-sm font-normal text-base-content/60">
          {keys.length} settings
        </span>
      </div>
      
      <div className="collapse-content bg-base-100/30 backdrop-blur-sm rounded-b-lg p-4 space-y-4"
      >
        {keys.map((key) => {
          const value = config[key as keyof typeof config];
          if (value === undefined) return null;

          return (
            <div key={key} className="form-control p-3 bg-base-100/50 rounded-lg hover:bg-base-200/50 transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-2">
                <label className="label cursor-pointer p-0">
                  <span className="label-text font-medium text-base-content/90 text-sm">{key}</span>
                </label>
                <div className="flex items-center gap-2">
                  <ConfigInput
                    name={key}
                    value={value}
                    onChange={(newValue) => onChange(key, newValue)}
                  />
                  <button
                    className="btn btn-ghost btn-xs btn-circle hover:bg-base-300/50 transition-all duration-200"
                    onClick={() => {
                      const defaultConfig = configStore.getAll();
                      onChange(key, defaultConfig[key as keyof typeof defaultConfig]);
                    }}
                    title="Reset to default"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
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
    <div className="h-full flex flex-col">
      <div className="navbar bg-base-100/60 backdrop-blur-sm border-b border-base-300/30 px-4 py-3"
      >
        <div className="flex-1 flex items-center gap-3">
          <div className="w-2 h-6 bg-gradient-to-b from-accent to-primary rounded-full"></div>
          <span className="text-lg font-semibold text-base-content/90">Configuration</span>
          {diff.isModified && (
            <span className="ml-2 text-sm text-info bg-info/10 px-2 py-1 rounded-md flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.037-.502.068-.75.097m0 5.714v5.714c0 .597.237 1.17.659 1.591L15 21.75m-9.75-18.75c-.251.037-.502.068-.75.097m11.25-4.125c.251.037.502.068.75.097m0 5.714v5.714c0 .597.237 1.17.659 1.591L9 21.75M15 3.104c.251.037.502.068.75.097m0 5.714v5.714c0 .597.237 1.17.659 1.591L21 14.5" />
              </svg>
              {diff.changes.length} modified
            </span>
          )}
        </div>
        <div className="flex-none">
          <button 
            className="btn btn-sm btn-ghost gap-2" 
            onClick={handleResetAll}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Reset All
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin"
      >
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