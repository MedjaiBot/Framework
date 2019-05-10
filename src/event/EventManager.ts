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
    public async measureEventByName(
        eventName: string,
        callArgument: any,
    ) {
        const startTime = Date.now();

        await this.broadcast(eventName, callArgument);

        return Date.now() - startTime;
    }

    /**
     * Measures an event and returns it execution time
     *
     * @param event The event to measure
     * @returns The measured time
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
     * @memberof EventManager
     */
    public async broadcast(eventName: string, ...args: any[]) {
        await this.publishToSubscribers(eventName, args);
    }

    public async broadcastEvent(event: Event) {
        await this.broadcast(event.name, event);
    }

    public async publishToSubscribers(
        eventName: string,
        args: any,
    ) {
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
