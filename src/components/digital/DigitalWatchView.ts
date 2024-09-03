import { WatchView } from "../WatchView";

export class DigitalWatchView extends WatchView {
    private timeDisplay: HTMLElement;
    private hoursElement: HTMLElement;
    private minutesElement: HTMLElement;
    private secondsElement: HTMLElement;
    private periodElement: HTMLElement;

    private modeButton: HTMLButtonElement;
    private increaseButton: HTMLButtonElement;
    private lightButton: HTMLButtonElement;
    private amPmButton: HTMLButtonElement;
    private resetButton: HTMLButtonElement;
    private timezoneSelect: HTMLSelectElement;

    private colors: { light: string, dark: string } = {
        light: '#FBE106', // Yellow
        dark: '#FFFFFF'   // White
    };

    private currentColor: string = this.colors.light;

    constructor(containerId: string) {
        super(containerId);
        if (this.background) {
            this.background.style.backgroundColor = this.currentColor;
            this.initializeUI(containerId);
        } else {
            throw new Error(`Container with ID ${containerId} not found`);
        }
    }

    // Set the timezone select value based on provided value
    public setTimeZoneSelect(value: number): void {
        const option = this.timezoneSelect.querySelector(`option[value='${value}']`);
        if (option) {
            this.timezoneSelect.value = value.toString();
        }
    }

    // Initialize the UI components for the digital watch
    private initializeUI(containerId: string): void {
        this.initializeTimeDisplay(containerId);
        this.initializeButtons(containerId);
    }

    // Initialize time display elements
    private initializeTimeDisplay(containerId: string): void {
        this.timeDisplay = document.createElement('div');
        this.timeDisplay.id = `time-display-${containerId}`;
        this.timeDisplay.className = 'time-display';

        this.hoursElement = this.createTimeElement('hours', containerId);
        this.minutesElement = this.createTimeElement('minutes', containerId);
        this.secondsElement = this.createTimeElement('seconds', containerId);
        this.periodElement = this.createTimeElement('period', containerId);
        
        this.timeDisplay.appendChild(this.hoursElement);
        this.timeDisplay.appendChild(document.createTextNode(':'));
        this.timeDisplay.appendChild(this.minutesElement);
        this.timeDisplay.appendChild(document.createTextNode(':'));
        this.timeDisplay.appendChild(this.secondsElement);
        this.timeDisplay.appendChild(this.periodElement);
        this.background.appendChild(this.timeDisplay);
    }

    // Initialize buttons and timezone select dropdown
    private initializeButtons(containerId: string): void {
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons-container';

        this.modeButton = this.createButton('Mode', containerId);
        this.increaseButton = this.createButton('Increase', containerId);
        this.lightButton = this.createButton('Light', containerId);
        this.amPmButton = this.createButton('AM/PM', containerId);
        this.resetButton = this.createButton('Reset', containerId);

        this.timezoneSelect = this.createTimeZoneSelect();

        buttonsContainer.appendChild(this.modeButton);
        buttonsContainer.appendChild(this.increaseButton);
        buttonsContainer.appendChild(this.lightButton);
        buttonsContainer.appendChild(this.amPmButton);
        buttonsContainer.appendChild(this.resetButton);
        buttonsContainer.appendChild(this.timezoneSelect);

        this.background.appendChild(buttonsContainer);
    }

    // Create the timezone select dropdown with options
    private createTimeZoneSelect(): HTMLSelectElement {
        const select = document.createElement('select');
        for (let i = -12; i <= 12; i++) {
            const option = document.createElement('option');
            option.value = i.toString();
            option.text = `GMT${i >= 0 ? '+' : ''}${i}`;
            select.appendChild(option);
        }
        return select;
    }

    // Create a time element (hours, minutes, seconds, period) for display
    private createTimeElement(type: string, containerId: string): HTMLElement {
        return this.createElement('span', `${type}-${containerId}`);
    }

    // Update time display elements based on provided time
    public updateTime([hours, minutes, seconds, is24HourFormat]: [number, number, number, boolean]): void {
        let displayHours = hours;
        let period = '';

        this.periodElement.textContent = '';

        if (!is24HourFormat) {
            period = hours >= 12 ? ' PM' : ' AM';
            displayHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM
            this.periodElement.textContent = period;
        }

        this.hoursElement.textContent = this.format(displayHours);
        this.minutesElement.textContent = this.format(minutes);
        this.secondsElement.textContent = this.format(seconds);
    }

    // Toggle between light and dark background colors
    public toggleBackgroundColor(): void {
        this.currentColor = this.currentColor === this.colors.light ? this.colors.dark : this.colors.light;
        this.background.style.backgroundColor = this.currentColor;
    }

    // Toggle blinking effect on specified time element
    public toggleBlinking(part: 'hours' | 'minutes', blink: boolean): void {
        const element = part === 'hours' ? this.hoursElement : this.minutesElement;
        element.classList.toggle('blinking', blink);
    }

    // Format time values to ensure two digits
    private format(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    // Getters for UI elements
    public getModeButton(): HTMLButtonElement {
        return this.modeButton;
    }

    public getIncreaseButton(): HTMLButtonElement {
        return this.increaseButton;
    }

    public getLightButton(): HTMLButtonElement {
        return this.lightButton;
    }

    public getAmPmButton(): HTMLButtonElement {
        return this.amPmButton;
    }

    public getResetButton(): HTMLButtonElement {
        return this.resetButton;
    }

    public getTimezoneSelect(): HTMLSelectElement {
        return this.timezoneSelect;
    }
}
