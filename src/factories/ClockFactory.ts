import { WatchModel } from '../models/WatchModel';
import { WatchView } from '../components/WatchView';
import { WatchController } from '../controllers/WatchController';
import { TimeSubject } from '../subjects/TimeSubject';
import { DigitalWatchView } from '../components/digital/DigitalWatchView';
import { AnalogWatchView } from '../components/analog/AnalogWatchView';

export class ClockFactory {
    private containerIdCounter: number = 0;
    private timeSubject: TimeSubject;

    /**
     * Initializes the ClockFactory with a TimeSubject.
     * @param timeSubject - The TimeSubject used for clock updates.
     */
    constructor(timeSubject: TimeSubject) {
        this.timeSubject = timeSubject;
    }

    /**
     * Creates a new clock and its associated controller.
     * @param container - The container element where the clock will be rendered.
     * @param timezoneOffset - The timezone offset in minutes (default is the system's current timezone offset).
     * @param is24HourFormat - Boolean indicating if the time should be displayed in 24-hour format (default is true).
     * @param isDigital - Boolean indicating if the clock should be a digital or analog watch (default is true for digital).
     * @returns A WatchController instance managing the new clock.
     */
    public createClock(
        container: HTMLElement,
        timezoneOffset: number = new Date().getTimezoneOffset(),
        is24HourFormat: boolean = true,
        isDigital: boolean = true
    ): WatchController {
        // Create a unique ID for the clock container
        const containerId = `clock-container-${this.containerIdCounter++}`;
        container.id = containerId;

        // Create instances of model, view, and controller
        const model = new WatchModel(timezoneOffset, is24HourFormat, this.timeSubject.getSeconds());
        const view = this.createWatchView(containerId, isDigital);
        const controller = new WatchController(model, view, this.timeSubject);

        // Register the controller as an observer of the time subject
        this.timeSubject.addObserver(controller);

        return controller;
    }

    /**
     * Creates a WatchView instance based on the specified type.
     * @param containerId - The unique ID for the container.
     * @param isDigital - Boolean indicating if the view should be a DigitalWatchView or AnalogWatchView.
     * @returns A WatchView instance (either DigitalWatchView or AnalogWatchView).
     */
    private createWatchView(containerId: string, isDigital: boolean): WatchView {
        if (isDigital) {
            return new DigitalWatchView(containerId);
        } else {
            return new AnalogWatchView(containerId);
        }
    }
}
