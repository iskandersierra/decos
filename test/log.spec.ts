
import {
    Log, 
    ConsoleLog, ConsoleDebug, ConsoleTrace, ConsoleInfo, ConsoleWarn, ConsoleError, 
    LogPerf 
    } from '../src/log';

describe("Log decorator", () => {
    it("should fail", () => {
        throw new Error("This is failing");
    })
});