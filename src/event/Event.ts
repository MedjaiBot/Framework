/**
 * The basic structure of an event
 *
 * @export
 * @abstract
 * @class Event
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
export abstract class Event {
    /**
     * The name of the event
     *
     * @type {string}
     * @memberof Event
     */
    public name: string;

    /**
     * Creates an instance of Event.
     * @param {string} name The name of the event which will
     *                      be used internally
     * @memberof Event
     */
    constructor(
        name: string,
    ) {
        // Sets the name property to the given name
        this.name = name;
    }
}
