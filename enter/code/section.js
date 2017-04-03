import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/datepicker';

@observer
class Line extends Component {
    componentDidMount() {
        findDOMNode(this.input).focus();
    }
    render() {
        let {store} = this.props;
        return (
            <div className="form-group">
                <BoundInput ref={el => this.input = el} model={store} name="content" className="form-control" placeholder="Exercise" />
            </div>
        );
    }
}

var options = [
	{ value: 1, label: 'Arms' },
	{ value: 2, label: 'Legs' },
	{ value: 3, label: 'Chest' }
];

@observer
export default class Section extends Component {
    componentDidMount() {
        findDOMNode(this.name).focus();
    }
    render() {
        let {store} = this.props;
        return (
            <div className='panel panel-default' style={{float: 'left', padding: '15px', margin: '5px', minWidth: '350px'}}>
                <div className="form-group">
                    <BoundInput ref={el => this.name = el} model={store} name="name" className="form-control" rows="3" placeholder="Name" />
                </div>
                <div className="form-group">
                    <Creatable placeholder="Tag this section" onChange={store.setTags} value={store.rawTags} multi={true} options={options} />
                </div>

                <FadeList>
                    {store.lines.map((l, i) => <Line store={l}></Line>)}
                </FadeList>
                <button onClick={store.addLine} className='btn btn-primary pull-right'>Add <i className='fa fa-fw fa-plus'></i></button>
                <br />
                <hr/>

                <div className="form-group">
                    <BoundTextArea model={store} name="notes" className="form-control" rows="3" placeholder="Notes" />
                </div>
            </div>
        );
    }
}