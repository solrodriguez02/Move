import { ref } from 'vue'
import { defineStore } from 'pinia'
import millImage from '@/assets/temporary/mill.png'
import legsUpImage from '@/assets/temporary/legsup.png'
import leftLungeImage from '@/assets/temporary/leftlunge.png'
import rightLungeImage from '@/assets/temporary/rightlunge.jpg'
import LegsDownImage from '@/assets/temporary/legsdown.png'

export const useCreateRoutineStore = defineStore('createRoutine', () => {

    const cycleExercises = ref([
        { name:'Mill', sec:30, reps: '-', image: millImage },
        { name:'Legs up', sec:60, reps: 15, image: legsUpImage },
        { name:'Left leg lunge', sec:'-', reps: 15, image: leftLungeImage },
        { name:'Right leg lunge', sec:'-', reps: 15, image: rightLungeImage },
        { name:'Legs down', sec:30, reps: 10, image: LegsDownImage },
        { name:'Mill', sec:45, reps: '-', image: millImage },
        { name:'Legs up', sec:30, reps: '-', image: legsUpImage },
        { name:'Left leg lunge', sec:15, reps: '-', image: leftLungeImage },
      ])
    
      const cycleExercises1 = ref([
        { name:'Left leg lunge', sec:30, reps: '-', image: leftLungeImage },
        { name:'Right leg lunge', sec:30, reps: '-', image: rightLungeImage },
        { name:'Legs down', sec:30, reps: 15, image: LegsDownImage },
        { name:'Mill', sec:45, reps: '-', image: millImage },
        { name:'Mill', sec:30, reps: '-', image: millImage },
        { name:'Legs up', sec:60, reps: 15, image: legsUpImage },
        { name:'Left leg lunge', sec:'-', reps: 15, image: leftLungeImage },
      ])
    
      const cycleList = ref([])

    /* Pense en implementar algo asi (para poder identificar los casos en los que se esta creando una rutina de cero
     de los casos donde se esta editando una existente): apenas se entra a la pagina se pregunta si existe una rutina 
     con ese id. Si existe, hace un fetch de sus ciclos y ejercicios y lo carga en cycleList. Si no existe, se llama a 
     funcion init que inicializa la rutina con 3 ciclos iniciales (son obligatorios creo) y sin ejercicios.
     Para facilitar el codigo habia pensado que se haga un POST recién cuando se guarda la rutina (save)

     Soy sol :)

    */
    
    function routineExists() {
        return false
    }

    /*function fetchRoutine(name) {
        return new Promise((resolve) => {
            Routines.getRoutine(name, (routine) => {
                if(routine) {
                    setCycles(routine)
                    resolve()
                }
                else {
                    setCycles(initCycles)
                }           
            })
        })
    }*/

    function getCycleLenght() {
        return cycleList.value.length
    }

    function init() {
        if(getCycleLenght() == 0) {
            pushCycle('Warm up', '$warm', 0)
            pushCycle('Cycle 1', '$fire', 1)
            pushCycle('Cooling', '$cool', 2)
        }
    }
    
    function addCycle() {    
        pushCycle('Cycle ' + (getCycleLenght() - 1), '$fire', getCycleLenght() - 1)
    }

    function pushCycle(name, icon, position) {
        cycleList.value.splice(position, 0, {
            name: name,
            icon: icon,
            reps: 1,
            exercises: ref([])
        });
    }

    function deleteCycle(index) {
        cycleList.value.splice(index, 1);
    }

    function addExercise(cycleIndex, exercise, secs, reps) {    
        pushExercise(cycleIndex, exercise, secs, reps)
    }

    function pushExercise(cycleIndex, exercise, secs, reps) {
        cycleList.value[cycleIndex].exercises.push( {
            name: exercise.name,
            sec: secs,
            reps: reps,
            image: exercise.image
        });
    }

    function deleteExercise() {
        // TODO 
    }
    
    return { cycleList, init, routineExists, getCycleLenght, addCycle, deleteCycle, addExercise, deleteExercise }
})