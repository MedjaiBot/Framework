// tslint:disable:forin

import { existsSync, readdirSync, readFileSync } from 'fs';
import { inject, injectable } from 'inversify';
import { resolve } from 'path';
import { IsNullOrUndefined } from '../../Extras';
import { Logger } from '../logger/Logger';
import { IPluginDescriptorFile } from './IPluginDescriptorFile';
import { Plugin } from './Plugin';

/**
 * The plugin manager manages plugins
 * The standard implementation is to load plugins
 * by a given directory
 *
 * @export
 * @class PluginManager
 * @since 0.0.1
 * @version 0.0.1
 * @author Yannick Fricke <yannickfricke@googlemail.com>
 * @license MIT
 * @copyright MedjaiBot https://github.com/MedjaiBot/server
 */
@injectable()
export class PluginManager {
    /**
     * The plugins which will be managed by the plugin manager
     *
     * @type {Plugin[]}
     * @memberof PluginManager
     */
    public plugins: Plugin[];

    /**
     * The logger which will be used
     * Mostly loaded from the dependency injection container
     *
     * @private
     * @type {Logger}
     * @memberof PluginManager
     */
    private logger: Logger;

    /**
     * Creates an instance of PluginManager.
     * @param {Logger} logger The logger which should be used from the dependency injection container
     * @memberof PluginManager
     */
    constructor(
        @inject(Symbol.for('Logger'))
        logger: Logger,
    ) {
        // Sets the plugin property to an empty array
        this.plugins = [];

        // Sets the logger property to the given logger
        this.logger = logger;
    }

    /**
     * Loads all plugins from the given directory
     *
     * @param directory The directory where to load the plugins from
     * @memberof PluginManager
     */
    public loadPlugins = (directory: string) => {
        // Checks if the given directory exists on the filesystem
        if (!existsSync(directory)) {
            throw new Error(`Directory ${directory} does not exists`);
        }

        // Loads the contents of the directory
        const pluginDirectories = readdirSync(directory);

        // Iterates over the contents of the directory
        for (const index in pluginDirectories) {
            // Gets the current entry from the contents
            const pluginDirectory = pluginDirectories[index];

            // Resolves the given parts into a path as string
            const pluginJsonFile = resolve(directory, pluginDirectory, 'plugin.json');

            // Checks if the plugin.json file exists
            if (!existsSync(pluginJsonFile)) {
                this.logger.warn(
                    `Plugin directory ${pluginDirectory} does not contain a plugin.json. Skipping plugin.`,
                );

                continue;
            }

            // The loaded plugin.json file contents
            let pluginFileContents;

            try {
                pluginFileContents = readFileSync(pluginJsonFile).toString();
            } catch (error) {
                this.logger.error('Could not read the contents of the plugin.json file', error);

                continue;
            }

            // Parses the the contents of plugin.json file as JSON
            const parsedPluginFile: IPluginDescriptorFile = JSON.parse(pluginFileContents);

            // The main key of the parsed plugin file
            const mainEntry = parsedPluginFile.main;

            // Checks if the main entry is null or undefined
            if (IsNullOrUndefined(mainEntry)) {
                this.logger.debug('The parsed config key "main" is undefined');

                continue;
            }

            // Check if the main entry wants try to include a file outside of the plugin directory
            if ((mainEntry as string).includes('..')) {
                this.logger.debug('The main entry must be located inside in the plugin directory');
            }

            // The plugin structure of the file
            let plugin;

            try {
                // Requires the file which is defined in the "main" key
                plugin = require(
                    resolve(
                        directory,
                        pluginDirectory,
                        mainEntry as string,
                    ));
            } catch (error) {
                this.logger.error(`Could not require plugin ${pluginDirectory}`, error);

                continue;
            }

            if (typeof plugin.default !== 'function') {
                this.logger.warn(`The default export of the plugin ${pluginDirectory} is not a function`);

                continue;
            }

            // The plugin instance
            const pluginInstance: Plugin = new plugin.default();

            try {
                // Trying to call the onInit function of the plugin
                pluginInstance.onInit();
            } catch (error) {
                this.logger.error(`Could not call onInit for plugin "${pluginDirectory}"`, error);

                continue;
            }

            // Add the plugin to the managed plugins
            this.plugins.push(pluginInstance);
        }
    }
}
