import { WatchController } from "../controllers/WatchController";
import { WatchView } from "../components/WatchView";
export interface EditState {
    increaseTime(service: WatchController): void;
    enterEditMode(controller: WatchController): void;
    updateBlinking(view: WatchView): void;
}