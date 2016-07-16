"use strict";
var utils_1 = require('./utils');
var defaultOptions = {
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
function initializeLogOptions(options) {
    if (!options.loggerFunction) {
        switch (options.level || "log") {
            case "debug":
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    return console.debug.apply(console, [message].concat(optionalParams));
                };
                break;
            case "trace":
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    return console.trace.apply(console, [message].concat(optionalParams));
                };
                break;
            case "info":
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    return console.info.apply(console, [message].concat(optionalParams));
                };
                break;
            case "warn":
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    return console.warn.apply(console, [message].concat(optionalParams));
                };
                break;
            case "error":
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    return console.error.apply(console, [message].concat(optionalParams));
                };
                break;
            case "log":
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                    return console.log.apply(console, [message].concat(optionalParams));
                };
                break;
            default:
                options.loggerFunction = function (message) {
                    var optionalParams = [];
                    for (var _i = 1; _i < arguments.length; _i++) {
                        optionalParams[_i - 1] = arguments[_i];
                    }
                };
                break;
        }
    }
}
exports.Log = utils_1.decorateFunction(defaultOptions, initializeLogOptions, function (_a) {
    var options = _a.options, key = _a.key, callback = _a.callback, args = _a.args;
    var paramStr = '';
    var paramArr = [];
    if (options.logParametersOnEnter || options.logParametersOnExit) {
        if (options.asJson) {
            paramStr = "(" + args.map(function (a) { return JSON.stringify(a); }).join(', ') + ")";
        }
        else {
            paramArr = args;
        }
    }
    if (options.logEnter) {
        var dateStr = options.logMoment ? "[" + (new Date()).toLocaleTimeString() + "] " : '';
        var infoStr = "Enter " + key;
        var message = "" + dateStr + infoStr + (options.logParametersOnEnter ? paramStr : '');
        (_b = options.loggerFunction).call.apply(_b, [undefined, message].concat(paramArr));
    }
    var start = new Date().getTime();
    var result;
    var finish;
    try {
        result = callback();
        finish = new Date().getTime();
    }
    catch (error) {
        finish = new Date().getTime();
        if (options.logError) {
            var dateStr = options.logMoment ? "[" + (new Date()).toLocaleTimeString() + "] " : '';
            var infoStr = "Error " + key;
            var elapsedMs = Math.round((finish - start) * 10) / 10;
            var elapsedStr = options.logElapsed ? " [elapsed " + elapsedMs + " ms]" : '';
            var errorStr = '';
            var errorArr = [];
            if (options.logResult) {
                if (options.asJson) {
                    errorStr = " = " + JSON.stringify(error);
                }
                else {
                    errorArr.push(error);
                }
            }
            var message = "" + dateStr + infoStr + (options.logParametersOnError ? paramStr : '') + errorStr;
            (_c = options.loggerFunction).call.apply(_c, [undefined, message].concat(paramArr, errorArr));
        }
        throw error;
    }
    if (options.logExit) {
        var dateStr = options.logMoment ? "[" + (new Date()).toLocaleTimeString() + "] " : '';
        var infoStr = "Exit " + key;
        var elapsedMs = Math.round((finish - start) * 10) / 10;
        var elapsedStr = options.logElapsed ? " [elapsed " + elapsedMs + " ms]" : '';
        var resultStr = '';
        var resultArr = [];
        if (options.logResult) {
            if (options.asJson) {
                resultStr = " = " + JSON.stringify(result);
            }
            else {
                resultArr.push(result);
            }
        }
        var message = "" + dateStr + infoStr + (options.logParametersOnExit ? paramStr : '') + resultStr;
        (_d = options.loggerFunction).call.apply(_d, [undefined, message].concat(paramArr, resultArr));
    }
    return result;
    var _b, _c, _d;
});
exports.ConsoleLog = exports.Log({ level: "log" });
exports.ConsoleDebug = exports.Log({ level: "debug" });
exports.ConsoleTrace = exports.Log({ level: "trace" });
exports.ConsoleInfo = exports.Log({ level: "info" });
exports.ConsoleWarn = exports.Log({ level: "warn" });
exports.ConsoleError = exports.Log({ level: "error" });
exports.LogPerf = exports.Log({ logElapsed: true, logParametersOnEnter: false, logEnter: false, logError: false, logExit: true, level: "log" });
//# sourceMappingURL=log.js.map