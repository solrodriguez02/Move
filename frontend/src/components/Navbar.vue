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
        <v-btn 
        class="text-none"
        color="blue"
        rounded
        size="large"
        height="30px"
        variant="flat"
        @click="dialog = false">Log in</v-btn>
      </li>
    </ul>
</nav>
</div>
</template>
  
  <script setup>
    import { RouterLink } from 'vue-router';
    import { ref } from 'vue'
    const menuItems = ref([
          { title: 'Explore', path: '/explore'},
          { title: 'My Routines', path: '/myroutines'}
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
  }

  .link {
    margin-top: 3px;
  }

  .link:hover{
    color: rgb(137, 137, 137);
  }

  .logo {
    height: 30px;
    margin: 20px;
  }
  </style>