import React, {Component} from 'react';
import {observer, Provider, inject} from 'mobx-react';

@observer
class SectionDisplay extends Component {
    render() {
        let {section} = this.props;
        return (
            <div className='col-xs-4' style={{minHeight: '200px'}}>
                <div>{section.name}</div>
                <hr style={{marginTop: '5px'}} />
                {section.lines.map(line => <div>{line.content}</div>)}
                {section.notes ? <div><br />{section.notes}</div> : null}
            </div>
        );
    }
}

@inject('workoutTagStore')
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
                                        {w.sections.map(s => <SectionDisplay section={s} />)}
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