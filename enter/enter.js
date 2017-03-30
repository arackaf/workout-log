import React from 'react';
import EnterWorkout from './code/enterWorkout';
import WorkoutStore from './code/workoutStore';
import {render} from 'react-dom';

render(<EnterWorkout store={new WorkoutStore()} />, document.getElementById('react_drop'));
