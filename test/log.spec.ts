import {
    Log, 
    ConsoleLog, ConsoleDebug, ConsoleTrace, ConsoleInfo, ConsoleWarn, ConsoleError, Console,
    JsonConsoleLog, JsonConsoleDebug, JsonConsoleTrace, JsonConsoleInfo, JsonConsoleWarn, JsonConsoleError, JsonConsole,
    LogPerf, LogJsonPerf 
    } from '../src/log';
import { spy, stub, SinonSpy } from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

const { expect } = chai.use(sinonChai);

class Foo {
    @ConsoleLog
    logToConsole(name: string, age: number) { return `${name} is ${age} years old`; }

    @JsonConsoleLog
    logToJsonConsole(name: string, age: number) { return `${name} is ${age} years old`; }

    @ConsoleInfo
    infoToConsole(name: string, age: number) { return `${name} is ${age} years old`; }

    @JsonConsoleInfo
    infoToJsonConsole(name: string, age: number) { return `${name} is ${age} years old`; }
}

describe("@ConsoleLog/JsonConsoleLog", () => {
    let consoleLog: SinonSpy;

    beforeEach(() => { consoleLog = spy(console, "log"); });

    afterEach(() => { consoleLog.restore(); })

    it("ConsoleLog should call console.log(...) twice", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToConsole("John", 46);
        // Expect console.log(...) to have been called twice
        expect(consoleLog).to.have.been.calledTwice;
    });

    it("ConsoleLog should not change decorated function result", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToConsole("John", 46);
        // Expect logToConsole result to be equal to "John is 46 years old"
        expect(result).to.be.equal("John is 46 years old");
    });

    it("ConsoleLog should log each parameter individually on the console", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToConsole("John", 46);
        // Expect console.log(...) first call to have been called with ("Enter logToConsole", "John", 46)
        expect(consoleLog.firstCall).to.have.been.calledWith("Enter logToConsole", "John", 46);
    });

    it("ConsoleLog should only log the result, individually, on the console", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToConsole("John", 46);
        // Expect console.log(...) second call to have been called with ("Enter logToConsole", "John", 46, "John is 46 years old")
        expect(consoleLog.secondCall).to.have.been.calledWith("Exit logToConsole", "John is 46 years old");
    });

    it("JsonConsoleLog should call console.log(...) twice", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToJsonConsole("John", 46);
        // Expect console.log(...) to have been called twice
        expect(consoleLog).to.have.been.calledTwice;
    });

    it("JsonConsoleLog should not change decorated function result", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToJsonConsole("John", 46);
        // Expect logToConsole result to be equal to "John is 46 years old"
        expect(result).to.be.equal("John is 46 years old");
    });

    it("JsonConsoleLog should log all parameters as JSON on the console", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToJsonConsole("John", 46);
        // Expect console.log(...) first call to have been called with ("Enter logToConsole", "John", 46)
        expect(consoleLog.firstCall).to.have.been.calledWith("Enter logToJsonConsole(\"John\", 46)");
    });

    it("JsonConsoleLog should only log the result as JSON on the console", () => {
        // Given foo
        const foo = new Foo();
        // When logToConsole is called with parameters "John" and 46
        const result = foo.logToJsonConsole("John", 46);
        // Expect console.log(...) second call to have been called with ("Enter logToConsole", "John", 46, "John is 46 years old")
        expect(consoleLog.secondCall).to.have.been.calledWith("Exit logToJsonConsole = \"John is 46 years old\"");
    });
});

describe("@ConsoleInfo/JsonConsoleInfo", () => {
    let consoleInfo: SinonSpy;

    beforeEach(() => { consoleInfo = spy(console, "info"); });

    afterEach(() => { consoleInfo.restore(); })

    it("ConsoleInfo should call console.info(...) twice", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToConsole("John", 46);
        // Expect console.info(...) to have been called twice
        expect(consoleInfo).to.have.been.calledTwice;
    });

    it("ConsoleInfo should not change decorated function result", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToConsole("John", 46);
        // Expect infoToConsole result to be equal to "John is 46 years old"
        expect(result).to.be.equal("John is 46 years old");
    });

    it("ConsoleInfo should log each parameter individually on the console", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToConsole("John", 46);
        // Expect console.info(...) first call to have been called with ("Enter infoToConsole", "John", 46)
        expect(consoleInfo.firstCall).to.have.been.calledWith("Enter infoToConsole", "John", 46);
    });

    it("ConsoleInfo should only log the result, individually, on the console", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToConsole("John", 46);
        // Expect console.info(...) second call to have been called with ("Enter infoToConsole", "John", 46, "John is 46 years old")
        expect(consoleInfo.secondCall).to.have.been.calledWith("Exit infoToConsole", "John is 46 years old");
    });

    it("JsonConsoleInfo should call console.info(...) twice", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToJsonConsole("John", 46);
        // Expect console.info(...) to have been called twice
        expect(consoleInfo).to.have.been.calledTwice;
    });

    it("JsonConsoleInfo should not change decorated function result", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToJsonConsole("John", 46);
        // Expect infoToConsole result to be equal to "John is 46 years old"
        expect(result).to.be.equal("John is 46 years old");
    });

    it("JsonConsoleInfo should log all parameters as JSON on the console", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToJsonConsole("John", 46);
        // Expect console.info(...) first call to have been called with ("Enter infoToConsole", "John", 46)
        expect(consoleInfo.firstCall).to.have.been.calledWith("Enter infoToJsonConsole(\"John\", 46)");
    });

    it("JsonConsoleInfo should only log the result as JSON on the console", () => {
        // Given foo
        const foo = new Foo();
        // When infoToConsole is called with parameters "John" and 46
        const result = foo.infoToJsonConsole("John", 46);
        // Expect console.info(...) second call to have been called with ("Enter infoToConsole", "John", 46, "John is 46 years old")
        expect(consoleInfo.secondCall).to.have.been.calledWith("Exit infoToJsonConsole = \"John is 46 years old\"");
    });
});
