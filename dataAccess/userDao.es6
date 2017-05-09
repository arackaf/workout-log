import DAO from './dao';
import {ObjectId} from 'mongodb';

export default class UserDAO extends DAO {
    async login(id, displayName){
        let db = await super.open();
        
        let user = await db.collection('users').findOne({ _id: '' + id });

        if (!user){
            let newUser = { _id: id, id, displayName, confirmed: true };
            await db.collection('users').insert(newUser);
            return newUser;
        } else {
            return user;
        }
    }
}