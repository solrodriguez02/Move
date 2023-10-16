<template>
<div class='created'>

  <div class='header'>
    <h2>Created by you</h2>
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
    <div class='routine'>
      <RouterLink :to='routine.link' class='to-routine'>
        <div class='routine-image-box'>
          <img :src='routine.img' :alt='routine.name' class='routine-image'/>
        </div>
        <p class='routine-name'>{{ routine.name }}</p>
      </RouterLink>
      <button class='options-button'>
        <v-icon icon='$options'/>
      </button>
    </div>
  </div>

</div>
</template>
  
<script setup>
    import { ref } from 'vue';
    import { RouterLink } from 'vue-router';

    import image1 from '@/assets/temporary/chillout.png';
    import image2 from '@/assets/temporary/keepmoving.png';

    const routines = ref([
      { name:'Chill out', img: image1, link:'/routine' },
      { name:'Keep moving', img: image2, link:'/routine' },
    ])
</script>

<style scoped src='@/styles/CreatedByYou.scss'></style>