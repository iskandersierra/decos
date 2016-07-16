import { decorateFunction } from './utils';

export interface LoggerFunction {
    (message: any, ...optionalParams: any[]): void;
}

export interface LogOptions {
    asJson?: boolean;
    logEnter?: boolean;
    logError?: boolean;
    logExit?: boolean;
    logParametersOnEnter?: boolean;
    logParametersOnError?: boolean;
    logParametersOnExit?: boolean;
    logResult?: boolean;
    logMoment?: boolean;
    logElapsed?: boolean;
    level?: "debug" | "trace" | "log" | "info" | "warn" | "error" | "off";
    loggerFunction?: LoggerFunction; 
}

const defaultOptions: LogOptions = {
    asJson: false,
    logEnter: true,
    logError: true,
    logExit: true,
    logParametersOnEnter: true,
    logParametersOnError: false,
    logParametersOnExit: false,
    logResult: true,
    logMoment: false,
    logElapsed: false,
    level: "log", 
    loggerFunction: null,
};

function initializeLogOptions(options: LogOptions): void {
    if (!options.loggerFunction) {
        switch (options.level || "log") {
            case "debug":
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    console.debug(message, ...optionalParams);
                break;
        
            case "trace":
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    console.trace(message, ...optionalParams);
                break;
        
            case "info":
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    console.info(message, ...optionalParams);
                break;
        
            case "warn":
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    console.warn(message, ...optionalParams);
                break;
        
            case "error":
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    console.error(message, ...optionalParams);
                break;
        
            case "log":
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    console.log(message, ...optionalParams);
                break;
        
            default: // null, none, unknown, off, ...
                options.loggerFunction = (message: any, ...optionalParams: any[]) => 
                    { /* do nothing */ };
                break;
        }
    }
}

export const Log = decorateFunction(
    defaultOptions,
    initializeLogOptions,
    ({options, key, callback, args}) => {
        let paramStr = '';
        let paramArr: any[] = [];
        if (options.logParametersOnEnter || options.logParametersOnExit) {
            if (options.asJson) {
                paramStr = `(${args.map(a => JSON.stringify(a)).join(', ')})`;
            }
            else {
                paramArr = args;
            }
        }

        if (options.logEnter) {
            const dateStr = options.logMoment ? `[${(new Date()).toLocaleTimeString()}] ` : '';
            const infoStr = `Enter ${key}`;
            const message = `${ dateStr }${ infoStr }${ options.logParametersOnEnter ? paramStr : '' }`;
            options.loggerFunction.call(undefined, message, ...paramArr);
        }

        const start = new Date().getTime();
        let result: any;
        let finish: number;

        try {
            result = callback();
            finish = new Date().getTime();
        }
        catch(error) {
            finish = new Date().getTime();

            if (options.logError) {
                const dateStr = options.logMoment ? `[${(new Date()).toLocaleTimeString()}] ` : '';
                const infoStr = `Error ${key}`;
                const elapsedMs = Math.round((finish - start) * 10) / 10;
                const elapsedStr = options.logElapsed ? ` [elapsed ${ elapsedMs } ms]` : '';
                let errorStr = '';
                let errorArr: any[] = [];
                if (options.logResult) {
                    if (options.asJson) {
                        errorStr = ` = ${ JSON.stringify(error) }`;
                    }
                    else {
                        errorArr.push(error);
                    }
                }
                const message = `${ dateStr }${ infoStr }${ options.logParametersOnError ? paramStr : '' }${ errorStr }`;
                options.loggerFunction.call(undefined, message, ...paramArr, ...errorArr);
            }

            throw error;
        }

        if (options.logExit) {
            const dateStr = options.logMoment ? `[${(new Date()).toLocaleTimeString()}] ` : '';
            const infoStr = `Exit ${key}`;
            const elapsedMs = Math.round((finish - start) * 10) / 10;
            const elapsedStr = options.logElapsed ? ` [elapsed ${ elapsedMs } ms]` : '';
            let resultStr = '';
            let resultArr: any[] = [];
            if (options.logResult) {
                if (options.asJson) {
                    resultStr = ` = ${ JSON.stringify(result) }`;
                }
                else {
                    resultArr.push(result);
                }
            }
            const message = `${ dateStr }${ infoStr }${ options.logParametersOnExit ? paramStr : '' }${ resultStr }`;
            options.loggerFunction.call(undefined, message, ...paramArr, ...resultArr);
        }

        return result;
    }
);

export const ConsoleLog = Log({ level: "log" });
export const ConsoleDebug = Log({ level: "debug" });
export const ConsoleTrace = Log({ level: "trace" });
export const ConsoleInfo = Log({ level: "info" });
export const ConsoleWarn = Log({ level: "warn" });
export const ConsoleError = Log({ level: "error" });

export const LogPerf = Log({ logElapsed: true, logParametersOnEnter: false, logEnter: false, logError: false, logExit: true, level: "log" });
