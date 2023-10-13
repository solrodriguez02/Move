import { ref } from 'vue'
import { defineStore } from 'pinia'
import Exercises from '@/api/Exercises'

export const useExerciseStore = defineStore('exercise', () => {
    const exerciseList = ref([])

    function fetchExercises() {
        return new Promise((resolve) => {
            Exercises.getExercises((exercises) => {
              setExercises(exercises)
              resolve()
            })
          })
    }

    function setExercises(exercises) {
        exerciseList.value = exercises
    }


    function exerciseExists(name) {
        return exerciseList.value.some(exercise => exercise.name === name);
    }

    function pushExercise(exercise) {
        exerciseList.value.push({
            name: exercise.name,
            difficulty: exercise.difficulty,
            muscleGroup: exercise.muscleGroup,
            elements: exercise.elements, 
            space: exercise.space,
            description: exercise.description,
            image: exercise.image
        })
    }
    
    function addExercise(exercise) {    
        if (exerciseExists(exercise.name)) return
        pushExercise(exercise)
    }

    return { exerciseList, fetchExercises, exerciseExists, addExercise }
})