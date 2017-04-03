import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';
import TagStore from './tagStore';

class WorkoutTagStore extends TagStore {
    constructor() {
        super();
        ajaxUtil.get('/tag/workout').then(resp => {
            super.setTags(resp.tags);
        })
    }
}

export default new WorkoutTagStore();