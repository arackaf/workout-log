import {action, observable, computed, toJS} from 'mobx';
import Section from './section';
import {adjustTags} from 'util/tagUtils';

import workoutTagStore from 'util/workoutTagStore';

const today = new Date();

export default class Workout {
    @observable name = '';
    @observable date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    @observable saving = false;
    @observable frozen = false;

    @observable tags = [];
    @computed get rawTags(){ return this.tags.slice(); };

    @action setTags = tags => this.tags = tags;
    @observable sections = [];
    @action removeSection = section => this.sections.remove(section);

    @action addSection = () => this.sections.push(new Section());

    @action addNewTag = (obj, creatableEl) => {
        this.tags.push(workoutTagStore.createTag(obj));
        creatableEl.select.setState({inputValue: ''});
    }

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

    static from(workoutResult){
        let result = new Workout();
        ['_id', 'name', 'date', 'notes'].forEach(prop => result[prop] = workoutResult[prop]);

        let tags = workoutResult.tags.map(_id => ({value: _id}));
        tags.forEach(t => {
            let label = workoutTagStore.tagLookup.get(t.value);
            t.label = label;
        });
        result.tags = tags;

        result.sections = workoutResult.sections.map(s => Section.from(s));
        return result;
    }
}