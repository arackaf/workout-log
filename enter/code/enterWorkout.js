import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Section from './section';
import {FadeList} from 'util/fade';
import DatePicker from 'util/datepicker';
import {BoundInput} from 'util/boundInputs';
import Select, {Creatable} from 'react-select';
import {SpinButton} from 'util/buttons';

@inject('workoutTagStore', 'sectionTagStore')
@observer
export default class EnterWorkout extends Component {
    render() {
        let {store, workoutTagStore, sectionTagStore} = this.props;
        return (
            <div>
                <div className='panel panel-default' style={{ 'margin': '15px', padding: '15px', minHeight: '500px' }}>
                    <h1 style={{marginTop: 0, marginBottom: 0}}>Enter a workout</h1>
                    <hr style={{marginTop: 0}} />
                    <BoundInput disabled={store.saving || store.frozen} placeholder='Name' className='form-control' model={store} name='name' />
                    <br />
                    <Creatable disabled={store.saving || store.frozen} placeholder="Tag this workout" ref={el => this.creatableEl = el} onNewOptionClick={obj => store.addNewTag(obj, this.creatableEl)} onChange={store.setTags} value={store.rawTags} multi={true} options={workoutTagStore.allTags} />
                    <br />
                    <DatePicker disabled={store.saving || store.frozen} style={{width: '100px'}} className='form-control' model={store} name='date' />
                    <br />
                    <button disabled={store.saving || store.frozen} className='btn btn-primary' onClick={store.addSection}>Add section</button>
                    <br />
                    <br />

                    <FadeList>
                        {store.sections.map((s, i) => <Section onRemove={() => store.removeSection(s)} key={s._id || i} frozen={store.frozen} saving={store.saving} sectionTagStore={sectionTagStore} store={s} />)}
                    </FadeList>

                    <br style={{clear: 'both'}} />
                    <SpinButton running={store.saving} disabled={store.saving || store.frozen} runningText='Saving' finishedText='Saved' onClick={store.save} className='btn btn-primary'>Save</SpinButton>
                </div>
            </div>
        );
    }
}