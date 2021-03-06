import 'reflect-metadata';
import { InitializationSide } from '../InitializationSide';
import { PluginManager } from '../PluginManager';

describe('PluginManager', () => {
    let pluginManager: PluginManager;
    let loggerMock: any;
    let eventManagerMock: any;
    let containerMock: any;

    beforeEach(() => {
        loggerMock = jest.mock('../../logger/Logger');
        eventManagerMock = jest.mock('../../event/EventManager');
        containerMock = jest.mock('inversify');

        pluginManager = new PluginManager(
            loggerMock,
            eventManagerMock,
            containerMock,
            InitializationSide.SERVER,
        );
    });

    it('should initialize the plugins property correctly', () => {
        expect(pluginManager.plugins).toHaveLength(0);
    });
});
