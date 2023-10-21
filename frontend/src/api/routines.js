import { ref } from 'vue' 
import { Api } from "./api.js";

const routines =  ref([         
  {
  id: 0,
  src: 'backgrounds/bg.jpg',
  fav: true,
  name: 'mar',
  favs: 10,
  dif: 0,
  space: 0,
},
{
  id: 1,
  src: 'backgrounds/md.jpg',
  fav: false,
  name: 'Senta senta',
  favs: 10,
  dif: 0,
  space: 1,
},
{
  id: 2,
  src: 'backgrounds/bg-2.jpg',
  fav: true,
  name: 'cielo',
  favs: 100,
  dif: 1,
  space: 2,
},
{
  id: 3,
  src: 'backgrounds/md2.jpg',
  fav: true,
  name: 'desierto',
  favs: 10,
  dif: 0,
  space: 0,
},
{
  id: 4,
  src: 'backgrounds/md.jpg',
  fav: false,
  name: 'Senta senta',
  favs: 10,
  dif: 2,
  space: 2,
},
{
  id: 5,
  src: 'backgrounds/bg-2.jpg',
  fav: false,
  name: 'cielo',
  favs: 10,
  dif: 0,
  space: 0,
},
{
  id: 6,
  src: 'backgrounds/md2.jpg',
  fav: false,
  name: 'desierto',
  favs: 0,
  dif: 0,
  space: 0,
},
])
  
const routinesData = ref(
  [{
    id:0,
    src: 'backgrounds/md2.jpg',
    fav: true,
    name: 'mar',
    highlights: [
      0, ["glutes", "quads"], ["none"], 0
    ], 
    user: {
      name: 'Riquelme',
      img: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg'
    },
    time:'30 m',
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
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }

    static async createRoutine(routinePrevInfoPost, controller){
        return await Api.post(RoutineApi.getUrl(), true, routinePrevInfoPost, controller);
    }

    static async getAllRoutines(controller){
      return await Api.get(RoutineApi.getUrl(), true, controller);
      
    }

    static async modifyRoutine(idRoutine, routineInfo, controller){
        return await Api.put(RoutineApi.getUrl(idRoutine), true, routineInfo, controller);
    }

    static async deleteRoutine(idRoutine, routineInfo, controller){
        return await Api.delete(RoutineApi.getUrl(idRoutine), true, routineInfo, controller);
    }   
    
    static async createCycle(idRoutine, cycleInfo, controller){
        return await Api.post(RoutineApi.getUrl(idRoutine.append("/cycles")), true, cycleInfo, controller);
    }

    static async getAllRoutineCycles(idRoutine, routineInfo, controller){
        return await Api.get(RoutineApi.getUrl(idRoutine.append("/cycles")), true, routineInfo, controller);
    }

    static async modifyCycle(idRoutine, idCycle, cycleInfo, controller){
        return await Api.put(RoutineApi.getUrl(idRoutine.append("/cycles/")).append(idCycle), true, cycleInfo, controller);
    }

    static async deleteCycle(idRoutine, idCycle, controller){
        return await Api.delete(RoutineApi.getUrl(idRoutine.append("/cycles/")).append(idCycle), true, controller);
    }
}
  

class routineInfo {
  constructor(id, name, detail, user, difficulty, categories, metadata){
      this.id = id; 
      this.name = name;
      this.src = detail; 
      this.user = {
        id: user.id,
        name: user.username,
      }
      this.fav = metadata.fav
      this.favs = metadata.favs
      this.filter[0] = difficulty
      this.filter[1] = categories.elementsRequiredId
      this.filter[2] = categories.requiredSpaceId
      this.filter[3] = categories.approachId
  }
}


class routinePrevInfoPost {
  constructor(name, detail, difficultyId, elementsRequiredArray, requiredSpaceId, approachId ){
      // elementos = [], el resto son vals
      this.name = name;
      this.src = detail; 
      this.difficulty = "rooky"                 // campo obligatorio 
      this.metadata = {
        "fav": 0,
        "favs": 0,
        "filters": {
          "difficulty": difficultyId,
          "elements": elementsRequiredArray, 
          "requiredSpaceId": requiredSpaceId, 
          "approachId": approachId
        }
      };
      this.isPublic = true;                     // campo obligatorio 
  }
}


export default { RoutineApi, routinePrevInfoPost, routineInfo, routinePrevInfoPost, getRoutines, getRoutine, routines }