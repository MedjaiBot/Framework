import { ContainerModule } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { PluginManager } from '../plugin/PluginManager';

export class PluginModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.SYSTEMS.PLUGIN.PLUGINMANAGER).to(PluginManager);
        });
    }
}
