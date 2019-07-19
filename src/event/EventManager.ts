import { injectable } from 'inversify';
import { Event } from './Event';

/**
 * The EventManager handles all events
 *
 * @export
 * @class EventManager
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 */
@injectable()
export class EventManager {
    /**
     * The registered events
     *
     * @private
     * @type {Map<string, object[]>}
     * @memberof EventManager
     */
    public registeredEvents: Map<string, any[]>;

    /**
     * Creates an instance of EventManager.
     * @memberof EventManager
     */
    constructor() {
        this.registeredEvents = new Map();
    }

    /**
     * Measures the needed time for broadcasting
     * the given event
     *
     * @param {string} eventName The name of the event to broadcast
     * @param {*} callArgument The arguments for the event
     * @returns {Promise<number>} The needed amount of time
     * @memberof EventManager
     */
    public async measureEventByName(
        eventName: string,
        callArgument: any,
    ): Promise<number> {
        const startTime = Date.now();

        await this.broadcast(eventName, callArgument);

        return Date.now() - startTime;
    }

    /**
     * Measures an event and returns it execution time
     *
     * @param event The event to measure
     * @returns {Promise<number>} The needed amount of time
     */
    public async measureEvent(
        event: Event,
    ): Promise<number> {
        const startTime = Date.now();

        await this.broadcast(event.name, event);

        return Date.now() - startTime;
    }

    /**
     * Broadcasts an event to the subscribers
     *
     * @param {string} eventName
     * @param {...any[]} args
     * @returns {Promise<void>}
     * @memberof EventManager
     */
    public async broadcast(eventName: string, ...args: any[]): Promise<void> {
        await this.publishToSubscribers(eventName, args);
    }

    /**
     * Broadcasts the given event to all subscribers
     *
     * @param {Event} event The event which will be broadcastet
     * @returns {Promise<void>}
     * @memberof EventManager
     */
    public async broadcastEvent(event: Event): Promise<void> {
        await this.broadcast(event.name, event);
    }

    /**
     * Publishes an event with the given event name and the given args
     * to all subscribers who listen on that event
     *
     * @param {string} eventName The name of the event
     * @param {*} args The arguments for the event
     * @returns {Promise<void>}
     * @memberof EventManager
     */
    public async publishToSubscribers(
        eventName: string,
        args: any,
    ): Promise<void> {
        if (!this.registeredEvents.has(eventName)) {
            return;
        }

        const subscribers = this.registeredEvents.get(eventName) as any[];

        subscribers.forEach(async (subscriber) => {
            await subscriber(...args);
        });
    }

    /**
     * Registers an event with the given subscriber
     *
     * @param {string} eventName The name of the event
     * @param {object} subscriber The subscriber to add
     * @memberof EventManager
     */
    public registerEvent(eventName: string, subscriber: object): void {
        let existingEntries = [];

        if (this.registeredEvents.has(eventName)) {
            existingEntries = this.registeredEvents.get(eventName) as any[];
        }

        existingEntries.push(subscriber);

        this.registeredEvents.set(eventName, existingEntries);
    }
}
