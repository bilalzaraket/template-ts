import { WatchModel } from '../models/WatchModel';
import { WatchService } from './WatchService';

export class WatchServiceImpl implements WatchService {
    private model: WatchModel;

    constructor(model: WatchModel) {
        this.model = model;
    }

    public incrementHours(): void {
        this.model.incrementHours();
    }

    public incrementMinutes(): void {
        this.model.incrementMinutes();
    }

    public toggleFormat(): void {
        this.model.toggleFormat();
    }

    public resetToCurrentTime(): void {
        this.model.resetToCurrentTime();
    }

    public setTimeZoneOffset(offset: number): void {
        this.model.setTimeZoneOffset(offset);
    }

    public getCurrentTime(): [number, number, number, boolean] {
        return this.model.getTime();
    }
}
