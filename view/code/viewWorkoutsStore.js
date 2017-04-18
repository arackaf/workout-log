import {action, observable, computed, toJS} from 'mobx';

import WorkoutTagStore from 'util/workoutTagStore';
import SectionTagStore from 'util/sectionTagStore';

const today = new Date();

export default class ViewWorkoutsStore {
    @observable workouts = [];
    @observable mode = 'table';
    @action setTable = props => this.mode = 'table';
    @action setList = props => this.mode = 'list';

    constructor(){
        this.load();
    }

    load(){
        ajaxUtil.get('/workout/search', {}).then(({workouts, sections}) => {
            let sectionLookup = new Map(sections.map(s => [s._id, s]));
            workouts.forEach(w => w.sections = w.sections.map(s => sectionLookup.get(s)).filter(s => s));
            this.workouts = workouts;
        });        
    }
}