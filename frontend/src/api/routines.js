import { ref } from 'vue' 
import { Api } from "./api.js";

  
const routines = ref([])
const routinesData = ref(
  [{
    id:0, 
    src: 'backgrounds/md2.jpg',
    fav: true, // nop, llamo local mapa favsUser
    name: 'mar',
    highlights: [ //todo filters
      0, ["glutes", "quads"], ["none"], 0
    ], 
    user: {
      name: 'Riquelme',
      img: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg'
    },
    time:'30 m', //todo se calcula 
    updated: false,
    warm: [
      { name:'Left leg lunge', sec:30, reps: '-', id:0, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
    ],
    cycles: [ {
      exercises: [
        { name:'Left leg lunge', sec:30, reps: '-', id:0, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Right leg lunge', sec:30, reps: '-', id:1, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Mill', sec:30, reps: '-', id:2, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Legs up', sec:60, reps: 15, id:3, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
      ],
      reps: 2
    },
    {
      exercises: [
        { name:'Right leg lunge', sec:30, reps: '-', id:1, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Mill', sec:30, reps: '-', id:2, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Legs up', sec:60, reps: 15, id:3, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
      ],
      reps: 1
    },
    ],
    cooling: [
      { name:'Left leg lunge', sec:30, reps: '-', id:0, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
    ]
  },
  ]
);

function getRoutines(okCallback) {
    setTimeout(() => okCallback(routines), 3000)
}

//, errorCallback
function getRoutine(id, okCallback) {
    setTimeout(() => {
      const routine = routinesData.value.find((routine) => routine.id == id);
      if (routine) {
        okCallback(routine);
      }
      else 
        //errorCallback('Routine not found'); 
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


    static async getAllRoutines( queryGetRoutines, controller ){
      return await Api.getWithParam(RoutineApi.getUrl(), true, queryGetRoutines, controller);
      
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
      // elementos = [], el resto son vals
      this.name = name;
      this.detail = src; 
      this.isPublic = true;                     // campo obligatorio 
      this.difficulty = "rookie"                 // campo obligatorio 
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
  constructor(page, size, order,direction, id ){
    this.page = page
    if ( size!=null)
      this.size = size 
    if ( order!=null)
      this.orderBy = order
    if ( direction!=null)
      this.direction = direction
    if ( id!=null)
      this.routineId
  }
}


export { RoutineApi, routinePrevInfo, routineInfo, getRoutines, getRoutine, routines, queryGetRoutines }
