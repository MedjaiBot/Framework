import { injectable } from 'inversify';
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
@injectable()
export abstract class Plugin {
    /**
     * The id of the plugin in the followoing format
     * Github: "com.github.<Your Username>.<Repo Name>"
     *
     * @type {string}
     * @memberof Plugin
     */
    public readonly id: string;

    /**
     * The name of the plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    public readonly name: string;

    /**
     * The version of the plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    public readonly version: string;

    /**
     * The author(s) of the plugin
     *
     * @type {string}
     * @memberof Plugin
     */
    public readonly author: string;

    /**
     * Creates an instance of Plugin.
     * @param {string} id The id iof the plugin
     * @param {string} name The name of the plugin
     * @param {string} version The version of the plugin
     * @param {string} author The author(s) of the plugin
     * @memberof Plugin
     */
    constructor(
        id: string,
        name: string,
        version: string,
        author: string,
    ) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.author = author;
    }

    /**
     * Lifecycle hook
     * Will be called when the plugin was loaded
     * Use this to do the initial work
     *
     * @abstract
     * @param context The initialization context
     * @memberof Plugin
     */
    public abstract onInit(
        context: IInitializationContext,
    ): void;
}
