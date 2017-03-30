import {action, observable, computed} from 'mobx';
import SectionStore from './sectionStore';

const today = new Date();

export default class EnterWorkoutStore {
    @observable sections = [];
    @observable date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    @observable name = '';
    @action addSection = () => this.sections.push(new SectionStore());
    @action save = () => {
        ajaxUtil.post('/workout/save');
    }
}