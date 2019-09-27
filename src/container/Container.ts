import { Container } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { InitializationSide } from '../plugin/InitializationSide';
import { ClientModule } from './modules/ClientModule';
import { EventModule } from './modules/EventModule';
import { LoggerModule } from './modules/LoggerModule';
import { PluginModule } from './modules/PluginModule';
import { ServerModule } from './modules/ServerModule';

export const applicationContainer = new Container();

export const GetPreconfiguredContainer = (
    initializationSide: InitializationSide,
): Container => {
    applicationContainer.load(new LoggerModule());
    applicationContainer.load(new EventModule());
    applicationContainer.load(new PluginModule());

    switch (initializationSide) {
        case InitializationSide.SERVER:
            applicationContainer.load(new ServerModule());
            break;
        case InitializationSide.CLIENT:
            applicationContainer.load(new ClientModule());
            break;
    }

    applicationContainer.bind(ContainerConstants.DI.CONTAINER).toConstantValue(applicationContainer);

    return applicationContainer;
};
