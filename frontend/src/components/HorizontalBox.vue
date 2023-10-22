<template>
    <div class='box'>
      <RouterLink :to='items.link' class='link'>
        <div class='image-box'>
          <img :src='items.img' alt='' class='image' />
        </div>
        <p class='name'>{{ items.name }}</p>
      </RouterLink>
      <button class='options-button' @click='items.editFunction'>
        <v-icon icon='$edit' color='dark_gray' size='25'/>
      </button>
    
      <button class='options-button' @click='items.deleteFunction'>
        <v-icon icon='$delete' color='dark_gray' size='25'/>
      </button>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

const props = defineProps(['items']);
</script>

<style scoped src='@/styles/HorizontalBox.scss'></style>