import {action, observable, computed, toJS} from 'mobx';
import SectionStore from './sectionStore';

const today = new Date();

export default class WorkoutStore {    
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

        ajaxUtil.post('/workout/save', {workout, sections});

        console.log(workout);
        console.log(sections);
    }
}