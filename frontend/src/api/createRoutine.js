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

class cycleApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/cycles${ slug ? `/${slug}` : ""}`;
    }

    static async addExercise(idCycle, cycleInfo, controller){
        return await Api.post(UserApi.getUrl(idCycle.append("/exercises")), true, cycleInfo, controller);
    }

    static async getExercises(idCycle, controller){
        return await Api.get(UserApi.getUrl(idCycle), true, controller);
    }
    
    static async modifyCycleExercise(idCycle, idExercise, exerciseInfo, controller){
        return await Api.put(UserApi.getUrl(idCycle.append("/execises/")).append(idExercise), true, exerciseInfo, controller);
    }

    static async deleteCycleExercise(idCycle, idExercise, controller){
        return await Api.delete(UserApi.getUrl(idCycle.append("/execises/")).append(idExercise), true, controller);
    }   

}

class exerciseApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/exercises${ slug ? `/${slug}` : ""}`;
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


class routineInfo{
    constructor(name, difficulty, elementsRequiredId, requiredSpaceId, approachId, routineImage){
        this.name = name;
        this.difficulty = difficulty;
        this.category = { "elementsRequiredId": elementsRequiredId, "requiredSpaceId": requiredSpaceId, "approachId": approachId};
        this.metadata = { "image": routineImage};
    }
}

class resultQueryInfo{
    constructor(categoryId, userId, difficulty, score, search, page, size, orderBy, date, direction){
        this.categoryId = categoryId; 
        this.userId = userId; 
        this.difficulty = difficulty; 
        this.score = score; 
        this.search = search; 
        this.page = page; 
        this.size = size; 
        this.orderBy = orderBy; 
        this.date = date; 
        this.direction = direction;
    }
}

class cycleInfo{
    constructor(name, order){
        this.name = name;
        this.order = order;
    }
}

class exerciseSpecification{
    constructor(order, duration, repetitions){
        this.order = order;
        this.duration = duration;
        this.repetitions = repetitions;
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