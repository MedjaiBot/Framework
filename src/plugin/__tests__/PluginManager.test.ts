import 'reflect-metadata';
import { PluginManager } from '../PluginManager';

describe('PluginManager', () => {
    let pluginManager: PluginManager;
    let loggerMock: any;

    beforeEach(() => {
        loggerMock = jest.mock('../../logger/Logger');
        pluginManager = new PluginManager(
            loggerMock,
        );
    });

    it('should initialize the plugins property correctly', () => {
        expect(pluginManager.plugins).toHaveLength(0);
    });
});
