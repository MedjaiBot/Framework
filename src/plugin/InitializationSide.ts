/**
 * The context for a plugin when it will be initialized
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
     * Defines that the plugin is loaded from the client
     */
    SERVER,
}
