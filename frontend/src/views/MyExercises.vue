<template>
<div class='basics'>

    <div class='header'>
        <h1>My exercises</h1>
        <div class='create-new'>
            <RouterLink to='/createexercise' class='link-decoration'>
                <button class='new-button button'>
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
    <div v-else v-for='exercise in exerciseStore.exerciseList' :key='exercise.id'>
        <HorizontalBox v-show="exercise.creator == 'user'" :items='{name: exercise.name, link: "/exercise", img: exercise.image, deleteFunction: () => showDeleteDialog(exercise.id), editFunction: () => editExercise(exercise.name)}'/>
    </div>

    <warning-dialog
        v-model='deleteDialog'
        title='Are you sure you want delete this exercise?'
        message='If you do so, you will not be able to recover it.'
        custom-button-text="Delete"
        :on-custom-action='() => deleteExercise()'
        :on-close='closeDeleteDialog'
        type='alert'
        />

</div>  
</template>

<script setup>
    import { ref, onBeforeMount } from 'vue'
    import { useRouter } from 'vue-router'
    import { useExerciseStore } from '@/store/ExerciseStore'
    import WarningDialog from '@/components/WarningDialog.vue'
    import HorizontalBox from '@/components/HorizontalBox.vue'

    const router = useRouter()
    const exerciseStore = useExerciseStore()
    const loading = ref(false)
    const deleteDialog = ref(false)
    const toDelete = ref(null)

    onBeforeMount (async () => {
        loading.value = true
        await exerciseStore.fetchExercises()
        loading.value = false
    })

    function showDeleteDialog(exerciseID) {
        toDelete.value = exerciseID
        deleteDialog.value = true
    }

    function closeDeleteDialog() {
        deleteDialog.value = false
    }

    async function deleteExercise() {
        await exerciseStore.deleteExercise(toDelete.value)
        router.go(0)
    }

    function editExercise(id) {
        //router.push({ name: 'EditExercise', params: { id: id } })
        router.push('/createexercise')
    }

</script>

<style scoped src='@/styles/MyExercises.scss'></style>
<style scoped src='@/styles/Globals.scss'></style>