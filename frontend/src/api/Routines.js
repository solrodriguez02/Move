import { ref } from 'vue' 

const routines =  ref([         
  {
  src: 'backgrounds/bg.jpg',
  fav: false,
  name: 'mar'
},
{
  src: 'backgrounds/md.jpg',
  fav: false,
  name: 'Senta senta'
},
{
  src: 'backgrounds/bg-2.jpg',
  fav: false,
  name: 'cielo'
},
{
  src: 'backgrounds/md2.jpg',
  fav: false,
  name: 'desierto'
},
{
  src: 'backgrounds/md.jpg',
  fav: false,
  name: 'Senta senta'
},
{
  src: 'backgrounds/bg-2.jpg',
  fav: false,
  name: 'cielo'
},
{
  src: 'backgrounds/md2.jpg',
  fav: false,
  name: 'desierto'
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
  
export default { getRoutines, getRoutine }