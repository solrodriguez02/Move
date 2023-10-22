import { ref } from 'vue'
import { defineStore } from 'pinia'
import { RoutineApi } from '@/api/routines'
import { CycleApi, cycleInfo, exerciseSpecification } from '@/api/cycle'
import { useRoutineStore } from '@/store/RoutineStore'
import { exerciseApi } from '@/api/exercises'

export const useCreateRoutineStore = defineStore('createRoutine', () => {
    
    const routineStore = new useRoutineStore()
    const cycleList = ref([])
    var firstInit = ref(true)
    var isNewRoutine = ref(true)

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

    async function init() {
        if(!routineStore.routineData && firstInit) {
            pushCycle('Warm up', '$warm', 0)
            pushCycle('Cycle 1', '$fire', 1)
            pushCycle('Cooling', '$cool', 2)
            firstInit = false
        }
        else{
            isNewRoutine = false;
            const routineResult = await RoutineApi.getRoutineById(routineStore.routineData.id, true)
            const cyclesResult = await RoutineApi.getAllRoutineCycles(routineResult.id, {}, true);
            const cycleList = cyclesResult.content;
            for(var cycle = 0; cycle < cycleList.length; cycle++){
                var currentCycle = cycleList.value[cycle]
                //aca no nos guardamos del ejercicio cual es el type por eso queda hardcodeado como si fuera de exercise
                pushCycle(currentCycle.name, '$fire', cycle)
                var cycleExercisesResult = await CycleApi.getExercises(currentCycle.id, true)
                var exercisesList = cycleExercisesResult.content
                for (var exercise = 0; exercise < exercisesList.length; exercise++){
                    var currentExercise = currentCycle.exercises[exercise]
                    var exerciseInfo = exerciseApi.getExercise(currentExercise.id, true)
                    //faltaba el parametro de image porque estaba en el capo de metadata que no se devuelve en el get de los ejercicios del ciclo
                    var toPass = {
                        id: exerciseInfo.id,
                        name: exerciseInfo.name,
                        image: exerciseInfo.image
                    }
                    addExercise(currentCycle.id, toPass, currentExercise.secs, currentExercise.reps)
                }
            }
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
        if (!isNewRoutine)
            CycleApi.deleteCycle(routineStore.routineData.id, cycleList[index].id, true)
    }

    function addExercise(cycleIndex, exercise, secs, reps) {    
        cycleList.value[cycleIndex].exercises.push( {
            id: exercise.id,
            name: exercise.name,
            sec: secs,
            reps: reps,
            image: exercise.image
        });
    }

    function deleteExercise(cycleIndex, exerciseIndex) {
        cycleList.value[cycleIndex].exercises.splice(exerciseIndex, 1)
        if (!isNewRoutine)
            CycleApi.deleteCycleExercise(cycleList[cycleIndex].id, cycleList[cycleIndex].exercises[exerciseIndex.id], true)
    }

    async function sendNewRoutine(routineInfo){
        const routineResult = await RoutineApi.createRoutine(routineInfo, true)
        for(var cycle = 0; cycle < getCycleLenght(); cycle++){
            var currentCycle = cycleList.value[cycle]
            var currentCycleInfo = new cycleInfo(currentCycle.name, cycle+1, "", "exercise", currentCycle.reps, { src: currentCycle.icon})
            var currentCycleResult = await RoutineApi.createCycle(routineResult.id, currentCycleInfo, true)
            for (var exercise = 0; exercise < currentCycle.exercises.length; exercise++){
                var currentExercise = currentCycle.exercises[exercise]
                var exerciseInfo = new exerciseSpecification(exercise+1, currentExercise.sec === '-' ? 0: currentExercise.sec, currentExercise.reps === '-' ? 0: currentExercise.reps)
                await CycleApi.addExercise(currentCycleResult.id, currentExercise.id, exerciseInfo, true)
            }
        }
    }

    async function sendEditRoutine(routineInfo){
        const routineResult = await RoutineApi.modifyRoutine(routineInfo.id, routineInfo, true)
        //se llama tras apretar el boton de save en el createRoutine
        //solo llena la data de las categorias, el nombre y una imagen
        //para el resto se necesita modificar o crear otras funciones que reflejen en el API los cambios dentro de cada ciclo de ejercicios
    }

    
    return { cycleList, init, getCycleLenght, addCycle, deleteCycle, addExercise, deleteExercise, sendNewRoutine, sendEditRoutine}
})