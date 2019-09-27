import { ContainerModule } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { TTYLogger } from '../logger/TTYLogger';
import { InitializationSide } from '../plugin/InitializationSide';

export class ServerModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.SYSTEMS.PLUGIN.INITIALIZATIONSIDE)
                .toConstantValue(InitializationSide.SERVER);
            bind(ContainerConstants.LOGGING.LOGGER).to(TTYLogger).onActivation((context) => {
                const logger = new TTYLogger(
                    context.container.get(ContainerConstants.LOGGING.STREAMS.OUT),
                    context.container.get(ContainerConstants.LOGGING.STREAMS.ERROR),
                    context.container.get(ContainerConstants.LOGGING.LOGLEVEL),
                    context.container.get(ContainerConstants.LOGGING.FORMATTER.DATETIME),
                    context.container.get(ContainerConstants.LOGGING.FORMATTER.LOGLEVEL),
                );

                if (
                    context.currentRequest.parentRequest !== null
                    && context.currentRequest.parentRequest.parentRequest !== null
                ) {
                    // tslint:disable-next-line: no-any
                    const implementationType: any = context.currentRequest
                        .parentRequest.parentRequest.bindings[0].implementationType;

                    logger.className = implementationType.name;
                }

                return logger;
            });
        });
    }
}
