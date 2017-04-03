import DAO from './dao';
import { ObjectId } from 'mongodb';

export default class WorkoutTagDAO extends DAO {
    async load(){
        let db = await super.open();
        return (db.collection('workoutTags').find({}).toArray());
    }
    async addTag(tag){
        let db = await super.open();

        return db.collection('workoutTags').insert(tag);
    }
}