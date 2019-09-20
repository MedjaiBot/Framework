import { injectable } from 'inversify';

/**
 * The base class for all loggers
 *
 * @export
 * @abstract
 * @class Logger
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */
@injectable()
export abstract class Logger {
    /**
     * The name of the class to which this logger belongs to
     *
     * @type {string}
     * @memberof Logger
     */
    public className!: string;

    /**
     * Logs a message with the debug log level
     *
     * @param message The message to log
     */
    public abstract debug(message: string): void;

    /**
     * Logs a message with the info log level
     *
     * @param message The message to log
     */
    public abstract info(message: string): void;

    /**
     * Logs a message with the warn log level
     *
     * @param message The message to log
     */
    public abstract warn(message: string): void;

    /**
     * Logs a message with the error log level and optionally
     * an error
     *
     * @param message The message to log
     * @param error The error to log
     */
    public abstract error(message: string, error?: string): void;

    /**
     * Prints an object prettified with the given description
     *
     * @param description The description of the object
     * @param obj The object to dump
     */
    public abstract dumpObject(description: string, obj: object): void;
}
