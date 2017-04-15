import DAO from './dao';
import WorkoutTagDao from './workoutTagDao';
import SectionTagDao from './sectionTagDao';
import {ObjectId} from 'mongodb';

export default class WorkoutDAO extends DAO {
    async save(workout, sections){
        let db = await super.open(),
            workoutTagDao = new WorkoutTagDao(),
            sectionTagDao = new SectionTagDao();
        
        let newSectionTagMap = {};
        for (let s of sections){
            for (let t of (s.tags.filter(t => /^new_/.test(t._id)))) {
                let id = t._id.split('_')[1];
                if (newSectionTagMap[id]){
                    t._id = newSectionTagMap[id];
                } else {
                    delete t._id;
                    await sectionTagDao.addTag(t);
                    t._id = '' + t._id;
                    newSectionTagMap[id] = t._id;
                }
            };
            s.tags = s.tags.map(t => '' + t._id);
        }

        await Promise.all(sections.map(s => {
            return db.collection('sections').insert(s);
        }));
        let sectionIds = sections.map(s => '' + s._id);
        workout.sections = sectionIds;

        let newTags = workout.tags.filter(t => /^new_/.test(t._id));
        newTags.forEach(t => { delete t._id; });
        
        await Promise.all(newTags.map(t => workoutTagDao.addTag(t)));
        workout.tags = workout.tags.map(t => '' + t._id);

        await db.collection('workouts').insert(workout);
    }

    async search(){
        let db = await super.open();

        let workouts = await db.collection('workouts').find({}).sort({_id : -1}).toArray();
        let sectionIds = [...new Set(workouts.reduce((sectionIds, w) => sectionIds.concat(w.sections), []))];

        let sections = await db.collection('sections').find({ _id: { $in: sectionIds.map(_id => ObjectId(_id)) } }).toArray();

        return {workouts, sections};
    }
}