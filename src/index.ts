import './index.css';
import { ClockFactory } from './factories/ClockFactory';
import { TimeSubject } from './subjects/TimeSubject';

const timeSubject = new TimeSubject();
timeSubject.start();

// Initialize the clock factory
const clockFactory = new ClockFactory(timeSubject);

function addDigitalClock() {
    addNewClock(true);
}
function addAnalogClock() {
    addNewClock(false);
}
// Function to create and add a new clock to the DOM
function addNewClock(isDigital: boolean) {
    const clocksContainer = document.getElementById('clocks-container');

    if (clocksContainer) {
        const newClockContainer = document.createElement('div');
        newClockContainer.classList.add('watch-container');

        clocksContainer.appendChild(newClockContainer);

        // Create a new clock instance
        clockFactory.createClock(newClockContainer, new Date().getTimezoneOffset(), true, isDigital);
    } else {
        console.error('Clocks container not found.');
    }
}


const addDigitalClockButton = document.getElementById('add-digital-clock-button');
if (addDigitalClockButton) {
    addDigitalClockButton.addEventListener('click', addDigitalClock);
} else {
    console.error('Add clock button not found.');
}

const addAnalogClockButton = document.getElementById('add-analog-clock-button');
if (addAnalogClockButton) {
    addAnalogClockButton.addEventListener('click', addAnalogClock);
} else {
    console.error('Add clock button not found.');
}
