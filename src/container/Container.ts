import { Container } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { InitializationSide } from '../plugin/InitializationSide';
import { ClientModule } from './ClientModule';
import { EventModule } from './EventModule';
import { LoggerModule } from './LoggerModule';
import { PluginModule } from './PluginModule';
import { ServerModule } from './ServerModule';

const container = new Container();

export const GetPreconfiguredContainer = (
    initializationSide: InitializationSide,
) => {
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
};
