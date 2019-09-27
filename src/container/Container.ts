import { Container } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { InitializationSide } from '../plugin/InitializationSide';
import { ClientModule } from './modules/ClientModule';
import { EventModule } from './modules/EventModule';
import { LoggerModule } from './modules/LoggerModule';
import { PluginModule } from './modules/PluginModule';
import { ServerModule } from './modules/ServerModule';

const container = new Container();

export const GetPreconfiguredContainer = (
    initializationSide: InitializationSide,
): Container => {
    container.load(new LoggerModule());
    container.load(new EventModule());
    container.load(new PluginModule());

    container.bind(ContainerConstants.DI.CONTAINER).toConstantValue(container);

    switch (initializationSide) {
        case InitializationSide.SERVER:
            container.load(new ServerModule());
            break;
        case InitializationSide.CLIENT:
            container.load(new ClientModule());
            break;
    }

    return container;
};
