"use strict";
function decorateFunction(defaultOptions, initialize, decorate) {
    return function (options) {
        var opts = Object.assign({}, defaultOptions);
        if (!!options) {
            opts = Object.assign(opts, options);
        }
        if (initialize) {
            var prevOpts = opts;
            opts = initialize(opts) || prevOpts;
        }
        return function (target, key, descriptor) {
            var originalFunction = descriptor.value;
            var newFunction = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i - 0] = arguments[_i];
                }
                var callback = function () { originalFunction.apply(target, args); };
                callback.withArgs = function () {
                    var newArgs = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        newArgs[_i - 0] = arguments[_i];
                    }
                    originalFunction.apply(target, newArgs);
                };
                callback.withTarget = function (newTarget) { originalFunction.apply(newTarget, args); };
                callback.withTargetAndArgs = function (newTarget) {
                    var newArgs = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        newArgs[_i - 1] = arguments[_i];
                    }
                    originalFunction.apply(newTarget, newArgs);
                };
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
exports.decorateFunction = decorateFunction;
//# sourceMappingURL=utils.js.map