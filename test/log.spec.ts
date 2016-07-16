
import {
    Log, 
    ConsoleLog, ConsoleDebug, ConsoleTrace, ConsoleInfo, ConsoleWarn, ConsoleError, 
    LogPerf 
    } from '../src/log';
import { expect } from 'chai';

describe("Log decorator", () => {
    it("should fail", () => {
        expect(2 + 3).to.be.equal(5);
    })
});