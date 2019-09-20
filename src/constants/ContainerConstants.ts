export const ContainerConstants = {
    LOGGING: {
        FORMATTER: {
            DATETIME: Symbol.for('System.Logging.Formatter.DateTime'),
            LOGLEVEL: Symbol.for('System.Logging.Formatter.LogLevel'),
        },
        LOGGER: Symbol.for('System.Logging.Logger'),
        LOGLEVEL: Symbol.for('System.Loggin.Loglevel'),
        STREAMS: {
            OUT: Symbol.for('System.Logging.Streams.Out'),
            ERROR: Symbol.for('System.Logging.Streams.Error'),
        },
    },

    DI: {
        CONTAINER: Symbol.for('System.Container'),
    },

    SYSTEMS: {
        PLUGIN: {
            PLUGINMANAGER: Symbol.for('System.Systems.Plugin.PluginManager'),
            INITIALIZATIONSIDE: Symbol.for('System.Systems.Plugin.InitializationSide'),
        },

        EVENT: {
            EVENTMANAGER: Symbol.for('System.Systems.Event.EventManager'),
        },
    },
};
