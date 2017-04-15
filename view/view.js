import ajaxUtil from 'util/ajaxUtil';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';

import workoutTagStore from 'util/WorkoutTagStore';
import sectionTagStore from 'util/sectionTagStore';
import ViewWorkouts from './code/viewWorkouts';
import ViewWorkoutsStore from './code/viewWorkoutsStore';


render(
    <Provider workoutTagStore={workoutTagStore} sectionTagStore={sectionTagStore}>
        <ViewWorkouts store={new ViewWorkoutsStore()} />
    </Provider>, document.getElementById('react_drop')
);
