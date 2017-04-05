import { httpPost, route, nonRoutable, controller } from 'easy-express-controllers';
import WorkoutTagDAO from '../dataAccess/workoutTagDao';
import SectionTagDAO from '../dataAccess/sectionTagDao';

@controller({ defaultVerb: 'get' })
export default class TagController {
    async workout(){
        let workoutTagDAO = new WorkoutTagDAO();
        let results = await workoutTagDAO.load();

        this.send({success: true, tags: results});
    }
    async section(){
        let sectionTagDAO = new SectionTagDAO();
        let results = await sectionTagDAO.load();

        this.send({success: true, tags: results});
    }    
}