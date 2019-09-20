import { injectable } from 'inversify';

/**
 * Defines a basic value formatter
 *
 * @export
 * @abstract
 * @class Formatter
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/Server
 */
@injectable()
export abstract class Formatter {
    /**
     * Formats a value to a pretty string
     *
     * @param value The value to format
     */
    public abstract format(value: any): string;

    /**
     * Prefixes a number with the given prefix when the length is less than the given length
     *
     * @protected
     * @param {number} number The number to format
     * @returns The formatted number
     * @memberof Formatter
     */
    protected formatNumber(
        number: number,
        prefix: string = '0',
        length: number = 2,
    ): string {
        const stringifiedNumber = number.toString(10);
        const stringLength = stringifiedNumber.length;

        if (stringLength === length) {
            return stringifiedNumber;
        }

        if (stringLength > length) {
            return stringifiedNumber.substr(0, length);
        }

        return stringifiedNumber.padStart(length, prefix);
    }
}
