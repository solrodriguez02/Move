<template>
    <div class = 'appbar navigate-margin'>
        <button @click="goBack" class="button">
            <v-icon icon='$back'></v-icon>
            <p>{{navigationStore.getTabText(getTab())}}</p>
        </button>  
    </div>
    <v-container>
      <h1>Edit Profile</h1>
      
      <div class="profile">
        <div class="picture">
        <button class="avatar-profile">
          <div>
            <v-avatar size="200">
              <img src="@/assets/temporary/profile-pic.png" alt="Avatar" />
              <div class="overlay">
                <v-icon icon="$edit" color="black" size="20" class="edit-icon" />
                <h3 style="color: black; margin-left: 1%">Change Picture</h3>
              </div>
            </v-avatar>
          </div>
        </button>
    </div>
  <v-form class='form'
        @submit.prevent="onSubmit">
        <div class="user-info">
          <v-row class="aligned-items">
            <v-col
              v-for="user in userItems"
              :key="user.title"
              cols="4"
              class="aligned-items"
              :class="{ 'full-width': user.title === 'Mail' }"
            >
              <h3 style="color: grey">{{ user.title }}</h3> 
                <v-text-field
                  class="field-width"
                  v-model="user.tempDetail"
                  variant='outlined'
                  clearable
                  rounded
                  :placeholder="user.placeholder"/>
            </v-col>
          </v-row>
        </div>
        <div style="margin-top: 3%;">
        <v-row align="center" justify="center">
        <v-col cols="6">
        <v-btn
        class="save-button"
      :loading='loading'
      block
      rounded
      color='violet'
      size='large'
      type='submit'
      variant='elevated'> Save </v-btn>
        </v-col>
        </v-row>
        </div>
      <div v-show="profileSaved">
        <p style="margin-top:2%; margin-left:37%">Cambios guardados con éxito.</p>
      </div>
      </v-form>
    </div>

    </v-container>
  </template>
  
  
    <script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router'
    import { useNavigationStore } from '@/store/NavigationStore'

    const router = useRouter()
    const navigationStore= useNavigationStore()
    
    const profileSaved = ref(false);

    const userItems = ref([
      { title: 'Username', detail: 'carolodominguez1', tempDetail: '', placeholder: 'carolodominguez1' },
      { title: 'First Name', detail: 'Carolo', tempDetail: '', placeholder: 'Carolo' },
      { title: 'Last Name', detail: 'Dominguez', tempDetail: '', placeholder: 'Dominguez' },
      { title: 'Gender', detail: 'Male', tempDetail: '', placeholder: 'Male' },
      { title: 'Mail', detail: 'carolodominguez@hotmail.com', tempDetail: '', placeholder: 'carolodominguez@hotmail.com' },
    ]);

    const onSubmit = () => {
        profileSaved.value = true;
   }

   function getTab() {
        return router.options.history.state.back
    }

    const goBack = () => {
        router.go(-1)
    }
    
    </script>
    
    <style scoped src='@/styles/EditProfile.scss'></style>
    <style scoped src='@/styles/Globals.scss'></style>
  
  