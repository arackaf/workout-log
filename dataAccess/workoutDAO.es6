import DAO from './dao';
import WorkoutTagDao from './workoutTagDao';
import SectionTagDao from './sectionTagDao';
import {ObjectId} from 'mongodb';

export default class WorkoutDAO extends DAO {
    async save(workout, sections){
        let db = await super.open(),
            workoutTagDao = new WorkoutTagDao(),
            sectionTagDao = new SectionTagDao();

        let newTags = workout.tags.filter(t => /^new_/.test(t._id));
        await Promise.all(newTags.map(t => workoutTagDao.addTag(t)));
        workout.tags = workout.tags.map(t => '' + t._id);
        
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

        await db.collection('workouts').insert(workout);
        await Promise.all(sections.map(s => {
            s.workoutId = workout._id;
            return db.collection('sections').insert(s);
        }));
    }
}