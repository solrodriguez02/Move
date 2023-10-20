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

class cycleInfo{
    constructor(name, order){
        this.name = name;
        this.order = order;
    }
}