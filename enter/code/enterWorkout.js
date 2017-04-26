import React, {Component} from 'react';
import EditWorkout from 'util/editComponents/editWorkout';

export default class EnterWorkout extends Component {
    render() {        
        return (
            <EditWorkout workout={this.props.workout}></EditWorkout>
        );
    }
}