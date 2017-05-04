import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/boundInputs';

import SectionModel, {Line as LineStore} from 'util/workoutModels/section';
import workoutTagStore from 'util/workoutTagStore';
import sectionTagStore from 'util/sectionTagStore';


/**
 * @augments {Component<{store: LineStore}, {}>}
 */
@observer
class Line extends Component {
    componentDidMount() {
        findDOMNode(this.input).focus();
    }
    render() {
        let {store, disabled, index, onRemove} = this.props;
        
        return (
            <div className="form-group">
                <div className="row">
                    <div className={index > 0 ? "col-xs-11" : "col-xs-12"}>
                        <BoundInput ref={el => this.input = el} disabled={disabled} model={store} name="content" className="form-control" placeholder="Exercise" />
                    </div>
                    {index > 0 ?
                        <div className="col-xs-1" style={{padding: 0}}>
                            <button onClick={onRemove} tabIndex={-1} className="btn btn-danger btn-xs"><i className="fa fa-trash"></i></button>
                        </div> : null
                    }
                </div>
            </div>
        );
    }
}

/**
 * @augments {Component<{section: SectionModel, sectionTagStore: typeof sectionTagStore}, {}>}
 */
@observer
export default class Section extends Component {
    componentDidMount() {
        findDOMNode(this.name).focus();
    }
    render() {
        let {section, sectionTagStore, saving, frozen, onRemove} = this.props;
        
        return (
            <div className='panel panel-default' style={{float: 'left', padding: '0 15px 15px 15px', margin: '5px', minWidth: '350px'}}>
                <a onClick={onRemove} style={{color: 'black', cursor: 'pointer'}} className="pull-right">X</a>
                <div className="form-group">
                    <BoundInput disabled={saving || frozen} ref={el => this.name = el} model={section} name="name" className="form-control" rows="3" placeholder="Name" />
                </div>
                <div className="form-group">
                    <Creatable disabled={saving || frozen} placeholder="Tag this section" ref={el => this.creatableEl = el} onNewOptionClick={obj => section.addNewTag(obj, this.creatableEl)} onChange={section.setTags} value={section.rawTags} multi={true} options={sectionTagStore.allTags} />
                </div>

                <FadeList>
                    {section.lines.map((l, i) => <Line onRemove={() => section.removeLine(l)} disabled={saving || frozen} index={i} key={l._id || i} store={l}></Line>)}
                </FadeList>
                <button onClick={section.addLine} disabled={saving || frozen} className='btn btn-primary pull-right'>Add <i className='fa fa-fw fa-plus'></i></button>
                <br />
                <hr/>

                <div className="form-group">
                    <BoundTextArea model={section} disabled={saving || frozen} name="notes" className="form-control" rows="3" placeholder="Notes" />
                </div>
            </div>
        );
    }
}