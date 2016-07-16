

export interface OptionsInitializer<TOptions> {
    (options: TOptions): TOptions | void;
}

export interface DecoratedCallback {
    (): any;
    withArgs(...args: any[]): any;
    withTarget(target: any): any;
    withTargetAndArgs(target: any, ...args: any[]): any;
}

export interface FunctionDecorator<TOptions> {
    options: TOptions;
    target: any;
    key: string;
    callback: DecoratedCallback;
    args: any[];
}

export function decorateFunction<TOptions>(
    defaultOptions: TOptions, 
    initialize: OptionsInitializer<TOptions>, 
    decorate: (decos: FunctionDecorator<TOptions>) => any 
) {
    return (options?: TOptions) => {
        let opts = Object.assign({}, defaultOptions);
        if (!!options) {
            opts = Object.assign(opts, options);
        }

        if (initialize) {
            const prevOpts = opts;
            opts = initialize(opts) || prevOpts;
        }

        return (target: any, key: string, descriptor: PropertyDescriptor) => {
            const originalFunction: Function = descriptor.value;
            const newFunction: Function = (...args: any[]): any => {
                let callback: any = () => { originalFunction.apply(target, args); };
                callback.withArgs = (...newArgs: any[]) => { originalFunction.apply(target, newArgs); };
                callback.withTarget = (newTarget: any[]) => { originalFunction.apply(newTarget, args); };
                callback.withTargetAndArgs = (newTarget: any[], ...newArgs: any[]) => { originalFunction.apply(newTarget, newArgs); };

                return decorate({
                    options: opts,
                    target: target,
                    key: key,
                    callback: callback,
                    args: args
                });
            };
            
            descriptor.value = newFunction;
            return descriptor;
        };
    };
}
