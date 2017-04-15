import { httpPost, httpGet, route, nonRoutable, controller } from 'easy-express-controllers';
import WorkoutDAO from '../dataAccess/workoutDao';

@controller({ defaultVerb: 'post' })
export default class workoutController {
    @httpGet
    async search(){
        let workoutDao = new WorkoutDAO();
        var {workouts, sections} = await workoutDao.search();

        this.send({workouts, sections});
    }

    async save({workout, sections}){
        let workoutDAO = new WorkoutDAO();
        await workoutDAO.save(workout, sections);

        this.send({success: true})
    }
}