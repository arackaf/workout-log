import ajaxUtil from 'util/ajaxUtil';
import React from 'react';
import EnterWorkout from './code/enterWorkout';
import WorkoutStore from './code/workoutStore';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';

import workoutTagStore from 'util/WorkoutTagStore';
import sectionTagStore from 'util/sectionTagStore';

render(
    <Provider workoutTagStore={workoutTagStore} sectionTagStore={sectionTagStore}>
        <EnterWorkout store={new WorkoutStore()} />
    </Provider>, document.getElementById('react_drop')
);
