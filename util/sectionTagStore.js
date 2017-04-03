import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';
import TagStore from './tagStore';

class SectionTagStore extends TagStore {
    constructor() {
        super();
        ajaxUtil.get('/tag/section').then(resp => {
            super.setTags(resp.tags);
        })
    }
}

export default new SectionTagStore();