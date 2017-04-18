import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {observer} from 'mobx-react';
import {FadeList} from 'util/fade';
import Select, {Creatable} from 'react-select';
import {BoundInput, BoundTextArea} from 'util/boundInputs';

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

@observer
export default class Section extends Component {
    componentDidMount() {
        findDOMNode(this.name).focus();
    }
    render() {
        let {store, sectionTagStore, saving, frozen, onRemove} = this.props;
        return (
            <div className='panel panel-default' style={{float: 'left', padding: '0 15px 15px 15px', margin: '5px', minWidth: '350px'}}>
                <a onClick={onRemove} style={{color: 'black', cursor: 'pointer'}} className="pull-right">X</a>
                <div className="form-group">
                    <BoundInput disabled={saving || frozen} ref={el => this.name = el} model={store} name="name" className="form-control" rows="3" placeholder="Name" />
                </div>
                <div className="form-group">
                    <Creatable disabled={saving || frozen} placeholder="Tag this section" ref={el => this.creatableEl = el} onNewOptionClick={obj => store.addNewTag(obj, this.creatableEl)} onChange={store.setTags} value={store.rawTags} multi={true} options={sectionTagStore.allTags} />
                </div>

                <FadeList>
                    {store.lines.map((l, i) => <Line onRemove={() => store.removeLine(l)} disabled={saving || frozen} index={i} key={l._id || i} store={l}></Line>)}
                </FadeList>
                <button onClick={store.addLine} disabled={saving || frozen} className='btn btn-primary pull-right'>Add <i className='fa fa-fw fa-plus'></i></button>
                <br />
                <hr/>

                <div className="form-group">
                    <BoundTextArea model={store} disabled={saving || frozen} name="notes" className="form-control" rows="3" placeholder="Notes" />
                </div>
            </div>
        );
    }
}