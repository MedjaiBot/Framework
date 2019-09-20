import { LogLevel } from './LogLevel';

/**
 * Defines the format options for the logger
 *
 * @export
 * @interface IFormatOptions
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */
export interface IFormatOptions {
    /**
     * The log level of the message
     *
     * @type {LogLevel}
     * @memberof IFormatOptions
     */
    level: LogLevel;

    /**
     * The message of the entry
     *
     * @type {string}
     * @memberof IFormatOptions
     */
    message: string;

    /**
     * The timestamp of the message
     *
     * @type {Date}
     * @memberof IFormatOptions
     */
    timestamp?: Date;
}
