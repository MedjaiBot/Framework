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
     * The main entry for the plugin
     * Can also be undefined
     *
     * @type {string}
     * @memberof IPluginDescriptorFile
     */
    main: string;
}
