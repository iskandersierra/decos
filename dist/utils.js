"use strict";
function decorateWith(decorator) {
    return function (target, key, descriptor) {
        descriptor.value = decorator.call(target, descriptor.value);
        return descriptor;
    };
}
exports.decorateWith = decorateWith;
function decorateWithOptions(decorator, defaultOptions) {
    return function (options) {
        options = Object.assign({}, defaultOptions, options);
        return function (target, key, descriptor) {
            descriptor.value = decorator.call(target, options, descriptor.value);
            return descriptor;
        };
    };
}
exports.decorateWithOptions = decorateWithOptions;
