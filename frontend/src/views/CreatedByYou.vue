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

<style scoped>

.created {
  margin: 0 15%;
}
.header {
  display: flex;
  margin: 2%;
}

.create-new {
 margin-left: auto;
 text-decoration: none;
}

.new-button{
  background-color: rgb(65, 188, 197);
  color: white;
  border-radius: 24px;
  width: 140px;
  height: 40px;
}

.routine {
  display: flex;
  width: 100%;
  height: 80px;
  border-radius: 12px;
  background-color: rgb(231, 231, 231);
  margin: 1% 0;
  font-weight: bold;
}

.to-routine {
  display: flex;
  text-decoration: none;
  color: rgb(58, 58, 58);
  width: 90%;
}

.routine-image-box {
  width: 110px;
  height: 80%; 
  margin: 8px 12px;
}

.routine-image {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}

.routine-name {
  margin: 28px 12px;
}

.options-button {
  margin-left: auto;
  margin-right: 20px;
}
</style>