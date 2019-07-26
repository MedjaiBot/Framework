import { Container } from 'inversify';
import { InitializationSide } from './InitializationSide';

export interface IInitializationContext {
    /**
     * Defines the side where the plugin is initialized
     *
     * @type {InitializationSide}
     * @memberof InitializationContext
     */
    initializationSide: InitializationSide;

    /**
     * The container from the server
     *
     * @type {Container}
     * @memberof InitializationContext
     */
    container: Container;
}
