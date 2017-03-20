import {action, observable, computed} from 'mobx';
import SectionStore from './sectionStore';

export default class EnterWorkoutStore {
    @observable sections = [];
    @action addSection = () => this.sections.push(new SectionStore());
}