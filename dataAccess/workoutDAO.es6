import DAO from './dao';
import WorkoutTagDao from './workoutTagDao';
import SectionTagDao from './sectionTagDao';
import {ObjectId} from 'mongodb';

export default class WorkoutDAO extends DAO {
    async save(workout, sections){
        let db = await super.open(),
            workoutTagDao = new WorkoutTagDao(),
            sectionTagDao = new SectionTagDao();

        let newTags = workout.tags.filter(t => !t._id);
        await Promise.all(newTags.map(t => workoutTagDao.addTag(t)));
        workout.tags = workout.tags.map(t => '' + t._id);
        
        for (let s of sections){
            let newTags = s.tags.filter(t => !t._id);
            await Promise.all(newTags.map(t => sectionTagDao.addTag(t))); //not ideal, but shouldn't matter in practice
            s.tags = s.tags.map(t => '' + t._id);
        }

        await db.collection('workouts').insert(workout);
        await Promise.all(sections.map(s => {
            s.workoutId = workout._id;
            return db.collection('sections').insert(s);
        }));
    }
}