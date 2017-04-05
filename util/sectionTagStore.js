import {action, observable, computed} from 'mobx';
import {sortLabelsBy} from 'util/tagUtils';
import TagStore from './tagStore';

class SectionTagStore extends TagStore {
    path = '/tag/section';
}

export default new SectionTagStore();