import React, {Component} from 'react';
import {action, observable, computed} from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import Measure from 'react-measure';

@observer
class SectionDisplay extends Component {
    render() {
        let {section, minHeight} = this.props;
        return (
            <div className='col-xs-4' style={{minHeight: minHeight + 'px'}}>
                <div>{section.name}</div>
                <hr style={{marginTop: '5px'}} />
                {section.lines.map(line => <div>{line.content}</div>)}
                {section.notes ? <div><br />{section.notes}</div> : null}
            </div>
        );
    }
}

@observer
class SectionsDisplay extends Component {
    @observable minHeight = 50;
    @action sectionMeasured = dimensions => {
        if (dimensions.height > this.minHeight){
            this.minHeight = dimensions.height;
        }
    }
    render() {
        let {sections} = this.props;
        return (
            <div>
                {sections.map(s => (
                    <Measure whitelist={['height']} onMeasure={this.sectionMeasured}>
                        <SectionDisplay minHeight={this.minHeight} section={s} />
                    </Measure>
                ))}
            </div>
        );
    }
}

@inject('workoutTagStore')
@observer
export default class ListView extends Component {
    render() {
        let {workouts, workoutTagStore} = this.props;
        return (
            <div>
                {workouts.map(w => {
                    let tags = w.tags.map(t => workoutTagStore.tagLookup.get(t)).filter(t => t).join(', ');

                    return (
                        <div className='panel panel-default' style={{margin: '10px', padding: '10px'}}>
                            <div>{w.name}</div>
                            <hr style={{marginTop: '5px'}} />
                            <div className="row">
                                <div className="col-xs-2">                                    
                                    <div>{w.date}</div>
                                    <div>{tags}</div>
                                </div>
                                <div className="col-xs-10">
                                    <div className="row">
                                        <SectionsDisplay sections={w.sections} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}