const routines = [
    
]
  
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