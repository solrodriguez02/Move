import { Api } from "./api.js";

class cycleApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/cycles${ slug ? `/${slug}` : ""}`;
    }

    static async addExercise(idCycle, cycleInfo, controller){
        return await Api.post(cycleApi.getUrl(idCycle.append("/exercises")), true, cycleInfo, controller);
    }

    static async getExercises(idCycle, controller){
        return await Api.get(cycleApi.getUrl(idCycle), true, controller);
    }
    
    static async modifyCycleExercise(idCycle, idExercise, exerciseInfo, controller){
        return await Api.put(cycleApi.getUrl(idCycle.append("/execises/")).append(idExercise), true, exerciseInfo, controller);
    }

    static async deleteCycleExercise(idCycle, idExercise, controller){
        return await Api.delete(cycleApi.getUrl(idCycle.append("/execises/")).append(idExercise), true, controller);
    }   

}

class cycleInfo{
    constructor(name, order){
        this.name = name;
        this.order = order;
    }
}