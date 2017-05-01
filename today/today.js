import ajaxUtil from 'util/ajaxUtil';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'mobx-react';

import workoutTagStore from 'util/workoutTagStore';
import sectionTagStore from 'util/sectionTagStore';
import Today from './code/today';
import TodayStore from './code/todayStore';

render(
    <Provider workoutTagStore={workoutTagStore} sectionTagStore={sectionTagStore}>
        <Today store={new TodayStore()} />
    </Provider>, document.getElementById('react_drop')
);
