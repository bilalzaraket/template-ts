export class WatchModel {
    private hours: number;
    private minutes: number;
    private seconds: number;
    private timezoneOffset: number;
    private is24HourFormat: boolean;

    constructor(timezoneOffset: number = new Date().getTimezoneOffset(), is24HourFormat: boolean = true, initialSeconds: number) {
        this.timezoneOffset = timezoneOffset;
        this.is24HourFormat = is24HourFormat;
        const now = new Date();

        this.seconds = initialSeconds !== undefined ? initialSeconds : now.getUTCSeconds();

        this.setTime(now);
    }

    public getTime() : [number, number, number, boolean] {
        return [this.hours, this.minutes, this.seconds, this.is24HourFormat]
    }

    public setTimeZoneOffset(timezoneOffset: number): void {
        this.setTimeUsingTimeZoneOffset(timezoneOffset);
    }

    public setIs24HourFormat(is24Hour: boolean): void {
        this.is24HourFormat = is24Hour;
    }

    public setHours(hours: number): void {
        this.hours = hours % 24;
    }

    public setMinutes(minutes: number): void {
        this.minutes = minutes % 60;
    }

    public setSeconds(seconds: number): void {
        if (seconds >= 0 && seconds < 60) {
            this.seconds = seconds;
        } else if (seconds === 60) {
            this.seconds = 0;
            this.incrementMinutes();
        } else {
            console.warn("Invalid seconds value. It must be between 0 and 60.");
        }
    }


    

    public incrementHours(): void {
        this.hours = (this.hours + 1) % 24;
    }

    public incrementMinutes(): void {
        this.minutes++;
        if(this.minutes === 60) {
            this.minutes = 0;
            this.incrementHours();
        }
    }

    public incrementSeconds(): void {
        this.seconds++;
        if(this.seconds === 60) {
            this.seconds = 0;
            this.incrementMinutes();
        }
    }

    public getHours(): number {
        return this.hours;
    }

    public getMinutes(): number {
        return this.minutes;
    }

    public getSeconds(): number {
        return this.seconds;
    }

    public getIs24HourFormat(): boolean {
        return this.is24HourFormat;
    }

    public getTimeZoneOffset(): number {
        return this.timezoneOffset;
    }

    public toggleFormat(): void {
        this.is24HourFormat = !this.is24HourFormat;
    }

    public resetToCurrentTime(): void {
        const now = new Date();
        this.setTimeUsingTimeZoneOffset(this.getTimeZoneOffset());
    }

    private setTime(date: Date): void {
        this.hours = (date.getUTCHours() - Math.floor(this.timezoneOffset / 60) + 24) % 24;
        this.minutes = date.getUTCMinutes();
    }

    private setTimeUsingTimeZoneOffset(timezoneOffset: number): void {
        this.timezoneOffset = timezoneOffset;
        const now = new Date();
        this.hours = (now.getUTCHours() - Math.floor(this.timezoneOffset / 60) + 24) % 24;

        this.minutes = now.getUTCMinutes();
    }
}