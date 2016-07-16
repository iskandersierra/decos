# decos package for JS+


The purpose of this package is to offer a set of basic and common 
decorators for javascript and related languages (ES+, TypeScript, etc...)

Also some helper functions allow easy definition of new decorators. 

For example, decorateFunction allows to define function decorators with options.

# Function Decorators
* Log

    Options
    - asJson?: boolean;
    - logEnter?: boolean;
    - logError?: boolean;
    - logExit?: boolean;
    - logParametersOnEnter?: boolean;
    - logParametersOnError?: boolean;
    - logParametersOnExit?: boolean;
    - logResult?: boolean;
    - logMoment?: boolean;
    - logElapsed?: boolean;
    - level?: "debug" | "trace" | "log" | "info" | "warn" | "error" | "off";
    - loggerFunction?: LoggerFunction; 

    Derived decorators
    - ConsoleLog
    - ConsoleDebug 
    - ConsoleTrace 
    - ConsoleInfo 
    - ConsoleWarn
    - ConsoleError 
    - LogPerf
    