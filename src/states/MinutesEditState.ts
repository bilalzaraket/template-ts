import { EditState } from './EditState';
import { WatchController } from '../controllers/WatchController';
import { NoneEditState } from './NoneEditState';
import { DigitalWatchView } from '../components/digital/DigitalWatchView';
// State when minutes can be changed
export class MinutesEditState implements EditState {
    public increaseTime(controller: WatchController): void {
        controller.incrementMinutes();
    }

    public enterEditMode(controller: WatchController): void {
        controller.setEditState(new NoneEditState());
    }

    updateBlinking(view: DigitalWatchView): void {
        view.toggleBlinking('minutes', true);
        view.toggleBlinking('hours', false);
    }
}