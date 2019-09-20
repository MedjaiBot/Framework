import { inject, injectable } from 'inversify';
import { EOL } from 'os';
import { ContainerConstants } from '../constants/ContainerConstants';
import { IsNullOrUndefined } from '../Extras';
import { Formatter } from './formatter/Formatter';
import { IFormatOptions } from './IFormatOptions';
import { Logger } from './Logger';
import { LogLevel } from './LogLevel';

/**
 * A logger for the terminal
 *
 * @export
 * @class TTYLogger
 * @extends {Logger}
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */
@injectable()
export class TTYLogger extends Logger {
    /**
     * The output stream of the terminal
     *
     * @private
     * @type {NodeJS.WriteStream}
     * @memberof TTYLogger
     */
    private outputStream: NodeJS.WriteStream;

    /**
     * The error stream of the terminal
     *
     * @private
     * @type {NodeJS.WriteStream}
     * @memberof TTYLogger
     */
    private errorStream: NodeJS.WriteStream;

    /**
     * The log level which can be logged
     *
     * @private
     * @type {LogLevel}
     * @memberof TTYLogger
     */
    private logLevel: LogLevel;

    /**
     * Formats a date to a pretty string
     *
     * @private
     * @type {Formatter}
     * @memberof TTYLogger
     */
    private dateTimeFormatter: Formatter;

    /**
     * Formats a log level to a pretty string
     *
     * @private
     * @type {Formatter}
     * @memberof TTYLogger
     */
    private logLevelFormatter: Formatter;

    /**
     * Creates a new instance of the terminal logger
     *
     * @param outputStream The output stream of the terminal
     * @param errorStream The error stream of the terminal
     * @param logLevel The log level which can be logged
     * @param dateTimeFormatter The formatter for formating a date
     * @param logLevelFormatter The formatter for formating a log level
     */
    constructor(
        @inject(ContainerConstants.LOGGING.STREAMS.OUT)
        outputStream: NodeJS.WriteStream,

        @inject(ContainerConstants.LOGGING.STREAMS.ERROR)
        errorStream: NodeJS.WriteStream,

        @inject(ContainerConstants.LOGGING.LOGLEVEL)
        logLevel: LogLevel,

        @inject(ContainerConstants.LOGGING.FORMATTER.DATETIME)
        dateTimeFormatter: Formatter,

        @inject(ContainerConstants.LOGGING.FORMATTER.LOGLEVEL)
        logLevelFormatter: Formatter,
    ) {
        super();

        this.outputStream = outputStream;
        this.errorStream = errorStream;
        this.logLevel = logLevel;
        this.dateTimeFormatter = dateTimeFormatter;
        this.logLevelFormatter = logLevelFormatter;
    }

    /**
     * Logs a message with the debug log level
     *
     * @param message The message to log
     */
    public debug(message: string) {
        if ((this.logLevel & LogLevel.DEBUG) !== LogLevel.DEBUG) {
            return;
        }

        this.log(this.outputStream, LogLevel.DEBUG, message);
    }

    /**
     * Logs a message with the info log level
     *
     * @param message The message to log
     */
    public info(message: string) {
        if ((this.logLevel & LogLevel.INFO) !== LogLevel.INFO) {
            return;
        }

        this.log(this.outputStream, LogLevel.INFO, message);
    }

    /**
     * Logs a message with the warn log level
     *
     * @param message The message to log
     */
    public warn(message: string) {
        if ((this.logLevel & LogLevel.WARN) !== LogLevel.WARN) {
            return;
        }

        this.log(this.outputStream, LogLevel.WARN, message);
    }

    /**
     * Logs a message with the error log level and optionally
     * an error
     *
     * @param message The message to log
     * @param error The error to log
     */
    public error(message: string, error?: string) {
        if ((this.logLevel & LogLevel.ERROR) !== LogLevel.ERROR) {
            return;
        }

        this.log(this.errorStream, LogLevel.ERROR, message);
    }

    /**
     * Prints an object prettified with the given description
     *
     * @param description The description of the object
     * @param obj The object to dump
     */
    public dumpObject(description: string, obj: object) {
        if ((this.logLevel & LogLevel.DEBUG) !== LogLevel.DEBUG) {
            return;
        }

        this.log(this.outputStream, LogLevel.DEBUG, `${description}: ${JSON.stringify(obj, undefined, 4)}`);
    }

    /**
     * Logs the given message with the given log level to the given stream
     *
     * @param stream The stream to log the message to
     * @param logLevel The log level of the message
     * @param message The message to log
     */
    private log(
        stream: NodeJS.WriteStream,
        logLevel: LogLevel,
        message: string,
    ) {
        stream.write(this.formatMessage({
            level: logLevel,
            message,
        }) + EOL);
    }

    /**
     * Formats the message with the given options
     *
     * @private
     * @param {string} options The formating options
     * @returns {string} The formated message
     * @memberof Logger
     */
    private formatMessage(
        options: IFormatOptions,
    ): string {
        // Format the timestamp
        const formattedDateTime = this.dateTimeFormatter.format(
            options.timestamp || new Date(),
        );
        const formattedLogLevel = this.logLevelFormatter.format(options.level);

        const prefixParts = [
            formattedDateTime,
        ];

        if (!IsNullOrUndefined(this.className)) {
            prefixParts.push(this.className as string);
        }

        prefixParts.push(formattedLogLevel);

        const prefix = prefixParts.map((entry: string) => {
            return `[${entry}]`;
        }).join(' ');

        return [
            prefix,
            options.message,
        ].join(' ');
    }
}
