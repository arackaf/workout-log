import {action, observable, computed} from 'mobx';
import sectionTagStore from 'util/sectionTagStore';

class Line {
    @observable content = '';
}

export default class SectionStore {
    @observable name = '';
    @observable notes = '';
    @action setTags = tags => this.tags = tags;
    @action addNewTag = (obj, creatableEl) => {
        this.tags.push(sectionTagStore.createTag(obj));
        creatableEl.select.setState({inputValue: ''});
    }
    @observable tags = [];
    @computed get rawTags(){ return this.tags.slice(); };
    @observable lines = [new Line()];
    @action addLine = () => this.lines.push(new Line());
    @action removeLine = line => this.lines.remove(line);
}