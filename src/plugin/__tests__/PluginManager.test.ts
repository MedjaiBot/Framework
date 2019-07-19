import 'reflect-metadata';
import { PluginManager } from '../PluginManager';

describe('PluginManager', () => {
    let pluginManager: PluginManager;
    let loggerMock: any;
    let eventManagerMock: any;

    beforeEach(() => {
        loggerMock = jest.mock('../../logger/Logger');
        eventManagerMock = jest.mock('../../event/EventManager');
        pluginManager = new PluginManager(
            loggerMock,
            eventManagerMock,
        );
    });

    it('should initialize the plugins property correctly', () => {
        expect(pluginManager.plugins).toHaveLength(0);
    });
});
