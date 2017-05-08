import {action, observable, computed} from 'mobx';
import sectionTagStore from 'util/sectionTagStore';

export class Line {
    @observable content = '';
}

export default class Section {
    _id = '';
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

    static from(sectionResult){
        let result = new Section();
        ['_id', 'name', 'notes'].forEach(prop => result[prop] = sectionResult[prop]);

        let orig = sectionResult.tags.concat();
        let tags = sectionResult.tags.map(_id => ({value: _id}));
        tags.forEach(t => {
            let label = sectionTagStore.tagLookup.get(t.value);
            t.label = label;
        });
        result.tags = tags;
        result.lines = sectionResult.lines.map(l => {
            let newLine = new Line();
            newLine.content = l.content;
            return newLine;
        })
        return result;
    }    
}