import { WatchView } from '../WatchView';
import './analog-watch.css';  // Import CSS for the analog watch

export class AnalogWatchView extends WatchView {
    private hourHand: HTMLElement;
    private minuteHand: HTMLElement;
    private secondHand: HTMLElement;

    constructor(containerId: string) {
        super(containerId);
        if (this.background) {
            this.initializeAnalogClock();
        } else {
            throw new Error(`Container with ID ${containerId} not found`);
        }
    }

    public toggleBackgroundColor(): void {
        // No need for now
    }

    // Initialize the analog clock's face and hands
    private initializeAnalogClock(): void {
        const clockFace = document.createElement('div');
        clockFace.className = 'clock-face';

        // Create and append clock hands
        this.hourHand = this.createHand('hour-hand');
        this.minuteHand = this.createHand('minute-hand');
        this.secondHand = this.createHand('second-hand');

        clockFace.appendChild(this.hourHand);
        clockFace.appendChild(this.minuteHand);
        clockFace.appendChild(this.secondHand);

        // Create and append clock numbers
        for (let i = 1; i <= 12; i++) {
            const number = document.createElement('div');
            number.className = `number number${i}`;
            number.textContent = i.toString();
            clockFace.appendChild(number);
        }

        this.background.appendChild(clockFace);
    }

    // Create a clock hand element with a specific class
    private createHand(className: string): HTMLElement {
        const hand = document.createElement('div');
        hand.className = `hand ${className}`;
        return hand;
    }

    // Update clock hands based on provided time
    public updateTime([hours, minutes, seconds, is24HourFormat]: [number, number, number, boolean]): void {
        // Convert time to degrees and update hands
        const hoursDegrees = ((hours % 12) + minutes / 60) * 30 - 90; // 30 degrees per hour + minute contribution
        const minutesDegrees = minutes * 6 - 90; // 6 degrees per minute
        const secondsDegrees = seconds * 6 - 90; // 6 degrees per second

        this.updateHand(this.hourHand, hoursDegrees);
        this.updateHand(this.minuteHand, minutesDegrees);
        this.updateHand(this.secondHand, secondsDegrees);
    }

    // Apply rotation transformation to a clock hand
    private updateHand(hand: HTMLElement, degrees: number): void {
        const radians = degrees * (Math.PI / 180);
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);

        // Create a transformation matrix for rotation
        const matrix = [cos, sin, -sin, cos, 0, 0];

        // Apply the matrix to the hand element
        hand.style.transform = `matrix(${matrix.join(',')})`;
    }
}

/**
 * Creates a 2D transformation matrix.
 * @param a - Horizontal scaling and rotation
 * @param b - Vertical skewing
 * @param c - Horizontal skewing
 * @param d - Vertical scaling and rotation
 */
function createMatrix(a: number, b: number, c: number, d: number): number[] {
    return [a, b, c, d];
}

/**
 * Applies a 2D transformation matrix to a point.
 * @param matrix - The transformation matrix
 * @param x - The x coordinate of the point
 * @param y - The y coordinate of the point
 * @returns The transformed point coordinates
 */
function applyMatrix(matrix: number[], x: number, y: number): [number, number] {
    const [a, b, c, d] = matrix;
    const newX = a * x + b * y;
    const newY = c * x + d * y;
    return [newX, newY];
}
