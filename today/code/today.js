import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer, inject} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/boundInputs';
import {Modal} from 'simple-react-bootstrap';

import EditWorkout from 'util/editComponents/editWorkout';

import workoutTagStore from 'util/workoutTagStore';
import sectionTagStore from 'util/sectionTagStore';
import TodayStore from './todayStore';

const panelStyles = { border: '1px solid #ddd', borderRadius: '4px' }

@inject('sectionTagStore')
@observer
class SectionDisplay extends Component {
    render() {
        let {section, sectionTagStore} = this.props,
            tags = sectionTagStore.projectTags(section.tags);

        return (
            <div style={{marginRight: '3px', marginBottom: '5px', ...panelStyles}}>
                <div style={{paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', minWidth: '100px', maxWidth: '250px'}}>
                    {section.name ? <div>{section.name}</div> : null}
                    {section.name ? <hr style={{marginTop: '1px'}} /> : null}
                    {section.lines.map(line => <div>{line.content}</div>)}
                    {section.notes ? <div><br />{section.notes}</div> : null}
                    {tags.length ? (
                        <div>
                            <br />
                            <b>Tags:</b>
                            <br/>
                            <div style={{marginLeft: '5px'}}>{tags.map(t => <div key={t._id}>{t.display}</div>)}</div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

/**
 * @augments {Component<{workoutTagStore: typeof workoutTagStore, sectionTagStore: typeof sectionTagStore, store: TodayStore}, {}>}
 */
@inject('workoutTagStore')
@observer
export default class Section extends Component {
    render() {
        let {store, workoutTagStore} = this.props;
        let currentWorkout = store.currentWorkout;

        if (!currentWorkout){
            return null;
        }

        let tags = workoutTagStore.projectTags(currentWorkout.tags);

        return (
            <div key={currentWorkout._id} className='panel panel-default' style={{padding: '10px'}}>
                <div>{currentWorkout.name}</div>
                <hr style={{marginTop: '5px'}} />
                <div className="row">
                    <div className="col-xs-12 col-sm-2">                                    
                        <div>{currentWorkout.date}</div>
                        <div>{tags.map(t => <div key={t._id}>{t.display}</div>)}</div>
                    </div>
                    <div className="col-xs-11 col-sm-9">
                        {currentWorkout.sections.map(s => <SectionDisplay section={s} />)}
                    </div>
                </div>
                <button onClick={() => editWorkout(currentWorkout)}>Edit</button>
            </div>
        );
    }
}