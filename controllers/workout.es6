import { httpPost, route, nonRoutable, controller } from 'easy-express-controllers';

@controller({ defaultVerb: 'post' })
export default class workoutController {
    save(){
        console.log('SAVE');
    }
}