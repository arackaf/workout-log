import React, {Component} from 'react';
import {observer} from 'mobx-react';
import Section from './section';
import {FadeList} from 'util/fade';

@observer
export default class EnterWorkout extends Component {
    render() {
        let {store} = this.props;
        return (
            <div>
                <div className='panel panel-default' style={{ 'margin': '15px', padding: '15px', minHeight: '500px' }}>
                    <h1>Enter a workout</h1>
                    <hr />
                    <button className='btn btn-primary' onClick={store.addSection}>Add section</button>
                    <br />
                    <br />

                    <FadeList>
                        {store.sections.map(s => <Section store={s} />)}
                    </FadeList>

                    <br style={{clear: 'both'}} />
                </div>
            </div>
        );
    }
}