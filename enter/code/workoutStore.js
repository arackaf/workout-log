import {action, observable, computed, toJS} from 'mobx';
import SectionStore from './sectionStore';
import {adjustTags} from 'util/tagUtils';

import WorkoutTagStore from 'util/WorkoutTagStore';

const today = new Date();

export default class WorkoutStore {
    constructor() {
        // setTimeout(() => WorkoutTagStore.addTag(1, 'Hello'), 300);
        // setTimeout(() => WorkoutTagStore.addTag(2, 'World'), 350);
        // setTimeout(() => WorkoutTagStore.addTag(3, 'hello'), 400);
        // setTimeout(() => WorkoutTagStore.addTag(4, 'world'), 450);
    }

    @observable name = '';
    @observable date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    @observable tags = [];
    @computed get rawTags(){ return this.tags.slice(); };
    @action setTags = tags => this.tags = tags;
    @observable sections = [];
    @action addSection = () => this.sections.push(new SectionStore());
    @action save = () => {
        let workout = toJS(this);
        let sections = workout.sections;
        delete workout.sections;

        workout.tags = adjustTags(workout.tags);

        //debugger;

        ajaxUtil.post('/workout/save', {workout, sections});

        console.log(workout);
        console.log(sections);
    }
}