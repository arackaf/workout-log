import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import Section from './section';
import {FadeList} from 'util/fade';
import DatePicker, {BoundInput} from 'util/datepicker';
import Select, {Creatable} from 'react-select';

var options = [
	{ value: 1, label: 'Strength' },
	{ value: 2, label: 'Die' },
	{ value: 3, label: 'Heart Rate' },
	{ value: 4, label: 'Legs' }
];

@inject('workoutTagStore')
@observer
export default class EnterWorkout extends Component {
    render() {
        let {store, workoutTagStore} = this.props;
        return (
            <div>
                <div className='panel panel-default' style={{ 'margin': '15px', padding: '15px', minHeight: '500px' }}>
                    <h1 style={{marginTop: 0, marginBottom: 0}}>Enter a workout</h1>
                    <hr style={{marginTop: 0}} />
                    <BoundInput placeholder='Name' className='form-control' model={store} name='name' />
                    <br />
                    <Creatable placeholder="Tag this workout" onChange={store.setTags} value={store.rawTags} multi={true} options={workoutTagStore.allTags} />
                    <br />
                    <DatePicker style={{width: '100px'}} className='form-control' model={store} name='date' />
                    <br />
                    <button className='btn btn-primary' onClick={store.addSection}>Add section</button>
                    <br />
                    <br />

                    <FadeList>
                        {store.sections.map(s => <Section store={s} />)}
                    </FadeList>

                    <br style={{clear: 'both'}} />
                    <button onClick={store.save} className='btn btn-primary'>Save</button>
                </div>
            </div>
        );
    }
}