import chalk from 'chalk';
import { injectable } from 'inversify';
import { LogLevel } from '../LogLevel';
import { Formatter } from './Formatter';

/**
 * Formats a log level to a colored string for the terminal
 *
 * @export
 * @class TTYLogLevelFormatter
 * @extends {Formatter}
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */

@injectable()
export class TTYLogLevelFormatter extends Formatter {
    /**
     * Formats the given log level to a colored terminal friendly string
     *
     * @param logLevel The log level to format
     */
    public format(logLevel: LogLevel): string {
        let result = '';

        switch (logLevel) {
            case LogLevel.DEBUG:
                result = chalk.blueBright('DEBUG');
                break;

            case LogLevel.INFO:
                result = chalk.cyanBright('INFO');
                break;
            case LogLevel.WARN:
                result = chalk.yellowBright('WARN');
                break;

            case LogLevel.ERROR:
                result = chalk.redBright('ERROR');
                break;

            default:
                result = chalk.whiteBright('UNKNOWN');
                break;
        }

        return result;
    }
}
