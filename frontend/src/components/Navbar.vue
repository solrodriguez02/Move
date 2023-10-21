<template>
<div id='nav'>
    <RouterLink to='/'>
        <img class='logo' src='@/assets/logo.png' alt='logo'/>
    </RouterLink>
    <nav class='navigation'>
    <ul class='nav-links'>
      <li class='links' v-for='item in menuItems' :key='title'>
        <RouterLink v-show='securityStore.isLoggedIn' :to="item.path">
            <p class="link" :class="{ 'active-link': $route.path === item.path }">{{ item.title }}</p>
          </RouterLink>
      </li>
      <li v-show='!securityStore.isLoggedIn' class='links'>
        <RouterLink to='/signin'>
        <v-btn 
        class='text-none'
        color='blue'
        rounded
        size='large'
        height='35px'
        variant='flat'>Sign in</v-btn>
        </RouterLink>

      </li>

      <li v-show='securityStore.isLoggedIn' class='links'>
      <RouterLink to='/userprofile'>
      <img :src='registerStore.userInfo.avatarUrl' :class="isProfilePage()? 'profile-avatar-selected profile-avatar':'profile-avatar'"> 
      </RouterLink>
      </li>
    </ul>
</nav>
</div>
</template>
  
<script setup>
  import { RouterLink, useRoute } from 'vue-router'
  import { ref, onBeforeMount } from 'vue'
  import { useSecurityStore } from '@/store/SecurityStore'
  import { useRegisterStore } from '@/store/RegisterStore'

  const securityStore = useSecurityStore()
  const registerStore = useRegisterStore()
  const route = useRoute()

  onBeforeMount (async () => {
    await registerStore.fetchCurrentUser()
  })

  const menuItems = ref([
        { title: 'Explore', path: '/explore'},
        { title: 'My Routines', path: '/myroutines'},
        { title: 'My Exercises', path: '/myexercises'}
    ])

  function isProfilePage() {
    return route.path === '/userprofile';
  }
</script>

<style scoped  src='@/styles/NavBar.scss'/>