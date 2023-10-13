import { ref, computed } from 'vue'
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

    return { exerciseList, fetchExercises}
})