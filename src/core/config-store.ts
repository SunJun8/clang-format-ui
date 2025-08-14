import { parse, stringify } from 'yaml';

export type ClangFormatConfig = Record<string, any>;

export interface ConfigChange {
  key: string;
  oldValue: any;
  newValue: any;
}

export interface DiffResult {
  changes: ConfigChange[];
  isModified: boolean;
}

export class ConfigStore {
  private config: ClangFormatConfig = {};
  private defaultConfig: ClangFormatConfig = {
    BasedOnStyle: 'Google',
    IndentWidth: 4,
    UseTab: 'Never',
    TabWidth: 4,
    ColumnLimit: 80,
    BreakBeforeBraces: 'Attach',
    AllowShortIfStatementsOnASingleLine: false,
    IndentCaseLabels: false,
    NamespaceIndentation: 'None',
    AllowShortFunctionsOnASingleLine: 'Inline',
    AccessModifierOffset: -2,
    AlignAfterOpenBracket: 'Align',
    AlignConsecutiveAssignments: false,
    AlignConsecutiveDeclarations: false,
    AlignEscapedNewlines: 'Left',
    AlignOperands: true,
    AlignTrailingComments: true,
    AllowAllParametersOfDeclarationOnNextLine: true,
    AllowShortBlocksOnASingleLine: 'Empty',
    AllowShortCaseLabelsOnASingleLine: false,
    AllowShortLambdasOnASingleLine: 'Inline',
    AllowShortLoopsOnASingleLine: false,
    AlwaysBreakAfterDefinitionReturnType: 'None',
    AlwaysBreakAfterReturnType: 'None',
    AlwaysBreakBeforeMultilineStrings: false,
    AlwaysBreakTemplateDeclarations: 'Yes',
    BinPackArguments: true,
    BinPackParameters: true,
    BreakBeforeBinaryOperators: 'None',
    BreakBeforeTernaryOperators: true,
    BreakConstructorInitializers: 'BeforeColon',
    BreakInheritanceList: 'BeforeColon',
    BreakStringLiterals: true,
    CompactNamespaces: false,
    ConstructorInitializerAllOnOneLineOrOnePerLine: false,
    ConstructorInitializerIndentWidth: 4,
    ContinuationIndentWidth: 4,
    Cpp11BracedListStyle: true,
    DeriveLineEnding: true,
    DerivePointerAlignment: true,
    DisableFormat: false,
    ExperimentalAutoDetectBinPacking: false,
    FixNamespaceComments: true,
    IncludeBlocks: 'Preserve',
    IndentCaseBlocks: false,
    IndentExternBlock: 'AfterExternBlock',
    IndentGotoLabels: 'true',
    IndentPPDirectives: 'None',
    IndentWrappedFunctionNames: false,
    JavaScriptQuotes: 'Leave',
    JavaScriptWrapImports: true,
    KeepEmptyLinesAtTheStartOfBlocks: false,
    MaxEmptyLinesToKeep: 1,
    ObjCBinPackProtocolList: 'Auto',
    ObjCBlockIndentWidth: 2,
    ObjCBreakBeforeNestedBlockParam: true,
    ObjCSpaceAfterProperty: false,
    ObjCSpaceBeforeProtocolList: true,
    PenaltyBreakAssignment: 2,
    PenaltyBreakBeforeFirstCallParameter: 1,
    PenaltyBreakComment: 300,
    PenaltyBreakFirstLessLess: 120,
    PenaltyBreakOpenParenthesis: 0,
    PenaltyBreakString: 1000,
    PenaltyBreakTemplateDeclaration: 10,
    PenaltyExcessCharacter: 1000000,
    PenaltyReturnTypeOnItsOwnLine: 200,
    PointerAlignment: 'Left',
    ReflowComments: true,
    SortIncludes: true,
    SortUsingDeclarations: true,
    SpaceAfterCStyleCast: false,
    SpaceAfterLogicalNot: false,
    SpaceAfterTemplateKeyword: true,
    SpaceBeforeAssignmentOperators: true,
    SpaceBeforeCpp11BracedList: false,
    SpaceBeforeCtorInitializerColon: true,
    SpaceBeforeInheritanceColon: true,
    SpaceBeforeParens: 'ControlStatements',
    SpaceBeforeRangeBasedForLoopColon: false,
    SpaceInEmptyParentheses: false,
    SpacesBeforeTrailingComments: 2,
    SpacesInAngles: false,
    SpacesInCStyleCastParentheses: false,
    SpacesInContainerLiterals: true,
    SpacesInParentheses: false,
    SpacesInSquareBrackets: false,
    Standard: 'Auto',
    UseCRLF: false,
  };

  private listeners: Array<(config: ClangFormatConfig) => void> = [];

  constructor() {
    this.reset();
  }

  load(yaml: string): boolean {
    try {
      const parsed = parse(yaml) as ClangFormatConfig;
      this.config = { ...this.defaultConfig, ...parsed };
      this.notifyChange();
      return true;
    } catch (error) {
      console.error('Failed to parse YAML config:', error);
      return false;
    }
  }

  set(key: string, value: any) {
    const oldValue = this.config[key];
    
    if (JSON.stringify(oldValue) !== JSON.stringify(value)) {
      this.config[key] = value;
      this.notifyChange();
    }
  }

  get(key: string): any {
    return this.config[key];
  }

  getAll(): ClangFormatConfig {
    return { ...this.config };
  }

  toYaml(): string {
    return stringify(this.config, {
      indent: 2,
      lineWidth: 80,
      sortMapEntries: true,
    });
  }

  reset() {
    this.config = { ...this.defaultConfig };
    this.notifyChange();
  }

  diff(): DiffResult {
    const changes: ConfigChange[] = [];
    
    for (const [key, value] of Object.entries(this.config)) {
      const defaultValue = this.defaultConfig[key];
      if (JSON.stringify(value) !== JSON.stringify(defaultValue)) {
        changes.push({
          key,
          oldValue: defaultValue,
          newValue: value,
        });
      }
    }
    
    return {
      changes,
      isModified: changes.length > 0,
    };
  }

  subscribe(callback: (config: ClangFormatConfig) => void): () => void {
    this.listeners.push(callback);
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyChange() {
    const config = this.getAll();
    this.listeners.forEach(callback => callback(config));
  }
}