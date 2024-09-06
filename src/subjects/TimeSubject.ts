export interface Observer {
    update(seconds: number): void;
}

export class TimeSubject {
    private observers: Observer[] = [];

    public addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    public removeObserver(observer: Observer): void {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    public notifyObservers(): void {
        const now: Date = new Date();
        const seconds: number = now.getSeconds(); // Fetch current seconds from the system clock
        this.observers.forEach(observer => observer.update(seconds));
    }

    public getSeconds(): number {
        const now: Date = new Date();
        return now.getSeconds();
    }

    public start(): void {
        setInterval(() => {
            this.notifyObservers();
        }, 1000);
    }
}
