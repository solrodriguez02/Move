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
    id: 0,
    src: 'backgrounds/md2.jpg',
    fav: true,
    name: 'mar',
    highlights: [
      0, ["glutes", "quads"], ["none"], 0
    ], 
    username: {
      name: 'Riquelme',
      img: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg'
    },
    time:'30 m',
    warm: [
      { name:'Left leg lunge', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
    ],
    cycles: [ {
      exercises: [
        { name:'Left leg lunge', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Right leg lunge', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Mill', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Legs up', sec:60, reps: 15, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
      ],
      reps: 2
    },
    {
      exercises: [
        { name:'Left leg lunge', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Mill', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
        { name:'Legs up', sec:60, reps: 15, image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
      ],
      reps: 1
    },
    ],
    cooling: [
      { name:'Left leg lunge', sec:30, reps: '-', image: 'https://storage.googleapis.com/sworkit-assets/images/exercises/standard/middle-frame/step-touch.jpg' },
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
  
  


export default { getRoutines, getRoutine, routines }