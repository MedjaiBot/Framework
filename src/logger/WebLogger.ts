import { inject, injectable } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { DateTimeFormatter } from './formatter/DateTimeFormatter';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';

/**
 * A logger module for electron
 *
 * @export
 * @class WebLogger
 * @extends {Logger}
 */
@injectable()
export class WebLogger extends Logger {
    /**
     * The class name of the calling class
     *
     * @type {string}
     * @memberof WebLogger
     */
    public className!: string;

    /**
     * The datetime formatter
     *
     * @type {DateTimeFormatter}
     * @memberof WebLogger
     */
    public dateTimeFormatter: DateTimeFormatter;

    /**
     * Creates an instance of WebLogger.
     *
     * @param {DateTimeFormatter} dateTimeFormatter The date time formatter to use
     * @memberof WebLogger
     */
    constructor(
        @inject(ContainerConstants.LOGGING.FORMATTER.DATETIME)
        dateTimeFormatter: DateTimeFormatter,
    ) {
        super();

        this.dateTimeFormatter = dateTimeFormatter;
    }

    /**
     * Prints the message with debug log level
     *
     * @param message The message to log
     */
    public debug(message: string): void {
        this.logMessage(LogLevel.DEBUG, message);
    }

    /**
     * Prints the message with info log level
     *
     * @param message The message to log
     */
    public info(message: string): void {
        this.logMessage(LogLevel.INFO, message);
    }

    /**
     * Prints the message with warn log level
     *
     * @param message The message to log
     */
    public warn(message: string): void {
        this.logMessage(LogLevel.WARN, message);
    }

    /**
     * Prints the message with error log level
     * When an error is defined, then it will be prepended
     * to the message
     *
     * @param message The message to log
     */
    public error(message: string, error?: string | undefined): void {
        this.logMessage(LogLevel.ERROR, !error ? message : `${message}: ${error}`);
    }

    /**
     * Prints the message and the object with debug log level
     *
     * @param message The message to log
     */
    public dumpObject(description: string, obj: object): void {
        this.logMessage(LogLevel.DEBUG, `${description}: ${JSON.stringify(obj, undefined, 4)}`);
    }

    /**
     * Prefixes the message and
     * prints it to the browser console
     *
     * @private
     * @param {LogLevel} loglevel The log level of the message
     * @param {string} message The message to log
     * @memberof WebLogger
     */
    private logMessage(
        loglevel: LogLevel,
        message: string,
    ) {
        const prefix: string[] = [];
        const styles: string[] = [];
        const stringifiedLogLevel = '%c';

        prefix.push(this.dateTimeFormatter.format(new Date()));

        switch (loglevel) {
            case LogLevel.ERROR:
                prefix.push('ERROR');
                styles.push('color: red');
                break;
            case LogLevel.WARN:
                prefix.push('WARN');
                styles.push('color: #8fa6f7');
                break;
            case LogLevel.INFO:
                prefix.push('INFO');
                styles.push('color: blue');
                break;
            case LogLevel.DEBUG:
                prefix.push('DEBUG');
                styles.push('color: cyan');
                break;
        }

        if (this.className) {
            prefix.push(this.className);
        }

        const compiledPrefix = prefix
            .map((entry) => {
                return `[${entry}]`;
            })
            .join(' ');

        // tslint:disable-next-line: no-console
        console.log(`${stringifiedLogLevel}${compiledPrefix} ${message}`, ...styles);
    }
}
