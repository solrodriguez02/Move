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
        const exercises = await exerciseApi.getAllExercises(true)
        console.log(exercises.content[0])
        filterExercises(exercises.content)
    }

    function filterExercises(exercises ) {
        for (let i = 0; i < 2; i++) {
            const exercise = exercises[i]
            console.log(exercise)
            if(exercise.image == null) {
                exercise.image = 'https://static.vecteezy.com/system/resources/previews/006/923/598/non_2x/running-man-abstract-logo-free-vector.jpg'
            }
            pushExercise(exercise.name, exercise.detail, exercise.image, exercise.difficulty, exercise.muscleGroups, exercise.elements, exercise.space )
        }
    }

    function pushExercise(name, detail, image, difficulty, muscleGroup, elements, space) {
        exerciseList.value.push({
            name: name,
            detail: detail,
            image: image,
            difficulty: difficulty,
            muscleGroup: muscleGroup,
            elements: elements, 
            space: space,
        })
    }
    
    async function addExercise(exercise) {    
        await exerciseApi.createExercise(exercise, true);
        pushExercise(exercise.name, exercise.detail, exercise.image, exercise.difficulty, exercise.muscleGroup, exercise.elements, exercise.space)
    }

    function deleteExercise(id) {
        // falta implementar
    }

    return { exerciseList, filters, fetchExercises, addExercise, deleteExercise }
})