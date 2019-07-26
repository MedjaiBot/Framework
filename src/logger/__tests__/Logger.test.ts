import 'reflect-metadata';
import { Logger } from '../Logger';
import { LogLevel } from '../LogLevel';

describe('Logger', () => {

    it('be instantiatable', () => {
        expect(() => {
            const outputStreamMock: any = jest.fn();
            const errorStreamMock: any = jest.fn();

            const logger = new Logger(
                outputStreamMock,
                errorStreamMock,
                LogLevel.DEBUG,
            );
        }).not.toThrow();
    });

    describe('Logging', () => {
        let logger: Logger;
        let outputStreamMock: any;
        let errorStreamMock: any;
        const logLevel = LogLevel.ALL;

        beforeEach(() => {
            outputStreamMock = jest.fn();
            outputStreamMock.write = jest.fn();

            errorStreamMock = jest.fn();
            errorStreamMock.write = jest.fn();

            logger = new Logger(
                outputStreamMock,
                errorStreamMock,
                logLevel,
            );
        });

        it('should log an info message to the outputstream', () => {
            logger.info('test');

            expect(outputStreamMock.write).toBeCalled();
        });

        it('should log a debug message to the outputstream', () => {
            logger.debug('test');

            expect(outputStreamMock.write).toBeCalled();
        });

        it('should log a warn message to the outputstream', () => {
            logger.warn('test');

            expect(outputStreamMock.write).toBeCalled();
        });

        it('should log an error message to the outputstream', () => {
            logger.error('test');

            expect(errorStreamMock.write).toBeCalled();
        });

        it('should dump an object to the outputstream', () => {
            logger.dumpObject('Test', {});

            expect(outputStreamMock.write).toBeCalled();
        });
    });
});
