import DAO from './dao';
import WorkoutTagDao from './workoutTagDao';
import {ObjectId} from 'mongodb';

export default class WorkoutDAO extends DAO {
    async save(workout, sections){
        let db = await super.open(),
            workoutTagDao = new WorkoutTagDao();

        let newTags = workout.tags.filter(t => !t._id);
        await Promise.all(newTags.map(t => workoutTagDao.addTag(t)));

        await db.collection('workouts').insert(workout);
        await Promise.all(sections.map(s => {
            s.workoutId = workout._id;
            return db.collection('sections').insert(s);
        }));
    }
}