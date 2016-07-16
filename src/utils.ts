

export function decorateWith(decorator: Function) {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        descriptor.value = decorator.call(target, descriptor.value);
        return descriptor;
    };
}

export function decorateWithOptions(decorator: Function, defaultOptions: Object) {
    return (options?: Object) => {
        options = Object.assign({}, defaultOptions, options);
        return (target: any, key: string, descriptor: PropertyDescriptor) => {
            descriptor.value = decorator.call(target, options, descriptor.value);
            return descriptor;
        };
    };
}
