/**
 * An enumeration of log levels
 *
 * @export
 * @enum {number}
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
export enum LogLevel {
    /**
     * The info log level
     */
    INFO = 1 << 0,

    /**
     * The debug log level. Will be checked with the dump log level
     */
    DEBUG = 1 << 1,

    /**
     * The warn log level
     */
    WARN = 1 << 2,

    /**
     * The error log level
     */
    ERROR = 1 << 3,

    /**
     * The dump log level. Will be checked with the debug log level
     */
    DUMP = 1 << 4,

    /**
     * All loglevels togeather
     */
    ALL = INFO | DEBUG | WARN | ERROR | DUMP,
}
