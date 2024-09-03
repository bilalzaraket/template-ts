import { WatchModel } from '../models/WatchModel';
import { WatchView } from '../components/WatchView';
import { Observer, TimeSubject } from '../subjects/TimeSubject';
import { DigitalWatchView } from '../components/digital/DigitalWatchView';
import { EditState } from '../states/EditState';
import { NoneEditState } from '../states/NoneEditState';

export class WatchController implements Observer {
    private model: WatchModel;
    private view: WatchView;
    private editState: EditState;
    private timeSubject: TimeSubject;

    constructor(model: WatchModel, view: WatchView, timeSubject: TimeSubject) {
        this.model = model;
        this.view = view;
        this.editState = new NoneEditState(); // Default state when controller is initialized
        this.timeSubject = timeSubject;
        this.init();
    }

    // Initialize the controller: start the clock and set up event listeners
    private init(): void {
        this.startClock();
        this.setupEventListeners();
    }

    // Start the clock by updating the view with the current time from the model
    private startClock(): void {
        this.view.updateTime(this.model.getTime());
    }

    // Set up event listeners for all interactive elements in the view
    private setupEventListeners(): void {
        this.view.getRemoveButton().addEventListener('click', () => this.removeClock());
        
        if (this.view instanceof DigitalWatchView) {
            // Add event listeners for digital watch specific buttons
            this.view.getIncreaseButton().addEventListener('click', () => this.increaseTime());
            this.view.getModeButton().addEventListener('click', () => this.toggleEditMode());
            this.view.getLightButton().addEventListener('click', () => (this.view as DigitalWatchView).toggleBackgroundColor());
            this.view.getAmPmButton().addEventListener('click', () => this.toggleTimeFormat());
            this.view.getResetButton().addEventListener('click', () => this.resetToCurrentTime());
            this.view.getTimezoneSelect().addEventListener('change', (e) => this.changeTimeZone(e));
        }
    }

    // Remove the clock from the view and stop observing time updates
    private removeClock(): void {
        this.view.removeBackground(); // Remove the clock display from the view
        this.timeSubject.removeObserver(this); // Stop receiving updates from the time subjecnt
        // If necessary, I would clean up references
    }

    // Update the model with the new timezone offset and refresh the view
    private changeTimeZone(event: Event): void {
        const selectElement = event.target as HTMLSelectElement;
        const timezoneOffset = -parseInt(selectElement.value, 10) * 60; // Convert selected value to minutes
        if (!isNaN(timezoneOffset)) {
            this.model.setTimeZoneOffset(timezoneOffset);
            this.view.updateTime(this.model.getTime());
        } else {
            console.error('Invalid timezone offset'); // Log an error if the timezone offset is invalid
        }
    }

    // Toggle between 12-hour and 24-hour time formats
    private toggleTimeFormat(): void {
        this.model.toggleFormat();
        this.view.updateTime(this.model.getTime());
    }

    // Reset the watch to the current system time
    private resetToCurrentTime(): void {
        this.model.resetToCurrentTime();
        this.view.updateTime(this.model.getTime());
    }

    // Increment the time based on the current edit mode
    private increaseTime(): void {
        this.editState.increaseTime(this); // Delegate time increment operation to the current edit state
        this.view.updateTime(this.model.getTime());
    }

    // Toggle the edit mode state and update the blinking indication
    private toggleEditMode(): void {
        this.editState.enterEditMode(this); // Transition to the next edit mode state
        if (this.view instanceof DigitalWatchView) {
            this.updateBlinking(); // Update blinking indicators based on the current edit mode
        }
    }

    // Update the blinking indicators in the view based on the current edit mode
    private updateBlinking(): void {
        this.editState.updateBlinking(this.view); // Delegate the blinking update to the current edit state
    }

    // Handle updates from the time subject: update the model and view with new seconds
    public update(seconds: number): void {
        this.model.setSeconds(seconds);
        this.view.updateTime(this.model.getTime());
    }

    // State transition methods for modifying the model
    public incrementHours(): void {
        this.model.incrementHours();
    }

    public incrementMinutes(): void {
        this.model.incrementMinutes();
    }

    // Update the current edit state
    public setEditState(state: EditState): void {
        this.editState = state;
    }
}
