/**
 * Defines on which side the plugin will be initialized
 *
 * @export
 * @enum {number}
 */
export enum InitializationSide {
    /**
     * Defines that the plugin is loaded from the client
     */
    CLIENT,

    /**
     * Defines that the plugin is loaded from the server
     */
    SERVER,
}
