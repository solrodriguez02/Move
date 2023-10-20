import { Api } from "./api.js";

export { RoutineApi, routineInfo, cycleApi, cycleInfo, resultQueryInfo, exerciseApi, exerciseSpecification, exerciseInfo}

class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }

    static async createRoutine(routineInfo, controller){
        return await Api.post(UserApi.getUrl(), true, routineInfo, controller);
    }

    static async getAllRoutine(routineInfo, controller){
        return await Api.get(UserApi.getUrl(), true, routineInfo, controller);
    }

    static async modifyRoutine(idRoutine, routineInfo, controller){
        return await Api.put(UserApi.getUrl(idRoutine), true, routineInfo, controller);
    }

    static async deleteRoutine(idRoutine, routineInfo, controller){
        return await Api.delete(UserApi.getUrl(idRoutine), true, routineInfo, controller);
    }   
    
    static async createCycle(idRoutine, cycleInfo, controller){
        return await Api.post(UserApi.getUrl(idRoutine.append("/cycles")), true, cycleInfo, controller);
    }

    static async getAllRoutineCycles(idRoutine, routineInfo, controller){
        return await Api.get(UserApi.getUrl(idRoutine.append("/cycles")), true, routineInfo, controller);
    }

    static async modifyCycle(idRoutine, idCycle, cycleInfo, controller){
        return await Api.put(UserApi.getUrl(idRoutine.append("/cycles/")).append(idCycle), true, cycleInfo, controller);
    }

    static async deleteCycle(idRoutine, idCycle, controller){
        return await Api.delete(UserApi.getUrl(idRoutine.append("/cycles/")).append(idCycle), true, controller);
    }
}

class routineInfo{
    constructor(name, difficulty, elementsRequiredId, requiredSpaceId, approachId, routineImage){
        this.name = name;
        this.difficulty = difficulty;
        this.category = { "elementsRequiredId": elementsRequiredId, "requiredSpaceId": requiredSpaceId, "approachId": approachId};
        this.metadata = { "image": routineImage};
    }
}
class exerciseSpecification{
    constructor(order, duration, repetitions){
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
    }
}
