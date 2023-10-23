import { ref } from 'vue'
import { defineStore } from 'pinia'
import { RoutineApi } from '@/api/routines'
import { CycleApi, cycleInfo, exerciseSpecification } from '@/api/cycle'
import { useRoutineStore } from '@/store/RoutineStore'
import { exerciseApi } from '@/api/exercises'

export const useCreateRoutineStore = defineStore('createRoutine', () => {
    
    const cycleList = ref([])

    function getCycleLenght() {
        return cycleList.value.length
    }

    function init() {
        cycleList.value = []
        pushCycle('Warm up', '$warm', 0)
        pushCycle('Cycle 1', '$fire', 1)
        pushCycle('Cooling', '$cool', 2)
    }

    async function setRoutine(id) {
        cycleList.value = []
        const routineResult = await RoutineApi.getRoutineById(id, true)
        const cyclesResult = await RoutineApi.getAllRoutineCycles(routineResult.id, {}, true)
        const cycles = cyclesResult.content
        const index = ref(0)
        for(const currentCycle of cycles){
            pushExistingCycle(currentCycle.name, '$fire', currentCycle.repetitions, 'none', currentCycle.id)
            var cycleExercisesResult = await CycleApi.getExercises(currentCycle.id, true)
            var exercisesList = cycleExercisesResult.content
            for (const currentExercise of exercisesList){
                var exerciseInfo = await exerciseApi.getExercise(currentExercise.exercise.id, true)
                var toPass = {
                    id: exerciseInfo.id,
                    name: exerciseInfo.name,
                    image: exerciseInfo.metadata.image
                }
                addExercise(index.value, toPass, currentExercise.duration, currentExercise.repetitions, 'none', true)
            }
            index.value++
        }
    }

    function pushExistingCycle(name, icon, reps, status, id) {
        cycleList.value.push ({
            name: name,
            icon: icon,
            reps: reps,
            exercises: ref([]),
            status: status,
            id: id,
            existed: true
        })
    }
    
    function addCycle(status=null, existed=false) {    
        pushCycle('Cycle ' + (getCycleLenght() - 1), '$fire', getCycleLenght() - 1, status, existed)
    }

    function pushCycle(name, icon, position, status=null, existed=false) {
        cycleList.value.push({
            name: name,
            icon: icon,
            reps: 1,
            exercises: ref([]),
            status: status,
            existed: existed,
        });
    }

    function deleteCycle(index) {
        cycleList.value.pop()
    }

    function deleteExistingCycle(index) {
        cycleList.value[index].status = 'delete'
    }

    function addExercise(cycleIndex, exercise, secs, reps, status=null, existed=false) {    
        cycleList.value[cycleIndex].exercises.push( {
            id: exercise.id,
            name: exercise.name,
            sec: secs,
            reps: reps,
            image: exercise.image,
            status: status,
            existed: existed
        });
    }

    function deleteExercise(cycleIndex, exerciseIndex) {
        cycleList.value[cycleIndex].exercises.splice(exerciseIndex, 1)
    }

    function deleteExistingExercise(cycleIdx, exerciseIdx) {
        cycleList.value[cycleIdx].exercises[exerciseIdx].status = 'delete'
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

    async function sendEditRoutine(routineId, routineInfo){
        await RoutineApi.modifyRoutine(routineId, routineInfo, true)
        
        for(var cycle = 0; cycle < getCycleLenght(); cycle++){
            var currentCycle = cycleList.value[cycle]
            const newCycleId = ref(null)
            if(currentCycle.status === 'delete' && currentCycle.existed === true){
                await RoutineApi.deleteCycle(routineId, currentCycle.id, true)
            }
            else if(currentCycle.status === 'new' && currentCycle.existed === false){
                var currentCycleInfo = new cycleInfo(currentCycle.name, cycle+1, "", "exercise", currentCycle.reps, { src: currentCycle.icon})
                const newCycle = await RoutineApi.createCycle(routineId, currentCycleInfo, true)
                newCycleId.value = newCycle.id
            }
            for (var exercise = 0; exercise < currentCycle.exercises.length; exercise++){
                var currentExercise = currentCycle.exercises[exercise]
                if(currentExercise.status === 'delete' && currentExercise.existed === true){
                    await CycleApi.deleteCycleExercise(currentCycle.id, currentExercise.id, true)
                }
                else if(currentExercise.status === 'new'){
                    console.log(newCycleId.value)
                    if(currentCycle.existed) newCycleId.value = currentCycle.id
                    var exerciseInfo = new exerciseSpecification(exercise+1, currentExercise.sec === '-' ? 0: currentExercise.sec, currentExercise.reps === '-' ? 0: currentExercise.reps)
                    await CycleApi.addExercise(newCycleId.value, currentExercise.id, exerciseInfo, true)
                }
            }
        }
    }

    return { cycleList, init, getCycleLenght, addCycle, deleteCycle, addExercise, deleteExercise, sendNewRoutine, 
            sendEditRoutine, setRoutine, deleteExistingExercise, deleteExistingCycle }
})