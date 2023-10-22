<template>
    <div class='box'>
      <RouterLink :to='`routine/${items.id}`' class='link'>
        <div class='image-box'>
          <img :src='items.img' :alt='items.name' class='image'/>
        </div>
        <p class='name'>{{ items.name }}</p>
      </RouterLink>
      <button class='options-button'  @click="console.log('hola')">
        <RouterLink :to='`editroutine/${items.id}`' class='link'>
        <v-icon icon='$edit' color='dark_gray' size='25'/>
        </RouterLink>
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