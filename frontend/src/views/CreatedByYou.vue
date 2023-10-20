<template>
<div class='basics'>

  <div class='header'>
    <h1>Created by you</h1>
    <div class='create-new'>
      <RouterLink to='/createroutine'>
        <button class='new-button'>
            Create new 
            <v-icon icon='$add'/>
        </button>
      </RouterLink>
    </div>
  </div>

  <div class='rutines' v-for='routine in routines'>
    <HorizontalBox :items='{name: routine.name, link: routine.link, img: routine.img, deleteFunction: showDeleteDialog, editFunction: () => editRoutine(routine.name)}'/>
    <warning-dialog
    v-model='deleteDialog'
    title='Are you sure you want delete this routine?'
    message='If you do so, you will not be able to recover it.'
    custom-button-text="Delete"
    :on-custom-action='() => deleteRoutine(routine.name)'
    :on-close='closeDeleteDialog'
    type='alert'
    />
  </div>

</div>
</template>
  
<script setup>
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router'
    import { useRouter } from 'vue-router'
    import { useRoutineStore } from '@/store/RoutineStore'
    import HorizontalBox from '@/components/HorizontalBox.vue'
    import WarningDialog from '@/components/WarningDialog.vue'


    import image1 from '@/assets/temporary/chillout.png'
    import image2 from '@/assets/temporary/keepmoving.png'

    const router = useRouter()
    const routineStore = useRoutineStore()
    const deleteDialog = ref(false)

    const routines = ref([
      { name:'Chill out', img: image1, link:'/routine' },
      { name:'Keep moving', img: image2, link:'/routine' },
    ])

    function showDeleteDialog() {
        deleteDialog.value = true
    }

    function closeDeleteDialog() {
        deleteDialog.value = false
    }

    function deleteRoutine(id) {
        routineStore.deleteRoutine(id)
        router.go(0)
    }

    function editRoutine(id) {
        //router.push({ name: 'EditExercise', params: { id: id } })
        router.push('/createroutine')
    }

</script>

<style scoped src='@/styles/CreatedByYou.scss'/>
<style scoped src='@/styles/Globals.scss'/>