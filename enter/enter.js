import ajaxUtil from 'util/ajaxUtil';
import React from 'react';
import EnterWorkout from './code/enterWorkout';
import Workout from 'util/workoutModels/workout';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';

import workoutTagStore from 'util/workoutTagStore';
import sectionTagStore from 'util/sectionTagStore';

render(
    <Provider workoutTagStore={workoutTagStore} sectionTagStore={sectionTagStore}>
        <EnterWorkout workout={new Workout()} />
    </Provider>, document.getElementById('react_drop')
);
