import { ref } from 'vue'
import { defineStore } from 'pinia'
import { exerciseInfo, exerciseApi } from '@/api/exercises'

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

    async function fetchExercises() {
        exerciseList.value = []
        const exercises = await exerciseApi.getAllExercises(true)
        filterExercises(exercises.content, exercises.content.length)
    }

    function filterExercises(exercises, exerciseCount) {
        for (let i = 0; i < exerciseCount; i++) {
            const exercise = exercises[i]
            const details = exercise.metadata
            if(details.image == null) {
                details.image = 'https://static.vecteezy.com/system/resources/previews/006/923/598/non_2x/running-man-abstract-logo-free-vector.jpg'
            }
            pushExercise(exercise.id, exercise.name, exercise.detail, details.image, details.difficulty, details.muscleGroups, details.elements, details.space, details.creator )
        }
    }

    function pushExercise(id, name, detail, image, difficulty, muscleGroup, elements, space, creator) {
        exerciseList.value.push({
            id: id,
            name: name,
            detail: detail,
            image: image,
            difficulty: difficulty,
            muscleGroup: muscleGroup,
            elements: elements, 
            space: space,
            creator: creator,
        })
    }
    
    async function addExercise(exercise) {    
        await exerciseApi.createExercise(exercise, true);
    }

    async function deleteExercise(id) {
        await exerciseApi.deleteExercise(id, true)
    }

    return { exerciseList, filters, fetchExercises, addExercise, deleteExercise }
})