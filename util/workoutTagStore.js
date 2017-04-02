import {action, observable, computed} from 'mobx';

class WorkoutTagStore{
    tagLookup = observable.map({});
    @computed get allTags(){ return this.tagLookup.entries().sort(([x, val1], [y, val2]) => val1 - val2).map(([value, label]) => ({ value, label })) }

    @action addTag = (value, label) => this.tagLookup.set(value, label);
}

export default new WorkoutTagStore();