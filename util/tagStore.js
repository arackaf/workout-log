import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';

const sectionTags = [
{
    "_id" : "58f1af24185ceeac6aa119fe",
    "display" : "Deadlift"
},

/* 2 */
{
    "_id" : "58f1af24185ceeac6aa119ff",
    "display" : "Arms"
},

/* 3 */
{
    "_id" : "58f1af24185ceeac6aa11a00",
    "display" : "Curls"
},

/* 4 */
{
    "_id" : "58f1af24185ceeac6aa11a01",
    "display" : "Cheat-Curls"
},

/* 5 */
{
    "_id" : "58f1af24185ceeac6aa11a02",
    "display" : "Oly Lifts"
},

/* 6 */
{
    "_id" : "58f29c01531513142af699f5",
    "display" : "Heart Rate"
},

/* 7 */
{
    "_id" : "58f29d19531513142af699fb",
    "display" : "Chest"
},

/* 8 */
{
    "_id" : "58f29d19531513142af699fc",
    "display" : "Heart Rate"
},

/* 9 */
{
    "_id" : "58f29e1f531513142af69a00",
    "display" : "Back"
},

/* 10 */
{
    "_id" : "58f29e1f531513142af69a01",
    "display" : "Heart Rate"
},

/* 11 */
{
    "_id" : "58f534b97c0a657c1a5f6264",
    "display" : "Die Day"
}
]

const workoutTags = [
{
    "_id" : "58f1a61a54a613b449066a23",
    "display" : "Strength"
},

/* 2 */
{
    "_id" : "58f1a61a54a613b449066a24",
    "display" : "Power"
},

/* 3 */
{
    "_id" : "58f29c01531513142af699f9",
    "display" : "Olympic"
}
]

let newIdCounter = -1;
export default class TagStore{
    constructor(path) {
        this.path = path;

        this.setTags(path == '/tag/section' ? sectionTags : workoutTags);
        //ajaxUtil.get(this.path).then(resp => {
            //this.setTags(resp.tags);
        //});
    }
    tagLookup = observable.map({});
    @computed get allTags(){ return this.tagLookup.entries().sort(sortLabelsBy).map(([value, label]) => ({ value, label })) }

    projectTags = tagIds => tagIds.map(_id => ({_id, display: this.tagLookup.get(_id) })).filter(obj => obj.display);

    @action setTags(tags){
        this.tagLookup.replace(tags.map(t => [t._id, t.display]));
    }
    createTag(t){
        let newId = 'new_' + (newIdCounter--);
        this.tagLookup.set(newId, t.label);
        return {value: newId, label: t.label};
    }
}