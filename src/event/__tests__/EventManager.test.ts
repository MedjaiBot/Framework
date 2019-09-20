import 'reflect-metadata';
import { EventManager } from '../EventManager';

describe('EventManager', () => {
    const eventName = 'com.github.medjaibot.server.event.testing.testevent';

    let eventManager: EventManager;
    let subscriber: () => {};

    beforeEach(() => {
        eventManager = new EventManager();
        subscriber = jest.fn();
    });

    it('should be instantiable', () => {
        expect(eventManager).toBeTruthy();
    });

    it('should register an event', () => {
        eventManager.registerEvent(eventName, subscriber);

        expect(
            eventManager.registeredEvents.has(eventName),
        ).toBeTruthy();

        const registeredSubscribers = eventManager.registeredEvents.get(eventName) as any[];

        expect(
            registeredSubscribers,
        ).toBeDefined();

        expect(
            registeredSubscribers.length,
        ).toEqual(1);

        expect(
            registeredSubscribers.includes(subscriber),
        ).toBeTruthy();
    });

    it('should broadcast an event to the subscribers', () => {
        const callArgument = 'testing';

        eventManager.registerEvent(eventName, subscriber);
        eventManager.broadcast(eventName, callArgument);

        expect(subscriber).toHaveBeenCalled();
    });

    it('should measure the time of an event', async () => {
        const callArgument = 'testing';
        eventManager.registerEvent(eventName, subscriber);
        eventManager.registerEvent(eventName, async () => {
            await sleep(2000);
        });

        expect(eventManager.measureEventByName(
            eventName,
            callArgument,
        )).resolves.not.toThrowError();
        expect(subscriber).toHaveBeenCalled();
    });

    function sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
});
