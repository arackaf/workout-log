import { httpPost, route, nonRoutable, controller } from 'easy-express-controllers';
import WorkoutDAO from '../dataAccess/workoutDao';

@controller({ defaultVerb: 'post' })
export default class workoutController {
    async save({workout, sections}){
        let workoutDAO = new WorkoutDAO();
        await workoutDAO.save(workout, sections);

        this.send({success: true})
    }
}