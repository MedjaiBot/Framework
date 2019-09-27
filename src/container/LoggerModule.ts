import { ContainerModule } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { DateTimeFormatter } from '../logger/formatter/DateTimeFormatter';
import { LogLevel } from '../logger/LogLevel';

export class LoggerModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.LOGGING.LOGLEVEL).toConstantValue(LogLevel.DEBUG);
            bind(ContainerConstants.LOGGING.FORMATTER.DATETIME).to(DateTimeFormatter);
        });
    }

}
