import { decorateFunction } from './utils';

export interface LoggerFunction {
    (message: any, ...optionalParams: any[]): void;
}

export type LogLevel = "debug" | "trace" | "log" | "info" | "warn" | "error" | "off"; 

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
    level?: LogLevel;
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
                const errParamsArr = options.logParametersOnError ? paramArr : [];
                const message = `${ dateStr }${ infoStr }${ elapsedStr }${ options.logParametersOnError ? paramStr : '' }${ errorStr }`;
                options.loggerFunction.call(undefined, message, ...errParamsArr, ...errorArr);
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
            const outParamsArr = options.logParametersOnExit ? paramArr : [];
            const message = `${ dateStr }${ infoStr }${ elapsedStr }${ options.logParametersOnExit ? paramStr : '' }${ resultStr }`;
            options.loggerFunction.call(undefined, message, ...outParamsArr, ...resultArr);
        }

        return result;
    }
);

function createConsoleLog(level: LogLevel, asJson: boolean = false) {
    return Log({ level, asJson });
}

export const ConsoleLog   = createConsoleLog("log");
export const ConsoleDebug = createConsoleLog("debug");
export const ConsoleTrace = createConsoleLog("trace");
export const ConsoleInfo  = createConsoleLog("info");
export const ConsoleWarn  = createConsoleLog("warn");
export const ConsoleError = createConsoleLog("error");
export const Console      = (level: LogLevel) => createConsoleLog(level);

export const JsonConsoleLog   = createConsoleLog("log", true);
export const JsonConsoleDebug = createConsoleLog("debug", true);
export const JsonConsoleTrace = createConsoleLog("trace", true);
export const JsonConsoleInfo  = createConsoleLog("info", true);
export const JsonConsoleWarn  = createConsoleLog("warn", true);
export const JsonConsoleError = createConsoleLog("error", true);
export const JsonConsole      = (level: LogLevel) => createConsoleLog(level, true);


export const LogPerf = Log({ logElapsed: true, logParametersOnExit: true, logEnter: false, logError: false, logExit: true, level: "log" });
export const LogJsonPerf = Log({ logElapsed: true, logParametersOnExit: true, logEnter: false, logError: false, logExit: true, level: "log", asJson: true });
