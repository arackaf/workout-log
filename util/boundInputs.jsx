import React, {Component} from 'react';
import {observer} from 'mobx-react';

@observer
export class BoundInput extends Component {
    boundChange = evt => {
        const {model, name} = this.props;
        model[name] = evt.target.value;
    };

    render() {
        let { model, name, ...rest } = this.props;

        return (
            <input {...rest} ref={el => this.input = el} value={model[name] || ""} onChange={this.boundChange} />
        )
    }
}

@observer
export class BoundTextArea extends Component {
    boundChange = evt => {
        const {model, name} = this.props;
        model[name] = evt.target.value;
    };

    render() {
        let { model, name, children, ...rest } = this.props;

        return (
            <textarea value={model[name]} {...rest} onChange={this.boundChange}></textarea>
        )
    }
}