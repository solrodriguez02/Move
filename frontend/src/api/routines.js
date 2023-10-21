import { ref } from 'vue' 

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

  class routineApi {
    static getUrl(slug) {
        return `${Api.baseUrl}/routines${ slug ? `/${slug}` : ""}`;
    }

    static async getAllRoutines(controller){
        var ans = await Api.get(routineApi.getUrl(), true, controller) ;
        ans = ans.content                             
        return new routinePrevInfo( ans.id, ans.name, ans.detail, ans.user, ans.score, ans.metadata )
    }

    static async createRoutine(routineInfo, controller){
        return await Api.post(routineApi.getUrl(), true, routineInfo, controller);
    }

    static async getRoutineId(idRoutine, controller){
        return await Api.get(routineApi.getUrl(idRoutine), true, controller);
    }
    
    static async modifyRoutine(idRoutine, routineInfo, controller){
        return await Api.put(routineApi.getUrl(idRoutine), true, routineInfo, controller);
    }

    static async deleteRoutine(idRoutine, controller){
        return await Api.delete(routineApi.getUrl(idRoutine), true, controller);
    }   
}

class routinePrevInfoGet {
  constructor(name, detail, user, score, metadata){
      // detail tienen solo los filtros 
      // > detail = [ ]
      // metadata = src
      this.id = id; 
      this.name = name;
      this.fav = 
      this.favs = score;
      this.src = metadata; 
  }
}


class routinePrevInfoPost {
  constructor(name, detail, user, categories, metadata){
      // detail tienen solo los filtros 
      // > detail = [ ]
      // metadata = src
      this.name = name;
      this.src = detail; 
      this.fav = metadata[0]
      this.favs = metadata[1]; 
      this.filter = categories
  }
}


class routineInfo {
    constructor(id, name, detail, user, metadata){
        this.name = name;
        this.detail = detail;
        this.user = user;
        this.metadata = metadata;
    }
}

export default { routineApi, routineInfo, routinePrevInfoPost, getRoutines, getRoutine, routines }