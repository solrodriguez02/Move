import { Api } from "./api.js";
  
class exerciseApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
    }

    static async getAllExercises(controller){
        return await Api.get(exerciseApi.getUrl(), true, controller);
    }

    static async createExercise(exerciseInfo, controller){
        return await Api.post(exerciseApi.getUrl(), true, exerciseInfo, controller);
    }

    static async getExercise(idExercise, controller){
        return await Api.get(exerciseApi.getUrl(idExercise), true, controller);
    }
    
    static async modifyExercise(idExercise, exerciseInfo, controller){
        return await Api.put(exerciseApi.getUrl(idExercise), true, exerciseInfo, controller);
    }

    static async deleteExercise(idExercise, controller){
        return await Api.delete(exerciseApi.getUrl(idExercise), true, controller);
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

export { exerciseApi, exerciseInfo }