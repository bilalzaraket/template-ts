import { EditState } from './EditState';
import { WatchController } from '../controllers/WatchController';
import { MinutesEditState } from './MinutesEditState';
import {DigitalWatchView} from '../components/digital/DigitalWatchView';
// Hours can be changed
// next state is minutes can be changed
export class HoursEditState implements EditState {
    public increaseTime(controller: WatchController): void {
        controller.incrementHours();
    }

    public enterEditMode(controller: WatchController): void {
        controller.setEditState(new MinutesEditState());
    }

    updateBlinking(view: DigitalWatchView): void {
        view.toggleBlinking('hours', true);
        view.toggleBlinking('minutes', false);
    }

}