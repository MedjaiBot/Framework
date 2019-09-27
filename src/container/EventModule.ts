import { ContainerModule } from 'inversify';
import { ContainerConstants } from '../constants/ContainerConstants';
import { EventManager } from '../event/EventManager';

export class EventModule extends ContainerModule {
    constructor() {
        super((bind) => {
            bind(ContainerConstants.SYSTEMS.EVENT.EVENTMANAGER).to(EventManager);
        });
    }
}
