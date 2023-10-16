import { ref } from 'vue'
import { defineStore } from 'pinia'
import Exercises from '@/api/Exercises'

/* 
  Campos que creo q deberian ir en exercise: 
  id, name, img, userMade (boolean), difficulty, equipment, space, muscleGroups, description
  
  soy Sol :) 
*/

export const useExerciseStore = defineStore('exercise', () => {
    const exerciseList = ref([])

    const filters = [
        { label: 'Difficulty', items: ['Easy', 'Medium', 'Difficult'], icon: '$flash', color:'turquoise' },
        { label: 'Muscle groups', items: ['Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps', 'Legs', 'Quadriceps', 'Hamstrings', 'Calves', 'Glutes', 'Abdominals', 'Lower Back', 'Core'], icon:'$person', color:'lightblue' },
        { label: 'Elements required', items: ['None', 'Dumbell', 'Jump rope', 'Mat', 'Resistance band', 'Step', 'Kettlebell', 'Foam roller', 'Ankle Weights' ], icon: '$dumbbell',  color:'blue' },
        { label: 'Space requirements', items: ['Ideal for reduced spaces', 'Requires some space', 'Much space is needed'], icon: '$space',  color:'violet' }
    ]

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

    return { exerciseList, filters, fetchExercises, exerciseExists, addExercise }
})