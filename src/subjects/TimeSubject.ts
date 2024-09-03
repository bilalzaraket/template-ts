export interface Observer {
    update(seconds: number): void;
}

export class TimeSubject {
    private observers: Observer[] = [];
    private seconds: number;

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this.seconds));
    }

    public start(): void {
        const now: Date = new Date();
        this.seconds = now.getSeconds();
        setInterval(() => {
            this.incrementTime();
            this.notifyObservers();
        }, 1000);
    }

    public getSeconds(): number {
        return this.seconds;
    }

    private incrementTime(): void {
        if (this.seconds >= 60) {
            this.seconds = 0;
        }
        this.seconds++;
    }
}
