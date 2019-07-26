// tslint:disable:no-bitwise

import chalk from 'chalk';
import { inject, injectable } from 'inversify';
import { EOL } from 'os';
import { ContainerConstants } from '../constants/ContainerConstants';
import { LogLevel } from './LogLevel';

/**
 * A basic logger
 *
 * @export
 * @class Logger
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
@injectable()
export class Logger {

    public logLevel: number;
    /**
     * The stream where to write normal messages
     *
     * @private
     * @type {NodeJS.WriteStream}
     * @memberof Logger
     */
    private outputStream: NodeJS.WriteStream;

    /**
     * The stream where to write error messages
     *
     * @private
     * @type {NodeJS.WriteStream}
     * @memberof Logger
     */
    private errorStream: NodeJS.WriteStream;

    /**
     * Constructs a new Logger
     * @param outputStream The stream where to log normal messages to
     * @param errorStream  The stream where to log error messages to
     * @param logLevel  The log level of this logger. Default is info.
     */
    constructor(
        @inject(ContainerConstants.LOGGING.STREAMS.OUT)
        outputStream = process.stdout,

        @inject(ContainerConstants.LOGGING.STREAMS.ERROR)
        errorStream = process.stderr,

        @inject(ContainerConstants.LOGGING.LOGLEVEL)
        logLevel = LogLevel.INFO,
    ) {
        this.outputStream = outputStream;
        this.errorStream = errorStream;
        this.logLevel = logLevel;
    }

    /**
     * Logs the given message with the INFO level
     *
     * @param message The message to log
     */
    public info(message: string): void {
        this.log(
            this.outputStream,
            LogLevel.INFO,
            message,
        );
    }

    /**
     * Logs the given message with the DEBUG level
     * @param message The message to log
     */
    public debug(message: string): void {
        this.log(
            this.outputStream,
            LogLevel.DEBUG,
            message,
        );
    }

    /**
     * Logs the given message with the WARN level
     *
     * @param {string} message The message to log
     * @param {string} error The error to log
     * @memberof Logger
     */
    public warn(message: string): void {
        this.log(
            this.outputStream,
            LogLevel.WARN,
            message,
        );
    }

    /**
     * Logs the given message with the ERROR level
     *
     * @param {string} message The message to log
     * @param {string} error The error to log
     * @memberof Logger
     */
    public error(message: string, error?: string): void {
        this.log(
            this.errorStream,
            LogLevel.ERROR,
            error === undefined ? message : `${message} ${error}`,
        );
    }

    /**
     * Dumps an object to the stream with the DUMP level
     * @param description The description for the object
     * @param obj The object to log
     */
    public dumpObject(description: string, obj: object): void {
        this.log(
            this.outputStream,
            LogLevel.DUMP,
            `${description}: ${JSON.stringify(obj, undefined, 4)}`,
        );
    }

    /**
     * Prefixes a number with a zero when the value is less than ten
     *
     * @public
     * @param {number} number The number to format
     * @returns The formatted number
     * @memberof Logger
     */
    public formatNumber(
        number: number,
        prefix: string = '0',
        length: number = 2,
    ): string {
        const stringifiedNumber = number.toString();
        const stringLength = stringifiedNumber.length;

        if (stringLength === length) {
            return stringifiedNumber;
        }

        if (stringLength > length) {
            return stringifiedNumber.substr(0, length);
        }

        return stringifiedNumber.padStart(length, prefix);
    }

    /**
     * Logs a message to the given stream with the given level
     *
     * @private
     * @param {NodeJS.WriteStream} stream The stream to write to
     * @param {string} level The log level of the message
     * @param {string} message The message to log
     * @memberof Logger
     */
    private log(stream: NodeJS.WriteStream, level: number, message: string): void {
        // The log level as a (colored) string
        const logLevel = this.getLogLevel(level);
        const timestamp = new Date();
        const formattedDate = this.getFormattedDate(timestamp);
        const formattedTime = this.getFormattedTime(timestamp);

        // Writes the log messages to the given stream
        stream.write(`[${formattedDate} ${formattedTime}] [${logLevel}] ${message}${EOL}`);
    }

    /**
     * Returns the loglevel as (colored) string
     *
     * @private
     * @param {number} level The level which was passed to the log function
     * @returns {string} The (colored) loglevel
     * @memberof Logger
     */
    private getLogLevel(level: number): string {
        if ((this.logLevel & LogLevel.INFO) === level) {
            return chalk.supportsColor ? chalk.blue('INFO') : 'INFO';
        }

        if ((this.logLevel & LogLevel.DEBUG) === level) {
            return chalk.supportsColor ? chalk.cyanBright('DEBUG') : 'DEBUG';
        }

        if ((this.logLevel & LogLevel.WARN) === level) {
            return chalk.supportsColor ? chalk.yellow('WARN') : 'WARN';
        }

        if ((this.logLevel & LogLevel.ERROR) === level) {
            return chalk.supportsColor ? chalk.redBright('ERROR') : 'ERROR';
        }

        if ((this.logLevel & LogLevel.DUMP) === level) {
            return chalk.supportsColor ? chalk.cyanBright('DUMP') : 'DUMP';
        }

        return 'UNKNOWN';
    }

    /**
     * Returns the formatted date
     *
     * @private
     * @param {Date} timestamp The timestamp which will be used to determine the date
     * @returns {string} The formatted date for the log
     * @memberof Logger
     */
    private getFormattedDate(timestamp: Date): string {
        return [
            this.formatNumber(timestamp.getDate()),
            this.formatNumber(timestamp.getMonth() + 1),
            timestamp.getFullYear(),
        ].join('.');
    }

    /**
     * Returns the formatted time
     *
     * @private
     * @param {Date} timestamp The timestamp which will be used to determine the time
     * @returns {string} The formatted time for the log
     * @memberof Logger
     */
    private getFormattedTime(timestamp: Date): string {
        return [
            this.formatNumber(timestamp.getHours()),
            this.formatNumber(timestamp.getMinutes()),
            this.formatNumber(timestamp.getSeconds()),
            this.formatNumber(timestamp.getMilliseconds(), '0', 3),
        ].join(':');
    }
}
