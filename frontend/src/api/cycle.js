import { Api } from "./api.js";

export {CycleApi, cycleInfo, exerciseSpecification}

class CycleApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/cycles${ slug ? `/${slug}` : ""}`;
    }

    static async addExercise(idCycle, exerciseInfo, controller){
        return await Api.post(CycleApi.getUrl(idCycle.append("/exercises")), true, exerciseInfo, controller);
    }

    static async getExercises(idCycle, controller){
        return await Api.get(CycleApi.getUrl(idCycle), true, controller);
    }
    
    static async modifyCycleExercise(idCycle, idExercise, exerciseInfo, controller){
        return await Api.put(CycleApi.getUrl(idCycle.append("/execises/")).append(idExercise), true, exerciseInfo, controller);
    }

    static async deleteCycleExercise(idCycle, idExercise, controller){
        return await Api.delete(CycleApi.getUrl(idCycle.append("/execises/")).append(idExercise), true, controller);
    }   

}

class cycleInfo{
    constructor(name, order, detail, type, repetitions, metadata){
        this.name = name;
        this.order = order;
        this.detail = detail;
        this.type = type;
        this.repetitions = repetitions;
        this.metadata = metadata;
    }
}

class exerciseSpecification{
    constructor(order, duration, repetitions){
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}