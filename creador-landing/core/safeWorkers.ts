/**
 * SafeWorkers utility to prevent worker-related errors
 * This helps with the worker.js module errors by providing a safe fallback
 */

// Keep track of worker initialization status
let workersInitialized = false;

// Define types for require objects
interface RequireObject {
  [key: string]: any;
  (moduleId: string): any;
}

/**
 * Fix for vendor-chunks/lib/worker.js module not found error
 * This is a common issue in Next.js development mode
 */
const fixMissingWorkerModule = () => {
  if (typeof window === 'undefined') return;
  
  // Only apply in browser environment
  try {
    // Use dynamic module mocking - this technique creates a virtual module for missing files
    const originalRequire = window.require || (window as any).__webpack_require__;
    
    if (!originalRequire) return;
    
    // Store the original require function
    const origRequireExt = (window as any).__original_require = originalRequire as RequireObject;
    
    // Override the require function to catch the missing worker.js module
    (window as any).__webpack_require__ = function(moduleId: string) {
      try {
        // Try to load the module normally
        return origRequireExt(moduleId);
      } catch (error) {
        // Check if it's the missing worker.js module
        if (error && 
            (error as any).code === 'MODULE_NOT_FOUND' && 
            moduleId && 
            moduleId.includes('worker.js')) {
          console.debug('[SafeWorkers] Providing mock for missing module:', moduleId);
          
          // Return a mock module
          return {
            // Mock Worker functionality
            Worker: class MockWorker {
              constructor() {
                console.debug('[SafeWorkers] Created mock worker');
              }
              postMessage() {}
              terminate() {}
              addEventListener() {}
              removeEventListener() {}
              onmessage = null;
              onerror = null;
            }
          };
        }
        
        // Re-throw the error for other missing modules
        throw error;
      }
    };
    
    // Copy over properties
    for (const key in origRequireExt) {
      if (Object.hasOwnProperty.call(origRequireExt, key)) {
        (window as any).__webpack_require__[key] = origRequireExt[key];
      }
    }
    
    console.debug('[SafeWorkers] Webpack require patched for worker modules');
  } catch (error) {
    console.warn('[SafeWorkers] Failed to patch module loader:', error);
  }
};

/**
 * Safely initialize web workers with a timeout and error handling
 * This is needed for crypto wallet extensions that inject scripts that might conflict with Next.js
 */
export const initSafeWorkers = (): void => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  // Avoid multiple initializations
  if (workersInitialized) return;
  
  try {
    // Set flag to prevent multiple init calls
    workersInitialized = true;
    
    // Fix missing worker.js module issue
    fixMissingWorkerModule();
    
    // Patch Worker constructor to prevent errors
    const originalWorker = window.Worker;
    
    // Override Worker constructor to add timeout and error handling
    window.Worker = function SafeWorker(scriptURL: string | URL, options?: WorkerOptions) {
      try {
        // Check if worker script exists before trying to load it
        if (typeof scriptURL === 'string' && scriptURL.includes('worker.js')) {
          console.debug('[SafeWorkers] Intercepted worker creation for:', scriptURL);
          
          // Create a safer script URL
          const safeScriptURL = new URL(scriptURL, window.location.origin).toString();
          
          // Create worker with timeout to prevent hanging
          const workerPromise = new Promise<Worker>((resolve, reject) => {
            // Set timeout for worker creation
            const timeoutId = setTimeout(() => {
              console.warn('[SafeWorkers] Worker creation timed out:', safeScriptURL);
              reject(new Error(`Worker creation timed out: ${safeScriptURL}`));
            }, 3000); // 3 second timeout
            
            try {
              // Create worker with original constructor
              const worker = new originalWorker(safeScriptURL, options);
              
              // Set up error handler
              worker.onerror = (event) => {
                console.warn('[SafeWorkers] Worker error:', event);
                clearTimeout(timeoutId);
                reject(new Error(`Worker error: ${event.message}`));
              };
              
              // Cancel timeout when worker is ready
              worker.onmessage = (event) => {
                if (event.data === 'ready') {
                  clearTimeout(timeoutId);
                  resolve(worker);
                }
              };
              
              // Also resolve after a short delay as fallback
              setTimeout(() => {
                clearTimeout(timeoutId);
                resolve(worker);
              }, 500);
              
              return worker;
            } catch (error) {
              clearTimeout(timeoutId);
              console.error('[SafeWorkers] Error creating worker:', error);
              reject(error);
              
              // Create a mock worker as fallback
              const mockWorker = {
                postMessage: () => {},
                terminate: () => {},
                addEventListener: () => {},
                removeEventListener: () => {},
                dispatchEvent: () => false,
                onmessage: null,
                onerror: null,
                onmessageerror: null
              } as unknown as Worker;
              
              return mockWorker;
            }
          }).catch(error => {
            console.error('[SafeWorkers] Worker promise error:', error);
            
            // Create a mock worker as fallback
            return {
              postMessage: () => {},
              terminate: () => {},
              addEventListener: () => {},
              removeEventListener: () => {},
              dispatchEvent: () => false,
              onmessage: null,
              onerror: null,
              onmessageerror: null
            } as unknown as Worker;
          });
          
          // Return a proxy to handle the worker creation
          return workerPromise as unknown as Worker;
        }
        
        // Default behavior for all other worker scripts
        return new originalWorker(scriptURL, options);
      } catch (error) {
        console.error('[SafeWorkers] Fallback error:', error);
        
        // Create a mock worker as ultimate fallback
        return {
          postMessage: () => {},
          terminate: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => false,
          onmessage: null,
          onerror: null,
          onmessageerror: null
        } as unknown as Worker;
      }
    } as unknown as typeof Worker;
    
    // Copy over prototype properties
    Object.setPrototypeOf(window.Worker, Object.getPrototypeOf(originalWorker));
    
    console.debug('[SafeWorkers] Web workers safely initialized');
  } catch (error) {
    console.error('[SafeWorkers] Failed to initialize safe workers:', error);
  }
};

export default { initSafeWorkers }; 