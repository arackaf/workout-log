import React, {Component} from 'react';
import {observer, Provider, inject} from 'mobx-react';

@inject('workoutTagStore')
export default class TableView extends Component {
    render() {
        let {workouts, workoutTagStore} = this.props;
        return (
            <table className='table table-condensed table-striped table-hover'>
                <thead>
                    <tr>
                        <th>Workout</th>
                        <th>Date</th>
                        <th>Tags</th>
                        <th># of sections</th>
                    </tr>
                </thead>
                <tbody>
                    {workouts.map(w => {
                        let tags = w.tags.map(t => workoutTagStore.tagLookup.get(t)).filter(t => t).join(', ');
                        return (
                            <tr>
                                <td>{w.name}</td>
                                <td>{w.date}</td>
                                <td>{tags}</td>
                                <td>{w.sections.length}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}