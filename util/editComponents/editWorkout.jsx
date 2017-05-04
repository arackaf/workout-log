import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Section from './editSection';
import {FadeList} from 'util/fade';
import DatePicker from 'util/datepicker';
import {BoundInput} from 'util/boundInputs';
import Select, {Creatable} from 'react-select';
import {SpinButton} from 'util/buttons';

import Workout from 'util/workoutModels/workout';
import workoutTagStore from 'util/workoutTagStore';
import sectionTagStore from 'util/sectionTagStore';

/**
 * @augments {Component<{workoutTagStore: typeof workoutTagStore, sectionTagStore: typeof sectionTagStore, workout: Workout}, {}>}
 */
@inject('workoutTagStore', 'sectionTagStore')
@observer
export default class EditWorkout extends Component {
    render() {
        let {workout, workoutTagStore, sectionTagStore} = this.props;
        
        return (
            <div>
                <div className='panel panel-default' style={{ 'margin': '15px', padding: '15px', minHeight: '500px' }}>
                    <h1 style={{marginTop: 0, marginBottom: 0}}>Enter a workout</h1>
                    <hr style={{marginTop: 0}} />
                    <BoundInput disabled={workout.saving || workout.frozen} placeholder='Name' className='form-control' model={workout} name='name' />
                    <br />
                    <Creatable disabled={workout.saving || workout.frozen} placeholder="Tag this workout" ref={el => this.creatableEl = el} onNewOptionClick={obj => workout.addNewTag(obj, this.creatableEl)} onChange={workout.setTags} value={workout.rawTags} multi={true} options={workoutTagStore.allTags} />
                    <br />
                    <DatePicker disabled={workout.saving || workout.frozen} style={{width: '100px'}} className='form-control' model={workout} name='date' />
                    <br />
                    <button disabled={workout.saving || workout.frozen} className='btn btn-primary' onClick={workout.addSection}>Add section</button>
                    <br />
                    <br />

                    <FadeList>
                        {workout.sections.map((s, i) => <Section onRemove={() => workout.removeSection(s)} key={s._id || i} frozen={workout.frozen} saving={workout.saving} sectionTagStore={sectionTagStore} section={s} />)}
                    </FadeList>

                    <br style={{clear: 'both'}} />
                    <SpinButton running={workout.saving} disabled={workout.saving || workout.frozen} runningText='Saving' finishedText='Saved' onClick={workout.save} className='btn btn-primary'>Save</SpinButton>
                </div>
            </div>
        );
    }
}