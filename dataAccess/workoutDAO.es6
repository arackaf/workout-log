import DAO from './dao';
import { ObjectId } from 'mongodb';

export default class WorkoutDAO extends DAO {
    async save(workout, sections){
        let db = await super.open();

        await db.collection('workouts').insert(workout);
        await Promise.all(sections.map(s => {
            s.workoutId = workout._id;
            return db.collection('sections').insert(s);
        }));
    }
}