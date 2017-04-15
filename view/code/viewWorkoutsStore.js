import {action, observable, computed, toJS} from 'mobx';

import WorkoutTagStore from 'util/workoutTagStore';
import SectionTagStore from 'util/sectionTagStore';

const today = new Date();

export default class ViewWorkoutsStore {
    constructor(){
        this.load();
    }

    load(){
        ajaxUtil.get('/workout/search', {}).then(({workouts, sections}) => {
        });        
    }
}