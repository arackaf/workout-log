import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {observer} from 'mobx-react';

import {BoundInput} from './boundInputs';

export class DatePickerRaw extends Component {
    optIn(el) {
        $(el).datepicker({
            onSelect: this.props.onSelect
        });
    }

    optOut(el) {
        try { $(el).datepicker('hide'); } catch(e){} //can't believe that's needed
        try { $(el).datepicker('destroy'); } catch(e){}
    }

    componentDidMount() {
        this.optIn(this.el);
    }

    componentWillUpdate() {
        this.oldEl = this.el;
    }

    componentDidUpdate() {
        if (this.oldEl !== this.el) {
            if (this.oldEl) {
                this.optOut(this.oldEl);
            }
            this.optIn(this.el);
        }
    }

    componentWillUnmount() {
        this.optOut(this.el);
    }

    render() {
        return (
            React.cloneElement(React.Children.only(this.props.children), {ref: el => this.el = ReactDOM.findDOMNode(el)})
        );
    }
}

export default props => {
    let {model, name, ...rest} = props;

    return (
        <DatePickerRaw onSelect={value => model[name] = value}>
            <BoundInput {...rest} model={model} name={name} />
        </DatePickerRaw>
    )
};

