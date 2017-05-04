import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer, inject} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/boundInputs';
import {Modal} from 'simple-react-bootstrap';

import EditWorkout from 'util/editComponents/editWorkout';
import TableView from './tableView';
import ListView from './listView';

import workoutTagStore from 'util/workoutTagStore';
import sectionTagStore from 'util/sectionTagStore';
import ViewWorkoutsStore from './/viewWorkoutsStore';

/**
 * @augments {Component<{workoutTagStore: typeof workoutTagStore, sectionTagStore: typeof sectionTagStore, store: ViewWorkoutsStore}, {}>}
 */
@inject('workoutTagStore', 'sectionTagStore')
@observer
export default class Section extends Component {
    render() {
        let {store, workoutTagStore, sectionTagStore} = this.props,
            WorkoutViewComponent = store.mode === 'table' ? TableView : ListView;

        return (
            <div>
                <div>
                    <div style={{padding: '2px', margin: '5px'}}>                        
                        <div>
                            <button onClick={store.setTable} className='btn btn-sm btn-primary'><i className='fa fa-table'></i></button>&nbsp;
                            <button onClick={store.setList} className='btn btn-sm btn-primary'><i className='fa fa-list'></i></button>
                        </div>
                        <br />

                        <WorkoutViewComponent editWorkout={store.editWorkout} workouts={store.workouts} />
                    </div>
                </div>
                <Modal className="fade" show={store.editingWorkout} onHide={store.cancelEdit}>
                    <Modal.Header>
                        <h6>Edit Workout</h6>
                    </Modal.Header>
                    <Modal.Body>
                        <EditWorkout workoutTagStore={workoutTagStore} sectionTagStore={sectionTagStore} workout={store.editingWorkout} />
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-default" onClick={store.cancelEdit}>Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}