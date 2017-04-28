import React, {Component} from 'react';
import {action, observable, computed} from 'mobx';
import {observer, Provider, inject} from 'mobx-react';
import Measure from 'react-measure';

const panelStyles = { border: '1px solid #ddd', borderRadius: '4px' }

@inject('sectionTagStore')
@observer
class SectionDisplay extends Component {
    render() {
        let {section, sectionTagStore} = this.props,
            tags = sectionTagStore.projectTags(section.tags);

        return (
            <div style={{marginRight: '3px', marginBottom: '5px', ...panelStyles}}>
                <div style={{paddingTop: '5px', paddingLeft: '10px', paddingRight: '10px', minWidth: '100px', maxWidth: '250px'}}>
                    {section.name ? <div>{section.name}</div> : null}
                    {section.name ? <hr style={{marginTop: '1px'}} /> : null}
                    {section.lines.map(line => <div>{line.content}</div>)}
                    {section.notes ? <div><br />{section.notes}</div> : null}
                    {tags.length ? (
                        <div>
                            <br />
                            <b>Tags:</b>
                            <br/>
                            <div style={{marginLeft: '5px'}}>{tags.map(t => <div key={t._id}>{t.display}</div>)}</div>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

@observer
class SectionsDisplay extends Component { 
    render() {
        let {sections} = this.props;
        return (
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                {sections.map(s => <SectionDisplay key={s._id} onHeightChange={this.sectionMeasured} minHeight={this.minHeight} section={s} />)}
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
                    let tags = workoutTagStore.projectTags(w.tags);

                    return (
                        <div key={w._id} className='panel panel-default' style={{padding: '10px'}}>
                            <div>{w.name}</div>
                            <hr style={{marginTop: '5px'}} />
                            <div className="row">
                                <div className="col-xs-12 col-sm-2">                                    
                                    <div>{w.date}</div>
                                    <div>{tags.map(t => <div key={t._id}>{t.display}</div>)}</div>
                                </div>
                                <div className="col-xs-11 col-sm-9">
                                    <SectionsDisplay sections={w.sections} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}