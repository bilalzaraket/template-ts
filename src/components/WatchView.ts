export abstract class WatchView {
    protected background: HTMLElement;
    protected removeButton: HTMLButtonElement;

    constructor(containerId: string) {
        const container = document.getElementById(containerId);
        if (container) {
            this.background = container;
            this.background.className = "watch-container";
            this.removeButton = this.createButton('X', containerId);
            this.background.appendChild(this.removeButton);
        } else {
            throw new Error(`Container with ID ${containerId} not found`);
        }
    }

    // Abstract method to update time, must be implemented by subclasses
    public abstract updateTime([hours, minutes, seconds, is24HourFormat]: [number, number, number, boolean]): void;

    // Remove the background element from the DOM
    public removeBackground(): void {
        this.background.remove();
    }

    // Get the remove button element
    public getRemoveButton(): HTMLButtonElement {
        return this.removeButton;
    }

    // Helper method to create a button element
    protected createButton(label: string, containerId: string): HTMLButtonElement {
        const button = this.createElement('button', `${label}-button-${containerId}`) as HTMLButtonElement;
        button.className = label;
        button.innerText = label;
        return button;
    }

    // Helper method to create an element with an optional ID
    protected createElement(tagName: string, id?: string): HTMLElement {
        const element = document.createElement(tagName);
        if (id) {
            element.id = id;
        }
        return element;
    }
}
