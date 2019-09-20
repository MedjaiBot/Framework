import { injectable } from 'inversify';
import { Formatter } from './Formatter';
/**
 * Formats a date for the output
 *
 * @export
 * @class DateTimeFormatter
 * @extends {Formatter}
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */
@injectable()

export class DateTimeFormatter extends Formatter {
    /**
     * Formats the given date to a pretty string
     *
     * @param timestamp The date to convert
     */
    public format(timestamp: Date): string {
        const formattedDate = [
            this.formatNumber(timestamp.getDate()),
            this.formatNumber(timestamp.getMonth()),
            timestamp.getFullYear(),
        ].join('.');

        const formattedTime = [
            this.formatNumber(timestamp.getHours()),
            this.formatNumber(timestamp.getMinutes()),
            this.formatNumber(timestamp.getSeconds()),
            this.formatNumber(timestamp.getMilliseconds(), '0', 3),
        ].join(':');

        return `${formattedDate} ${formattedTime}`;
    }
}
