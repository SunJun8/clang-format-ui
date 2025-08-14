export interface FormatResult {
  formatted: string;
  duration: number;
  error?: string;
}

export interface FormatRequest {
  id: string;
  code: string;
  yamlConfig: string;
  language: 'c' | 'cpp';
}

class Formatter {
  private worker: Worker | null = null;
  private pendingRequests = new Map<string, {
    resolve: (value: FormatResult) => void;
    reject: (error: string) => void;
  }>();

  constructor() {
    this.initializeWorker();
  }

  private initializeWorker() {
    try {
      // Create worker from the worker file
      this.worker = new Worker(new URL('../worker/formatter.worker.ts', import.meta.url), {
        type: 'module',
      });

      this.worker.onmessage = (event: MessageEvent) => {
        const { id, result, error, duration } = event.data;
        
        if (this.pendingRequests.has(id)) {
          const { resolve, reject } = this.pendingRequests.get(id)!;
          this.pendingRequests.delete(id);
          
          if (error) {
            reject(error);
          } else {
            resolve({
              formatted: result,
              duration: duration || 0,
            });
          }
        }
      };

      this.worker.onerror = (error) => {
        console.error('Worker error:', error);
        // Reject all pending requests
        this.pendingRequests.forEach(({ reject }) => {
          reject('Worker error occurred');
        });
        this.pendingRequests.clear();
      };

      // Initialize the worker
      this.worker.postMessage({ type: 'init' });
    } catch (error) {
      console.error('Failed to initialize worker:', error);
    }
  }

  async format(code: string, configYaml: string, language: 'c' | 'cpp' = 'cpp'): Promise<FormatResult> {
    if (!this.worker) {
      return {
        formatted: code,
        duration: 0,
        error: 'Formatter not initialized',
      };
    }

    const id = Math.random().toString(36).substring(2, 15);
    
    return new Promise((resolve, reject) => {
      this.pendingRequests.set(id, { resolve, reject });
      
      const request: FormatRequest = {
        id,
        code,
        yamlConfig: configYaml,
        language,
      };
      
      this.worker!.postMessage({
        type: 'format',
        ...request,
      });
      
      // Set timeout for requests
      setTimeout(() => {
        if (this.pendingRequests.has(id)) {
          this.pendingRequests.delete(id);
          reject('Formatting request timed out');
        }
      }, 10000); // 10 second timeout
    });
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
    this.pendingRequests.clear();
  }
}

export const formatter = new Formatter();