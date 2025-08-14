/// <reference lib="webworker" />

import init, { format } from '@wasm-fmt/clang-format';

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

async function initialize() {
  if (isInitialized) return;
  
  try {
    await init();
    isInitialized = true;
    
    self.postMessage({ 
      type: 'initialized', 
      message: 'Clang-format WASM initialized successfully' 
    });
  } catch (error) {
    self.postMessage({ 
      type: 'error', 
      error: `Failed to initialize clang-format WASM: ${error}` 
    });
  }
}

async function formatCode(request: FormatRequest) {
  const startTime = performance.now();
  
  try {
    if (!isInitialized) {
      await initialize();
    }

    const formatted = format(
      request.code, 
      request.yamlConfig,
      request.language === 'c' ? 'c' : 'cpp'
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