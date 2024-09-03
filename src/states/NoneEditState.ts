import { EditState } from './EditState';
import { WatchController } from '../controllers/WatchController';
import { HoursEditState } from './HoursEditState';
import { DigitalWatchView } from '../components/digital/DigitalWatchView';

// initial state, nothing could be changed
export class NoneEditState implements EditState {
    public increaseTime(controller: WatchController): void {
        // No action in NoneEdit mode
    }

    public enterEditMode(controller: WatchController): void {
        controller.setEditState(new HoursEditState());
    }

    updateBlinking(view: DigitalWatchView): void {
        view.toggleBlinking('hours', false);
        view.toggleBlinking('minutes', false);
    }
}