import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';

export default class TagStore{
    constructor() {
        ajaxUtil.get(this.path).then(resp => {
            this.setTags(resp.tags);
        });
    }
    tagLookup = observable.map({});
    @computed get allTags(){ return this.tagLookup.entries().sort(sortLabelsBy).map(([value, label]) => ({ value, label })) }

    @action addTag = (value, label) => this.tagLookup.set(value, label);
    @action setTags(tags){
        this.tagLookup.replace(tags.map(t => [t._id, t.display]));
    }
}