import DAO from './dao';
import { ObjectId } from 'mongodb';

export default class WorkoutTagDAO extends DAO {
    async addTag(tag){
        let db = await super.open();

        debugger;
        return db.collection('workoutTags').insert(tag);
    }
}