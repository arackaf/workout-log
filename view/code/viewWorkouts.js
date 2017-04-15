import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/boundInputs';

import TableView from './tableView';
import ListView from './listView';

@observer
export default class Section extends Component {
    render() {
        let {store} = this.props,
            WorkoutViewComponent = store.mode === 'table' ? TableView : ListView;
        return (
            <div className='row'>
                <div className='col-xs-12'>
                    <div className='panel panel-default' style={{padding: '15px', margin: '5px', minWidth: '350px'}}>                        
                        <button onClick={store.setTable} className='btn btn-sm btn-primary'><i className='fa fa-table'></i></button>&nbsp;
                        <button onClick={store.setList} className='btn btn-sm btn-primary'><i className='fa fa-list'></i></button>

                        <WorkoutViewComponent workouts={store.workouts} />
                    </div>
                </div>
            </div>

            
        );
    }
}