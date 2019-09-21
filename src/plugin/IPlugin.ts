import { IInitializationContext } from './IInitializationContext';

/**
 * A basic plugin definition
 *
 * @export
 * @abstract
 * @class Plugin
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
export interface IPlugin {
    /**
     * The id of the plugin in the followoing format
     * Github: "com.github.<Your Username>.<Repo Name>"
     *
     * @type {string}
     * @memberof Plugin
     */
    id: string;

    /**
     * The name of the plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    name: string;

    /**
     * The version of the plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    version: string;

    /**
     * The author(s) of the plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    author: string;

    /**
     * Lifecycle hook
     * Will be called when the plugin was loaded
     * Use this to do the initial work
     *
     * @abstract
     * @param context The initialization context
     * @memberof Plugin
     */
    onInit: (context: IInitializationContext) => void;
}
