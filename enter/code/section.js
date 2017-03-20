import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export default class Section extends Component {
    render() {
        return (
            <div className='panel panel-default' style={{float: 'left', padding: '15px'}}>
                <div>Hi</div>
            </div>
        );
    }
}