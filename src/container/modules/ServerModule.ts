import { ContainerModule } from 'inversify';
import { ContainerConstants } from '../../constants/ContainerConstants';
import { TTYLogLevelFormatter } from '../../logger/formatter/TTYLogLevelFormatter';
import { TTYLogger } from '../../logger/TTYLogger';
import { InitializationSide } from '../../plugin/InitializationSide';

export class ServerModule extends ContainerModule {
    constructor() {
        super((bind) => {
            // Set the correct initialization side
            bind(ContainerConstants.SYSTEMS.PLUGIN.INITIALIZATIONSIDE)
                .toConstantValue(InitializationSide.SERVER);

            // Bind the output streams for the TTYLogger
            bind(ContainerConstants.LOGGING.STREAMS.OUT).toConstantValue(process.stdout);
            bind(ContainerConstants.LOGGING.STREAMS.ERROR).toConstantValue(process.stderr);

            // Set the log level formatter to the TTYLogLevelFormatter
            bind(ContainerConstants.LOGGING.FORMATTER.LOGLEVEL).to(TTYLogLevelFormatter);

            // Bind the TTYLogger
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
