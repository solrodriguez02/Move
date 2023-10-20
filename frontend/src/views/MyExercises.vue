<template>
<div class='basics'>

    <div class='header'>
        <h1>My exercises</h1>
        <div class='create-new'>
            <RouterLink to='/createexercise'>
                <button class='new-button'>
                    Create new 
                    <v-icon icon='$add'/>
                </button>
            </RouterLink>
        </div>
    </div>

    <v-progress-circular v-if='loading'
    indeterminate
    color='blue'
    class='loading'>
    </v-progress-circular>
    <div v-else v-for='exercise in exerciseStore.exerciseList' :key='exercise.name'>
        <HorizontalBox :items='{name: exercise.name, link: exercise.link, img: exercise.image, deleteFuntion: deleteExercise, editFunction: editExercise}'/>
    </div>
</div>  
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router';
    import { useExerciseStore } from '@/store/ExerciseStore'
    import HorizontalBox from '@/components/HorizontalBox.vue'

    const router = useRouter()
    const exerciseStore = useExerciseStore()
    const loading = ref(false)

    onBeforeMount (async () => {
        loading.value = true
        await exerciseStore.fetchExercises()
        loading.value = false
    })

    function deleteExercise(id) {
        exerciseStore.deleteExercise(id)
    }

    function editExercise(id) {
        //router.push({ name: 'EditExercise', params: { id: id } })
        router.push('/createexercise')
    }

</script>

<style scoped src='@/styles/MyExercises.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>