// tslint:disable:forin

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { Container, inject, injectable } from 'inversify';
import { resolve } from 'path';
import { ContainerConstants } from '../constants/ContainerConstants';
import { EventsConstants } from '../constants/EventConstants';
import { EventManager } from '../event/EventManager';
import { IsNullOrUndefined } from '../Extras';
import { Logger } from '../logger/Logger';
import { InitializationSide } from './InitializationSide';
import { IPlugin } from './IPlugin';
import { IPluginDescriptorFile } from './IPluginDescriptorFile';

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
     * @type {IPlugin[]}
     * @memberof PluginManager
     */
    public plugins: IPlugin[];

    /**
     * The event manager which will be used
     *
     * @private
     * @type {EventManager}
     * @memberof PluginManager
     */
    public eventManager: EventManager;

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
     * The container from the application
     *
     * @private
     * @type {Container}
     * @memberof PluginManager
     */
    private container: Container;

    /**
     * The initialization side
     *
     * @private
     * @memberof PluginManager
     */
    private initializationSide: InitializationSide;

    /**
     * Creates an instance of PluginManager.
     * @param {Logger} logger The logger which should be used from the dependency injection container
     * @memberof PluginManager
     */
    constructor(
        @inject(ContainerConstants.LOGGING.LOGGER)
        logger: Logger,

        @inject(ContainerConstants.SYSTEMS.EVENT.EVENTMANAGER)
        eventManager: EventManager,

        @inject(ContainerConstants.DI.CONTAINER)
        container: Container,

        @inject(ContainerConstants.SYSTEMS.PLUGIN.INITIALIZATIONSIDE)
        initializationSide: InitializationSide,
    ) {
        // Sets the plugin property to an empty array
        this.plugins = [];

        // Sets the logger property to the given logger
        this.logger = logger;

        // Sets the eventManager property to the given event manager
        this.eventManager = eventManager;

        // Set the container
        this.container = container;

        // Set the initialization side
        this.initializationSide = initializationSide;
    }

    /**
     * Loads all plugins from the given directory
     *
     * @param directory The directory where to load the plugins from
     * @memberof PluginManager
     */
    public loadPlugins = (directory: string) => {
        this.eventManager.broadcast(EventsConstants.Plugin.LoadPlugins);

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
            const pluginPath = resolve(
                directory,
                pluginDirectory,
            );

            const fileStats = statSync(pluginPath);

            // Check if the current entry is a directory
            if (!fileStats.isDirectory()) {
                // Current entry is not a directory so we skip it
                continue;
            }

            // Resolves the given parts into a path as string
            const pluginJsonFile = resolve(pluginPath, 'plugin.json');

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

            // The main entry file of the parsed plugin file
            const mainEntry = parsedPluginFile.main;

            // Checks if the main entry is null or undefined
            if (IsNullOrUndefined(mainEntry)) {
                this.logger.debug(
                    `The parsed config key "main" for the plugin ${pluginDirectory} is undefined`,
                );

                continue;
            }

            // Check if the main entry wants try to include a file outside of the plugin directory
            if (mainEntry.includes('..')) {
                this.logger.debug(
                    'The main entry must be located inside in the plugin directory',
                );
            }

            // The plugin structure of the file
            let plugin;

            try {
                // Requires the file which is defined in the "main" key
                plugin = require(
                    resolve(
                        directory,
                        pluginDirectory,
                        mainEntry,
                    ));
            } catch (error) {
                this.logger.error(`Could not require plugin ${pluginDirectory}`, error);

                continue;
            }

            if (typeof plugin.default !== 'function') {
                this.logger.warn(`The default export of the plugin ${pluginDirectory} is not a function`);

                continue;
            }

            this.container.bind(parsedPluginFile.id).to(plugin.default);

            // The plugin instance
            const pluginInstance: IPlugin = this.container.get<IPlugin>(parsedPluginFile.id);

            pluginInstance.id = parsedPluginFile.id;
            pluginInstance.name = parsedPluginFile.name;
            pluginInstance.version = parsedPluginFile.version;
            pluginInstance.author = parsedPluginFile.author;

            try {
                // Trying to call the onInit function of the plugin
                pluginInstance.onInit(
                    this.initializationSide,
                );
            } catch (error) {
                this.logger.error(`Could not call onInit for plugin "${pluginDirectory}"`, error);

                continue;
            }

            // Add the plugin to the managed plugins
            this.plugins.push(pluginInstance);
        }
    }
}
