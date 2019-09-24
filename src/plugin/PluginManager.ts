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
        for (const pluginDirectory of pluginDirectories) {
            const pluginPath = resolve(
                directory,
                pluginDirectory,
            );

            // Check if the current entry is a directory
            if (!this.checkIfIsDirectory(pluginPath)) {
                // Current entry is not a directory so we skip it
                continue;
            }

            let parsedPluginFile: IPluginDescriptorFile;

            try {
                // Parses the the contents of plugin.json file as JSON
                parsedPluginFile = this.getPluginDescriptorFile(pluginPath);
            } catch (error) {
                this.logger.error('Could not parse the plugin.json', error);

                continue;
            }

            // The main entry file of the parsed plugin file
            let mainEntry: string;

            try {
                mainEntry = this.getMainEntry(parsedPluginFile);
            } catch (error) {
                this.logger.error(
                    `Could not get the main entry for plugin ${pluginPath}`,
                    error,
                );

                continue;
            }

            const mainEntryPath = resolve(directory, pluginDirectory, mainEntry);
            let plugin;

            try {
                plugin = this.requirePlugin(mainEntryPath);
            } catch (error) {
                this.logger.error(
                    `Could not get the export of the plugin in the directory ${pluginPath}`,
                    error,
                );

                continue;
            }

            const pluginInstance = this.getPluginInstance(
                parsedPluginFile,
                plugin,
            );

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

    /**
     * Checks if the given path is a directory
     *
     * @private
     * @param {string} path The path to check
     * @returns {boolean} True when the path is a directory. Otherwise false.
     * @memberof PluginManager
     */
    private checkIfIsDirectory(path: string): boolean {
        const pathStats = statSync(path);

        return pathStats.isDirectory();
    }

    /**
     * Returns the parsed plugin.json contents when the file exists.
     *
     * @private
     * @param {string} pluginPath The path to the plugin
     * @returns {IPluginDescriptorFile} The parsed plugin description file
     * @memberof PluginManager
     * @throws When the plugin.json file not exists
     * @throws When the file contents could not be read
     * @throws When the parsed content is not valid
     */
    private getPluginDescriptorFile(pluginPath: string): IPluginDescriptorFile {
        const pluginDescriptorFile = resolve(
            pluginPath,
            'plugin.json',
        );

        if (!existsSync(pluginPath)) {
            throw new Error(`Plugin directory ${pluginPath} does not contain a plugin.json. Skipping plugin.`);
        }

        // The loaded plugin.json file contents
        let pluginFileContents;

        try {
            pluginFileContents = readFileSync(pluginDescriptorFile).toString();
        } catch (error) {
            throw new Error(`Could not read the contents of the plugin.json file: ${error}`);
        }

        // Parses the the contents of plugin.json file as JSON
        const descriptorFile: IPluginDescriptorFile = JSON.parse(pluginFileContents);

        this.validateDescriptorFile(descriptorFile);

        return descriptorFile;
    }

    /**
     * Validates an IPluginDescriptorFile
     *
     * @private
     * @param {IPluginDescriptorFile} descriptorFile The descriptor file to validate
     * @memberof PluginManager
     * @throws When the id is not defined
     * @throws When the name is not defined
     * @throws When the version is not defined
     * @throws When the author is not defined
     * @throws When the main entry is not defined
     */
    private validateDescriptorFile(descriptorFile: IPluginDescriptorFile) {
        if (IsNullOrUndefined(descriptorFile.id)) {
            throw new Error('The id is not defined');
        }

        if (IsNullOrUndefined(descriptorFile.name)) {
            throw new Error('The name is not defined');
        }

        if (IsNullOrUndefined(descriptorFile.version)) {
            throw new Error('The version is not defined');
        }

        if (IsNullOrUndefined(descriptorFile.author)) {
            throw new Error('The author is not defined');
        }

        if (IsNullOrUndefined(descriptorFile.main)) {
            throw new Error('The main entry is not defined');
        }
    }

    /**
     * Returns the main entry for the plugin
     *
     * @param pluginDescription The instance of the IPluginDescriptorFile
     */
    private getMainEntry(pluginDescription: IPluginDescriptorFile): string {
        const mainEntry = pluginDescription.main;

        // Check if the main entry wants try to include a file outside of the plugin directory
        if (mainEntry.includes('..')) {
            throw new Error(
                'The main entry must be located inside in the plugin directory',
            );
        }

        return mainEntry;
    }

    /**
     * Loads the main entry point of a plugin
     * and returns the export of the file
     *
     * @private
     * @param {string} mainEntryPath The main entry path to the plugin file
     * @returns {() => IPlugin} The loaded instance of the plugin
     * @memberof PluginManager
     */
    private requirePlugin(mainEntryPath: string): any {
        // The plugin structure of the file
        let pluginFunction;

        try {
            // Requires the file which is defined in the "main" key
            pluginFunction = require(mainEntryPath);
        } catch (error) {
            throw error;
        }

        // Check if the default export is a function
        if (typeof pluginFunction.default !== 'function') {
            throw new Error('The default export is not a function');
        }

        return pluginFunction;
    }

    /**
     * Returns an plugin instance which was created with
     * the help of the dependency injection container
     *
     * @private
     * @param {IPluginDescriptorFile} parsedPluginFile The plugin descriptor file
     * @param {*} plugin The loaded main entry file of the plugin
     * @returns {IPlugin} The created plugin instance
     * @memberof PluginManager
     */
    private getPluginInstance(
        parsedPluginFile: IPluginDescriptorFile,
        plugin: any,
    ): IPlugin {
        const pluginId = parsedPluginFile.id;

        // Binds the plugin to the dependency injection container
        this.container.bind(pluginId).to(plugin.default);

        // The plugin instance
        const pluginInstance: IPlugin = this.container.get<IPlugin>(
            pluginId,
        );

        pluginInstance.id = pluginId;
        pluginInstance.name = parsedPluginFile.name;
        pluginInstance.version = parsedPluginFile.version;
        pluginInstance.author = parsedPluginFile.author;

        return pluginInstance;
    }
}
