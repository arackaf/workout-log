import {action, observable, computed} from 'mobx';

class Line {
    @observable content = '';
}

export default class SectionStore {
    @observable name = '';
    @action setTags = tags => this.tags = tags;
    @observable tags = [];
    @computed get rawTags(){ return this.tags.slice(); };
    @observable lines = [new Line()];
    @action addLine = () => this.lines.push(new Line());
}