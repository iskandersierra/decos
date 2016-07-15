import { decorateWithOptions } from './private/utils';

export interface LogOptions {
    logEnter?: boolean;
    logExit?: boolean;
    logParametersOnEnter?: boolean;
    logParametersOnExit?: boolean;
    logResult?: boolean;
    logTime?: boolean;
    mode?: "log" | "info" | "warn" | "error";
}

export const Log = decorateWithOptions(
    (options: Object, decorated: Function) => {

    }, {
        logEnter: true,
        logExit: true,
        logParametersOnEnter: true,
        logParametersOnExit: false,
        logResult: true,
        logTime: false,
        mode: "log",        // can be log, info, warn or error
    }
);


export const LogEnter = (target: any, key: string, desc: PropertyDescriptor): PropertyDescriptor => {
    const { value } = desc;

    if (typeof value !== 'function') {
        throw new Error('@log decorator can only be applied to functions');
    }

    const newValue = (...args: any[]) => {
        console.log("Enter into key"); 
        const result = (<Function>value).apply(target, args);
        return result;
    };

    return Object.assign({}, desc, { value: newValue });
};