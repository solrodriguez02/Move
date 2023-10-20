<template>
<div id='nav'>
    <RouterLink to='/'>
        <img class='logo' src='@/assets/logo.png' alt='logo'/>
    </RouterLink>
    <nav class='navigation'>
    <ul class='nav-links'>
      <li class='links' v-for="item in menuItems" :key="title">
        <RouterLink :to="item.path"> <p class="link">{{ item.title }}</p> </RouterLink>
      </li>
      <li class='links'>

        <RouterLink to='/signin'>
        <v-btn 
        class="text-none"
        color="blue"
        rounded
        size="large"
        height="35px"
        variant="flat"
        @click="dialog = false">Sign in</v-btn>
        </RouterLink>

      </li>
    </ul>
</nav>
</div>
</template>
  
  <script setup>
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'
    const menuItems = ref([
          { title: 'Explore', path: '/explore'},
          { title: 'My Routines', path: '/myroutines'},
          { title: 'My Exercises', path: '/myexercises'}
     ])
  </script>

  <style scoped>

  #nav a {
    color: black;
    text-decoration: none;
  }

  #nav a.router-link-active{
    font-weight: bold;
  }

  .navigation {
    margin-top: 0.5%;
    float: right;
  }

  .nav-links {
    display: flex;
    margin: 20px;
    align-items: center;
  }

  .links {
    padding-right: 40px;
    list-style: none;
    color: black;
    font-size: 16px;
  }

  .link {
    margin-top: 3px;
  }

  .link:hover{
    color: rgb(137, 137, 137);
  }

  .logo {
    height: 30px;
    margin: 2%;
  }
  </style>