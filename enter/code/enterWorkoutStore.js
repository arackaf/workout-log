import {action, observable, computed} from 'mobx';
import SectionStore from './sectionStore';

const today = new Date();

export default class EnterWorkoutStore {
    @observable sections = [];
    @observable date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    @action addSection = () => this.sections.push(new SectionStore());
}