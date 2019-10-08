import { IPluginDescriptorFile } from './IPluginDescriptorFile';

/**
 * Contains informations about a noted plugin
 * which should be initialized after the container
 * bindings are loaded
 *
 * @export
 * @interface INotedPlugin
 */
export interface INotedPlugin {
    /**
     * The default export of the plugin
     *
     * @type {*}
     * @memberof INotedPlugin
     */
    plugin: any;

    /**
     * The plugin description file
     *
     * @type {IPluginDescriptorFile}
     * @memberof INotedPlugin
     */
    pluginDescription: IPluginDescriptorFile;
}
