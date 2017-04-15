import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';

let newIdCounter = -1;
export default class TagStore{
    constructor(path) {
        this.path = path;
        ajaxUtil.get(this.path).then(resp => {
            this.setTags(resp.tags);
        });
    }
    tagLookup = observable.map({});
    @computed get allTags(){ return this.tagLookup.entries().sort(sortLabelsBy).map(([value, label]) => ({ value, label })) }

    @action setTags(tags){
        this.tagLookup.replace(tags.map(t => [t._id, t.display]));
    }
    createTag(t){
        let newId = 'new_' + (newIdCounter--);
        this.tagLookup.set(newId, t.label);
        return {value: newId, label: t.label};
    }
}