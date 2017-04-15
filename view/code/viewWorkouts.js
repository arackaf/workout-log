import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/boundInputs';

@observer
export default class Section extends Component {
    render() {
        let {store} = this.props;
        return (
            <div className='panel panel-default' style={{float: 'left', padding: '15px', margin: '5px', minWidth: '350px'}}>
                <h1>Hello</h1>
            </div>
        );
    }
}