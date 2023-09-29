<template>
<div id='nav'>
    <RouterLink to='/'>
        <img class='logo' src='@/assets/logo.png' />
    </RouterLink>
    <nav class='navigation'>
    <ul class='nav-links'>
      <li class='links' v-for="item in menuItems" :key="title">
        <RouterLink :to="item.path"> {{ item.title }}</RouterLink>
      </li>
      <li class='links'>
        <button class='login'>Log in</button>
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
  }

  .links {
    padding-right: 40px;
    list-style: none;
  }

  .links:hover{
    text-decoration: underline;
  }

  .logo {
    height: 30px;
    margin: 20px;
  }

  .login {
    border-radius: 24px;
    cursor: pointer;
    width: 80px; 
    border: 1px solid white;
  }
  </style>