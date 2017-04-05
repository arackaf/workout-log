import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';
import TagStore from './tagStore';

class WorkoutTagStore extends TagStore {
    constructor() {
        super('/tag/workout');
    }
}

export default new WorkoutTagStore();