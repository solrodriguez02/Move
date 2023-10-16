import { ref } from 'vue' 

const routines =  ref([         
  {
  src: 'backgrounds/bg.jpg',
  fav: true,
  name: 'mar',
  favs: 10,
  dif: 0,
  space: 0,
},
{
  src: 'backgrounds/md.jpg',
  fav: false,
  name: 'Senta senta',
  favs: 10,
  dif: 0,
  space: 1,
},
{
  src: 'backgrounds/bg-2.jpg',
  fav: true,
  name: 'cielo',
  favs: 100,
  dif: 1,
  space: 2,
},
{
  src: 'backgrounds/md2.jpg',
  fav: true,
  name: 'desierto',
  favs: 10,
  dif: 0,
  space: 0,
},
{
  src: 'backgrounds/md.jpg',
  fav: false,
  name: 'Senta senta',
  favs: 10,
  dif: 2,
  space: 2,
},
{
  src: 'backgrounds/bg-2.jpg',
  fav: false,
  name: 'cielo',
  favs: 10,
  dif: 0,
  space: 0,
},
{
  src: 'backgrounds/md2.jpg',
  fav: false,
  name: 'desierto',
  favs: 0,
  dif: 0,
  space: 0,
},
])
  
function getRoutines(okCallback) {
    setTimeout(() => okCallback(routines), 3000)
}

function getRoutine(name, okCallback, errorCallback) {
    setTimeout(() => {
      const routine = routines.find((routine) => routine.name === name);
      if (routine) 
        okCallback(routine);
      else 
        errorCallback('Routine not found'); 
    }, 3000);
  }
  
export default { getRoutines, getRoutine, routines }