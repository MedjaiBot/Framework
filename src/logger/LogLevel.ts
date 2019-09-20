/**
 * An enumeration of log levels
 *
 * @export
 * @enum {number}
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */
export enum LogLevel {
    ERROR = 1 << 0,

    WARN = 1 << 1 | ERROR,

    INFO = 1 << 2 | WARN,

    DEBUG = 1 << 3 | INFO,
}
