<template>
  <div class='basics'>
    <div class='appbar'>
        <button @click='goBackDialog = true' class='back-button'>
            <v-icon icon='$back'></v-icon>
            <p>{{navigationStore.getTabText(getTab())}}</p>
        </button>  
    </div>

    <warning-dialog
    v-model='goBackDialog'
    title='Are you sure you want to quit this page?'
    message='If you do so, your changes will be deleted. Press Cancel to continue editing and then go to "save" to save your changes.'
    custom-button-text="Quit"
    :on-custom-action="() => quitEditProfile(getTab())"
    :on-close='closeGoBackDialog'
    type='alert'/>

    <h1>Edit Profile</h1>
    
      <v-form class='form' @submit.prevent='onSubmit'>
      <div class='profile'>

      <div class='picture'>
      <button class='avatar-profile' @click='imageDialog = true'>
        <div>
          <v-avatar size='200'>
            <img :src='avatarUrl' alt='Avatar' class='avatar-image'/>
            <div class='overlay'>
              <v-icon icon='$edit' color='black' size='20' class='edit-icon'/>
              <h3>Change Picture</h3>
            </div>
          </v-avatar>
        </div>
      </button>

      <v-dialog v-if='imageDialog' v-model='imageDialog' class='dialog-box'>
      <v-card  class='dialog-content'>
        <button class='close-button' @click='closeImageDialog()'>
          <v-icon icon='$close' size='25'/>
        </button>
        <v-card-title> Enter the new image URL </v-card-title>
        <v-text-field
          class='field-width'
          v-model='userItems[4].selectedValue'  
          variant='outlined'
          clearable
          rounded
          />
        <v-card-actions class='buttons-box'>
          <button @click='saveImage()' variant='outlined' rounded class='dialog-button'>Save</button>
        </v-card-actions>
      </v-card>
    </v-dialog>

      </div>

      <div class='user-info'>
        <v-row class='aligned-items'>
          <v-col
            v-for='user in userItems'
            :key='user.title'
            cols='4'
            class='aligned-items' v-show='user.tag != "avatarUrl"'>
            <h3 style='color: grey'>{{ user.title }}</h3> 
            <v-text-field v-show='user.tag != "gender"'
              class='field-width'
              v-model='user.selectedValue'  
              variant='outlined'
              clearable
              rounded
              :placeholder='registerStore.userInfo[user.tag]'/>
            <v-select v-show='user.tag === "gender"'
              class='field-width'
              v-model='user.selectedValue'  
              variant='outlined'
              clearable
              rounded
              :placeholder='registerStore.userInfo[user.tag]'
              :items='genderOptions'/>
          </v-col>
        </v-row>
      </div>
      
    </div>
    <div class='save-box'>
        <button
        class='save-button'
        :loading='loading'
        type='submit'
        @click='saveProfile()'> Save </button>
      </div>  
    </v-form>
 
  </div>
</template>
  
  
<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { useRouter } from 'vue-router'
  import { useNavigationStore } from '@/store/NavigationStore'
  import { useRegisterStore } from '@/store/RegisterStore'
  import WarningDialog from "@/components/WarningDialog.vue"

  const router = useRouter()
  const navigationStore= useNavigationStore()
  const registerStore = useRegisterStore()
  const profileSaved = ref(false)
  const imageDialog = ref(false)
  const goBackDialog = ref(false)

  const userItems = ref([
    { title:'First Name', tag: 'firstName', selectedValue: null }, 
    { title:'Last Name', tag: 'lastName', selectedValue: null },
    { title:'Gender', tag: 'gender', selectedValue: null },
    { title:'Phone number', tag: 'phone', selectedValue: null },
    { title:'Avatar URL', tag: 'avatarUrl', selectedValue: null },
  ])

  const genderOptions = ref(['female', 'male', 'other'])

  const avatarUrl = ref(registerStore.userInfo.avatarUrl)

  onBeforeMount (async () => {
    await registerStore.fetchCurrentUser()
  })

  const onSubmit = () => {
      profileSaved.value = true;
  }

  function getTab() {
      return router.options.history.state.back
  }

  const goBack = () => {
      router.go(-1)
  }

  function saveImage() {
    avatarUrl.value = userItems.value[4].selectedValue
    closeImageDialog()
  }

  function closeImageDialog() {
    imageDialog.value = false
  }
    
  async function saveProfile() {
    await registerStore.updateUser(userItems.value[0].selectedValue, userItems.value[1].selectedValue, userItems.value[2].selectedValue, userItems.value[3].selectedValue, userItems.value[4].selectedValue)
    router.push('/userprofile')
  }

  const closeGoBackDialog = () => {
    goBackDialog.value = false;
  }

  const quitEditProfile = (path) => {
    router.push(path)
  }
</script>
    
<style scoped src='@/styles/EditProfile.scss'/>
<style scoped src='@/styles/Globals.scss'/>