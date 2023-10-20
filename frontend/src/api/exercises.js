import millImage from '@/assets/temporary/mill.png';
import legsUpImage from '@/assets/temporary/legsup.png';
import leftLungeImage from '@/assets/temporary/leftlunge.png';
import rightLungeImage from '@/assets/temporary/rightlunge.jpg';
import LegsDownImage from '@/assets/temporary/legsdown.png';

const exercises = [
    { name:'Mill', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: millImage, link:'/exercise'},
    { name:'Legs up', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: legsUpImage, link:'/exercise'},
    { name:'Left leg lunge', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: leftLungeImage, link:'/exercise'},
    { name:'Right leg lunge', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: rightLungeImage, link:'/exercise'},
    { name:'Legs down', difficulty:'medium', muscleGroups:'glutes', elements:'none', space:'Ideal for reduced spaces', description:'...', image: LegsDownImage, link:'/exercise'}
]
  
function getExercises(okCallback) {
    setTimeout(() => okCallback(exercises), 3000)
}
  
class exerciseApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
    }

    static async getAllExercises(controller){
        return await Api.get(UserApi.getUrl(), true, controller);
    }

    static async createExercise(exerciseInfo, controller){
        return await Api.post(UserApi.getUrl(), true, exerciseInfo, controller);
    }

    static async getExercise(idExercise, controller){
        return await Api.get(UserApi.getUrl(idExercise), true, controller);
    }
    
    static async modifyExercise(idExercise, exerciseInfo, controller){
        return await Api.put(UserApi.getUrl(idExercise), true, exerciseInfo, controller);
    }

    static async deleteExercise(idExercise, controller){
        return await Api.delete(UserApi.getUrl(idExercise), true, controller);
    }   
}


class exerciseInfo{
    constructor(name, detail, type, metadata){
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.metadata = metadata;
    }
}

export {getExercises, exerciseApi, exerciseInfo, exercises}