<template>
    <div class='basics'>
      <div class='header'>
        <h1>User Profile</h1>
        <button class='button edit-button'>
          <RouterLink to='/editprofile' class='link-decoration link'>
            Edit Profile
            <v-icon icon='$edit' class='pl-2'></v-icon>
          </RouterLink>
        </button>
      </div>
      <div class='profile'>
        <div class='avatar-profile'>
          <v-avatar size='200'>
            <img :src='registerStore.userInfo.avatarUrl' alt='Avatar' class='profile-image'/>
          </v-avatar>
        </div>
        <div class='user-info'>
          <v-row>
            <v-col
              v-for="user in userItems"
              :key="user.title"
              cols='4'
              class='aligned-items'>
              <h3 class='user-title'>{{ user.title }}</h3>
              <h2> {{ registerStore.userInfo[user.tag] }}</h2>
            </v-col>
          </v-row>
        </div>
      </div>

      <div class='log-out-box'>
        <button @click='logoutDialog = true' class='button logout-button'>
         <h3 class='pa-15'>Log out</h3>
        </button>
      </div>
      
      <warning-dialog
        v-model='logoutDialog'
        title='Are you sure you want to log out?'
        message='If you do so, your account will be closed.'
        custom-button-text='Log out'
        :on-custom-action='() => logout()'
        :on-close='closeLogoutDialog'
        type='alert'
      />

    </div>
  </template>
  

<script setup>
  import { ref, onBeforeMount } from 'vue'
  import { useRouter, RouterLink } from 'vue-router'
  import { useSecurityStore } from '@/store/SecurityStore'
  import { useRegisterStore } from '@/store/RegisterStore'
  import WarningDialog from '@/components/WarningDialog.vue'

  const registerStore = useRegisterStore()
  const loading = ref(false)
  const securityStore = useSecurityStore()
  const logoutDialog = ref(false)
  const router = useRouter()

  onBeforeMount (async () => {
    loading.value = true
    await registerStore.fetchCurrentUser()
    loading.value = false
  })

  function closeLogoutDialog() {
    logoutDialog.value = false
  }

  function logout() {
    securityStore.logout()
    router.push('/')
  }

  const userItems = ref([
    { title:'Username', tag: 'username' },
    { title:'First Name', tag: 'firstName' }, 
    { title:'Last Name', tag: 'lastName' },
    { title:'Email', tag: 'email' },
    { title:'Gender', tag: 'gender' },
    { title:'Phone', tag: 'phone' },
  ])
</script>

<style scoped src='@/styles/UserProfile.scss'/>
<style scoped src='@/styles/Globals.scss'/>