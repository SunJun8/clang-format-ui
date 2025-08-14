/// <reference lib="webworker" />

// let wasmModule: any = null;
let isInitialized = false;

interface FormatRequest {
  id: string;
  code: string;
  yamlConfig: string;
  language: 'c' | 'cpp';
}

interface FormatResponse {
  id: string;
  result?: string;
  error?: string;
  duration?: number;
}

// Mock WASM module for now - will be replaced with actual clang-format WASM
class MockClangFormatter {
  async format(code: string, config: string, _language: 'c' | 'cpp'): Promise<string> {
    // Simple mock formatting - just basic indentation
    const lines = code.split('\n');
    let indent = 0;
    const indentSize = config.includes('IndentWidth: 2') ? 2 : 4;
    
    return lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.includes('}')) indent = Math.max(0, indent - 1);
      const result = ' '.repeat(indent * indentSize) + trimmed;
      if (trimmed.includes('{')) indent++;
      return result;
    }).join('\n');
  }
}

let formatter: MockClangFormatter;

async function initialize() {
  if (isInitialized) return;
  
  try {
    // TODO: Load actual clang-format WASM
    formatter = new MockClangFormatter();
    isInitialized = true;
    
    self.postMessage({ 
      type: 'initialized', 
      message: 'Formatter initialized successfully' 
    });
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      error: `Failed to initialize formatter: ${error}` 
    });
  }
}

async function formatCode(request: FormatRequest) {
  const startTime = performance.now();
  
  try {
    if (!isInitialized) {
      await initialize();
    }

    const formatted = await formatter.format(
      request.code, 
      request.yamlConfig, 
      request.language
    );
    
    const duration = performance.now() - startTime;
    
    const response: FormatResponse = {
      id: request.id,
      result: formatted,
      duration: Math.round(duration)
    };
    
    self.postMessage(response);
  } catch (error) {
    const response: FormatResponse = {
      id: request.id,
      error: `Formatting failed: ${error}`
    };
    
    self.postMessage(response);
  }
}

self.onmessage = (event: MessageEvent) => {
  const data = event.data;
  
  switch (data.type) {
    case 'format':
      formatCode(data);
      break;
    case 'init':
      initialize();
      break;
    default:
      self.postMessage({ 
        type: 'error', 
        error: `Unknown message type: ${data.type}` 
      });
  }
};

export default null;