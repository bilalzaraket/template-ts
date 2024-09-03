export interface WatchService {
    incrementHours(): void;
    incrementMinutes(): void;
    toggleFormat(): void;
    resetToCurrentTime(): void;
    setTimeZoneOffset(offset: number): void;
    getCurrentTime(): [number, number, number, boolean];
}
