import {action, observable, computed, toJS} from 'mobx';

import WorkoutTagStore from 'util/workoutTagStore';
import SectionTagStore from 'util/sectionTagStore';
import Workout from 'util/workoutModels/workout';

const today = new Date();

import {workouts, sections} from 'util/staticData/data';

export default class ViewWorkoutsStore {
    @observable currentWorkout = null;

    constructor(){
        this.load();
    }

    load(){

        //ajaxUtil.get('/workout/search', {}).then(({workouts, sections}) => {
             let sectionLookup = new Map(sections.map(s => [s._id, s]));
             workouts.forEach(w => w.sections = w.sections.map(s => sectionLookup.get(s)).filter(s => s));
             let allWorkouts = workouts.map(w => Workout.from(w));

             this.currentWorkout = allWorkouts[1];
        // });
    }
}