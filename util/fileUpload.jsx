import React, {Component} from 'react';

export class FileUpload extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }
    componentDidMount() {
        $(this.el).fileupload({
            dataType: 'json',
            done: function (e, data) {
                debugger;
            }
        });
    }
    render() {
        return (
            <div>
                <input ref={el => this.el = el} id="fileupload" type="file" name="files[]" data-url="/upload/video" />
            </div>
        );
    }
}