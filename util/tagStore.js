import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/miscUtil';

class TagStore{
    tagLookup = observable.map({});
    @computed get allTags(){ return this.tagLookup.entries().sort(sortLabelsBy).map(([value, label]) => ({ value, label })) }

    @action addTag = (value, label) => this.tagLookup.set(value, label);
}

export default TagStore;