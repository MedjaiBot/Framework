export const ContainerConstants = {
    LOGGING: {
        LOGGER: Symbol.for('System.Logging.Logger'),
        LOGLEVEL: Symbol.for('System.Loggin.Loglevel'),
        STREAMS: {
            OUT: Symbol.for('Systen.Logging.Streams.Out'),
            ERROR: Symbol.for('Systen.Logging.Streams.Error'),
        },
    },

    CONTAINER: Symbol.for('System.Container'),

    SYSTEMS: {
        PLUGIN: {
            PLUGINMANAGER: Symbol.for('System.Systems.Plugin.PluginManager'),
        },

        EVENT: {
            EVENTMANAGER: Symbol.for('System.Systems.Event.EventManager'),
        },
    },
};
