import React, {Component} from 'react';
import EditWorkout from 'util/editComponents/editWorkout';

import {FileUpload} from 'util/fileUpload';

export default class EnterWorkout extends Component {
    render() {        
        return (
            <div>
                <FileUpload />

                <EditWorkout workout={this.props.workout}></EditWorkout>
            </div>
        );
    }
}