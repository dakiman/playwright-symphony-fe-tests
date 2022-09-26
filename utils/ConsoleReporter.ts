import {FullConfig, FullResult, Reporter, Suite, TestCase, TestResult} from '@playwright/test/reporter';

export default class ConsoleReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite): void {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
        // console.log(`Configuration values: ${}`)
    }

    onTestBegin(test: TestCase): void {
        console.log("||==============================================================================||");
        console.log(`Starting test ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        console.log(`Test finished, ${result.status} in ${result.duration}ms`);
    }

    onEnd(result: FullResult): void {
        console.log(`Finished the run: ${result.status}`);
    }
}

