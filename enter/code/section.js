import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';


@observer
class Line extends Component {
    componentDidMount() {
        this.input.focus();
    }    
    render() {
        let {store} = this.props;
        return (
            <div className="form-group">
                <input ref={el => this.input = el} className="form-control" placeholder="Exercise" />
            </div>
        );
    }
}

var options = [
	{ value: 1, label: 'One' },
	{ value: 2, label: 'Two' },
	{ value: 3, label: 'Three' },
	{ value: 4, label: 'Four' },
	{ value: 5, label: 'Five' },
];

@observer
export default class Section extends Component {
    state = {tags: []};
    handleSelectChange = value => {
        console.log('You have selected: ', value);
        this.setState({ tags: value });
    }
    render() {
        let {store} = this.props;
        return (
            <div className='panel panel-default' style={{float: 'left', padding: '15px', margin: '5px', minWidth: '350px'}}>
                <div className="form-group">
                    <Creatable onChange={this.handleSelectChange} value={this.state.tags} multi={true} options={options} />
                </div>
                <div className="form-group">
                    <textarea className="form-control" rows="3" placeholder="Notes" />
                </div>
                <FadeList>
                    {store.lines.map((l, i) => <Line store={l}></Line>)}
                </FadeList>
                <hr/>
                <button onClick={store.addLine} className='btn btn-primary pull-right'>Add <i className='fa fa-fw fa-plus'></i></button>
            </div>
        );
    }
}