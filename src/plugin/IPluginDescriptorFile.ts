/**
 * Describes the structure of the plugin
 *
 * @export
 * @interface IPluginDescriptorFile
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
export interface IPluginDescriptorFile {
    /**
     * The id of the plugin
     *
     * @type {string}
     * @memberof IPluginDescriptorFile
     */
    id: string;

    /**
     * The name of the plugin
     *
     * @type {string}
     * @memberof IPluginDescriptorFile
     */
    name: string;

    /**
     * The version of the plugin
     *
     * @type {string}
     * @memberof IPluginDescriptorFile
     */
    version: string;

    /**
     * The author(s) of the plugin
     *
     * @type {string}
     * @memberof IPluginDescriptorFile
     */
    author: string;

    /**
     * The main entry for the plugin
     * Can also be undefined
     *
     * @type {string}
     * @memberof IPluginDescriptorFile
     */
    main: string;
}
