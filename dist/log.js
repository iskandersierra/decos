"use strict";
var utils_1 = require('./utils');
exports.Log = utils_1.decorateWithOptions(function (options, decorated) {
}, {
    logEnter: true,
    logExit: true,
    logParametersOnEnter: true,
    logParametersOnExit: false,
    logResult: true,
    logTime: false,
    logger: "log",
});
exports.LogEnter = function (target, key, desc) {
    var value = desc.value;
    if (typeof value !== 'function') {
        throw new Error('@log decorator can only be applied to functions');
    }
    var newValue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        console.log("Enter into key");
        var result = value.apply(target, args);
        return result;
    };
    return Object.assign({}, desc, { value: newValue });
};
