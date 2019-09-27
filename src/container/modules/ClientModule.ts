import { ContainerModule } from 'inversify';
import { ContainerConstants } from '../../constants/ContainerConstants';
import { WebLogger } from '../../logger/WebLogger';
import { InitializationSide } from '../../plugin/InitializationSide';

export class ClientModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.SYSTEMS.PLUGIN.INITIALIZATIONSIDE)
                .toConstantValue(InitializationSide.CLIENT);
            bind(ContainerConstants.LOGGING.LOGGER).to(WebLogger).onActivation((context) => {
                const logger = new WebLogger(
                    context.container.get(ContainerConstants.LOGGING.FORMATTER.DATETIME),
                );

                if (
                    context.currentRequest.parentRequest !== null
                ) {
                    // tslint:disable-next-line: no-any
                    const implementationType: any = context.currentRequest
                        .parentRequest.bindings[0].implementationType;

                    logger.className = implementationType.name;
                }

                return logger;
            });
        });
    }
}
