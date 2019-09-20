import chalk from 'chalk';
import 'reflect-metadata';
import { LogLevel } from '../../LogLevel';
import { TTYLogLevelFormatter } from '../TTYLogLevelFormatter';

describe('Terminal log level formatter', () => {
    let ttyLogLevelFormatter: TTYLogLevelFormatter;

    beforeEach(() => {
        ttyLogLevelFormatter = new TTYLogLevelFormatter();
    });

    it('should format the debug level with the right color', () => {
        expect(ttyLogLevelFormatter.format(LogLevel.DEBUG)).toEqual(chalk.blueBright('DEBUG'));
    });

    it('should format the info level with the right color', () => {
        expect(ttyLogLevelFormatter.format(LogLevel.INFO)).toEqual(chalk.cyanBright('INFO'));
    });

    it('should format the warn level with the right color', () => {
        expect(ttyLogLevelFormatter.format(LogLevel.WARN)).toEqual(chalk.yellowBright('WARN'));
    });

    it('should format the error level with the right color', () => {
        expect(ttyLogLevelFormatter.format(LogLevel.ERROR)).toEqual(chalk.redBright('ERROR'));
    });

    it('should format an unknown log level with the right color', () => {
        expect(ttyLogLevelFormatter.format(20)).toEqual(chalk.whiteBright('UNKNOWN'));
    });
});
