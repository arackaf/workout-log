import {action, observable, computed} from 'mobx';

class Line {
    content = '';
}

class Section {
    _id = '';
    name = '';
    notes = '';
    tags = [];
    lines = [];

    static from(sectionResult){
        let result = new Section();
        ['_id', 'name', 'notes', 'tags'].forEach(prop => result[prop] = workoutResult[prop]);
        result.lines = workoutResult.lines.map(l => {
            let newLine = new Line();
            newLine.content = l.content;
            return newLine;
        })
        return result;
    }
}

export default class Workout {
    _id = '';
    name = '';
    date = '';
    notes = '';
    tags = [];
    sections = [];

    static from(workoutResult){
        let result = new Workout();
        ['_id', 'name', 'date', 'notes', 'tags'].forEach(prop => result[prop] = workoutResult[prop]);

        result.sections = workoutResult.sections.map(s => Section.from(s));
    }
}