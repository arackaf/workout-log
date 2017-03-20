import React from 'react';
import EnterWorkout from './code/enterWorkout';
import EnterWorkoutStore from './code/enterWorkoutStore';
import {render} from 'react-dom';

render(<EnterWorkout store={new EnterWorkoutStore()} />, document.getElementById('react_drop'));
