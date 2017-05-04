import React, {Component} from 'react';
import {observer} from 'mobx-react';

const cssPresets = { };
const buttonTypes = ['default', 'primary', 'success', 'info', 'warning', 'danger'];
const buttonSizes = ['lg', 'sm', 'xs'];

buttonTypes.forEach(t => {
    cssPresets[t] = `btn-${t}`; //default size
    buttonSizes.forEach(s => {
        cssPresets[`${t}-${s}`] = `btn-${t} btn-${s}`;
    });
});

const cssFromPreset = props => (props.className || '') + (props.preset ? ' btn ' + (cssPresets[props.preset] || props.css || '') : '');

export class BootstrapButton extends Component {
    render() {
        let props = this.props,
            { children, preset, ...rest } = props;
        return (
            <button className={cssFromPreset(props)} {...rest}>{children}</button>
        )
    }
}

export class BootstrapAnchorButton extends Component {
    render() {
        let props = this.props,
            { children, preset, ...rest } = props;
        return (
            <a className={cssFromPreset(props)} {...rest}>{children} </a>
        )
    }
}

@observer
export class SpinButton extends Component {
    state = {};
    componentDidMount(){
        this._mounted = true;
    }
    componentWillUnmount(){
        this._mounted = false;
    }
    componentWillReceiveProps(nextProps){
        if (this.props.running && !nextProps.running && (this.props.delayRestore || this.props.finishedText)){
            this.setState({ delaying: true });
            setTimeout(() => {
                this._mounted && this.setState({ delaying: false })
            }, 2000);
        }
    }
    render() {
        let props = this.props,
            { children, running, disabled = false, onClick, runningText, preset, delayRestore, finishedText, className, ...rest } = props;

        if (this.state.delaying){
            return (
                <button className={cssFromPreset(props)} disabled={true} {...rest}>
                    <i className="fa fa-fw fa-check-circle"></i>{finishedText ? ' ' + finishedText : children}
                </button>
            );
        }

        return (
            running
                ? <button className={cssFromPreset(props)} disabled={true} {...rest}>
                    <i className="fa fa-fw fa-spin fa-spinner"></i>{ runningText ? ' ' + runningText : ''}</button>
                : <button className={cssFromPreset(props)}
                          disabled={disabled}
                          onClick={onClick}
                          {...rest}>{children}</button>
        )
    }
}

@observer
export class SpinAnchor extends Component {
    state = {};
    componentDidMount(){
        this._mounted = true;
    }
    componentWillUnmount(){
        this._mounted = false;
    }
    componentWillReceiveProps(nextProps){
        if (this.props.running && !nextProps.running && (this.props.delayRestore || this.props.finishedText)){
            this.setState({ delaying: true });
            setTimeout(() => {
                this._mounted && this.setState({ delaying: false })
            }, 2000);
        }
    }
    render() {
        let props = this.props,
            { children, running, disabled, onClick, runningText, delayRestore, finishedText, preset, ...rest } = props;

        if (this.state.delaying){
            return <a className={cssFromPreset(props)} disabled={true} {...rest}>
                    <i className="fa fa-fw fa-check-circle"></i>{finishedText ? ' ' + finishedText : ''}</a>
        }

        return (
            running
                ? <a className={cssFromPreset(props)} disabled={true} {...rest}>
                    <i className="fa fa-fw fa-spin fa-spinner"></i>{runningText ?  ' ' + runningText : ''}
                  </a>
                : <a className={cssFromPreset(props)} disabled={disabled || false} onClick={onClick} {...rest}>{ children }</a>
        )
    }
}
