import { ref } from 'vue'
import { defineStore } from 'pinia'
import { RoutineApi } from '@/api/routines'
import { CycleApi, cycleInfo } from '@/api/cycle'
import { useRoutineStore } from '@/store/RoutineStore'

export const useCreateRoutineStore = defineStore('createRoutine', () => {
    
    const routineStore = new useRoutineStore()
    const cycleList = ref([])

    /* Pense en implementar algo asi (para poder identificar los casos en los que se esta creando una rutina de cero
     de los casos donde se esta editando una existente): apenas se entra a la pagina se pregunta si existe una rutina 
     con ese id. Si existe, hace un fetch de sus ciclos y ejercicios y lo carga en cycleList. Si no existe, se llama a 
     funcion init que inicializa la rutina con 3 ciclos iniciales (son obligatorios creo) y sin ejercicios.
     Para facilitar el codigo habia pensado que se haga un POST recién cuando se guarda la rutina (save)

     Soy sol :)

    */
    

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
        cycleList.value[cycleIndex].exercises.push( {
            name: exercise.name,
            sec: secs,
            reps: reps,
            image: exercise.image
        });
    }

    function deleteExercise(cycleIndex, exerciseIndex) {
        cycleList.value[cycleIndex].exercises.splice(exerciseIndex, 1)
    }

    async function sendNewRoutine(routineInfo){
        const routineResult = await RoutineApi.createRoutine(routineInfo, true)
        for(const cycle = 0; cycle < getCycleLenght(); cycle++){
            const currentCycle = cycleList[cycle]
            const currentCycleInfo = new cycleInfo(currentCycle.name, cycle, "", "", reps, { src: icon})
            const currentCycleResult = await RoutineApi.createCycle(routineResult.id, currentCycleInfo, true)
            for (const exercise = 0; exercise < currentCycle.exercises.lenght; exercise++){
                await CycleApi.addExercise(currentCycleResult.id, currentCycle.exercises[exercise], true)
            }
        }
    }

    async function sendEditRoutine(routineInfo){
        const routineResult = await RoutineApi.modifyRoutine(routineInfo.id, routineInfo, true)
        for (const cycle = 0; cycle < getCycle; cycle++){
            const currentCycle = cycleList[cycle]
            const currentCycleResult = await RoutineApi.modifyCycle(routineResult.id, currentCycle, true)

        }
    }

    
    return { cycleList, init, getCycleLenght, addCycle, deleteCycle, addExercise, deleteExercise, sendNewRoutine }
})