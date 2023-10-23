import { ref } from 'vue' 
import { Api } from "./api.js";

  
const routines = ref([])
const routinesData = ref([]);

function getRoutines(okCallback) {
    setTimeout(() => okCallback(routines), 3000)
}

function getRoutine(id, okCallback) {
    setTimeout(() => {
      const routine = routinesData.value.find((routine) => routine.id == id);
      if (routine) {
        okCallback(routine);
      }
      else 
        console.log('Routine not found');
    }, 3000);

  }

  class RoutineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`.toString();
    }

    static async createRoutine(routinePrevInfoPost, controller){
        return await Api.post(RoutineApi.getUrl(), true, routinePrevInfoPost, controller);
    }


    static async getAllRoutines( queryGet, controller ){
      return await Api.getWithParam(RoutineApi.getUrl() + appendParams(queryGet) , false, queryGetRoutines, controller);
      
    }

    static async getRoutineById( idRoutine, controller ){
      return await Api.get(RoutineApi.getUrl(idRoutine), true, controller);
    }

    static async modifyRoutine(idRoutine, routineInfo, controller){
        return await Api.put(RoutineApi.getUrl(idRoutine), true, routineInfo, controller);
    }

    static async deleteRoutine(idRoutine, controller){
        return await Api.delete(RoutineApi.getUrl(idRoutine), true, controller);
    }   
    
    static async createCycle(idRoutine, cycleInfo, controller){
        return await Api.post(RoutineApi.getUrl(idRoutine).concat("/cycles"), true, cycleInfo, controller);
    }

    static async getAllRoutineCycles(idRoutine, routineInfo, controller){
        return await Api.get(RoutineApi.getUrl(idRoutine).concat("/cycles"), true, routineInfo, controller);
    }

    static async modifyCycle(idRoutine, idCycle, cycleInfo, controller){
        return await Api.put(RoutineApi.getUrl(idRoutine).concat("/cycles/").concat(idCycle.toString()), true, cycleInfo, controller);
    }

    static async deleteCycle(idRoutine, idCycle, controller){
        return await Api.delete(RoutineApi.getUrl(idRoutine).concat("/cycles/").concat(idCycle.toString()), true, controller);
    }
}
  

class routineInfo {
  constructor( id, name, detail, fav=false, metadata, user, cyclesArray=[] ){
      this.id = id; 
      this.name = name;
      this.src = detail; 
      this.fav = fav 
      this.favs = metadata.favs
      this.filters = metadata.filters
      this.user = {
        id: user.id,
        name: user.username,
        img: user.avatarUrl
      }
      this.cycles = cyclesArray
  }
}

class routinePrevInfo {
  constructor( name, src,favsNum, difficultyId, elementsRequiredArray, requiredSpaceId, approachId ){
      this.name = name;
      this.detail = src; 
      this.isPublic = true;                  
      this.difficulty = "rookie"                 
      this.metadata = {
        favs: favsNum,
        filters: {
          difficulty: difficultyId,
          elements: elementsRequiredArray, 
          requiredSpace: requiredSpaceId, 
          approach: approachId
        }
      };
  }
}

class queryGetRoutines {
  constructor(userId, page=0, size=50, order,direction ){
    if ( userId!=null)
      this.userId = userId
    this.page = page; 
    if ( size!=null)
    this.size = size; 
    if( order!=null)
    this.orderBy = order; 
    if( direction!=null)
    this.direction = direction;
  }
  
}
function appendParams(query) {
  if ( query==undefined)
    return ''
  var ans = "?" + new URLSearchParams(query)
  
  return ans
}

export { RoutineApi, routinePrevInfo, routineInfo, getRoutines, getRoutine, routines, queryGetRoutines }
