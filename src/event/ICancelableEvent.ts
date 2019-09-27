import { Event } from './Event';

/**
 * Defines a cancelable event
 *
 * @export
 * @interface ICancelableEvent
 * @extends {Event}
 */
export interface ICancelableEvent extends Event {
    /**
     * When set to true the event was cancelled
     *
     * @type {boolean}
     * @memberof ICancelableEvent
     */
    cancelled: boolean;
}
