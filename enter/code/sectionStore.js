import {action, observable, computed} from 'mobx';

class Line {
    @observable content = '';
}

export default class SectionStore {
    @observable lines = [new Line()];
    @action addLine = () => this.lines.push(new Line());
}