import {action, observable, computed, toJS} from 'mobx';
import SectionStore from './sectionStore';
import {adjustTags} from 'util/tagUtils';

import WorkoutTagStore from 'util/workoutTagStore';

const today = new Date();

export default class WorkoutStore {
    @observable name = '';
    @observable date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    @observable saving = false;
    @observable frozen = false;

    @observable tags = [];
    @computed get rawTags(){ return this.tags.slice(); };

    @action setTags = tags => this.tags = tags;
    @observable sections = [];

    @action addSection = () => this.sections.push(new SectionStore());

    @action save = () => {
        let workout = toJS(this);
        delete workout.saving;
        delete workout.frozen;
        
        let sections = workout.sections;
        delete workout.sections;

        workout.tags = adjustTags(workout.tags);
        sections.forEach(s => s.tags = adjustTags(s.tags));

        this.saving = true;
        this.frozen = true;
        ajaxUtil.post('/workout/save', {workout, sections}).then(() => {
            this.saving = false;

            this.name = '';
            this.tags.clear();
            this.sections.clear();

            setTimeout(() => this.frozen = false, 100);
        });
    }
}