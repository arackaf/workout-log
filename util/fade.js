import React, {Component} from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

const FadeList = ({children}) =>
    <CSSTransitionGroup
        transitionName="react-fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {children}
    </CSSTransitionGroup>

export default ({isShowing, children}) =>
    <CSSTransitionGroup
        transitionName="react-fade"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}>
        {isShowing ? children : null}
    </CSSTransitionGroup>

export {FadeList};