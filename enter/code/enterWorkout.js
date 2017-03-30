import React, {Component} from 'react';
import {observer} from 'mobx-react';
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

@observer
export default class EnterWorkout extends Component {
    state = {tags: []}
    handleSelectChange = value => {
        this.setState({ tags: value });
    }
    render() {
        let {store} = this.props;
        return (
            <div>
                <div className='panel panel-default' style={{ 'margin': '15px', padding: '15px', minHeight: '500px' }}>
                    <h1>Enter a workout</h1>
                    <hr />
                    <BoundInput placeholder='Name' className='form-control' model={store} name='name' />
                    <br />
                    <Creatable placeholder="Tag this workout" onChange={this.handleSelectChange} value={this.state.tags} multi={true} options={options} />
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