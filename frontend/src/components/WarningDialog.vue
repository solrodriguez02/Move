<template>
    <v-dialog :value='dialog' @update:value='dialog = $event' class='dialog-box'>
      <v-card  class='dialog-content'>
        <button class='close-button' @click='handleClose'>
          <v-icon icon='$close' size='25'/>
        </button>
        <v-card-title> {{ title }} </v-card-title>
        <v-card-text> {{ message }} </v-card-text>
        <v-card-actions class='buttons-box'>
          <v-btn @click="handleClose" variant='outlined' rounded class='button'>Cancel</v-btn>
          <v-btn @click="handleCustomAction" variant='outlined' color='red' rounded class='button'>{{ customButtonText }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
  
<script setup>
    import { defineProps } from "vue";
    
    const { dialog, title, message, customButtonText, onCustomAction, onClose } = defineProps(["dialog", "title", "message", "customButtonText", "onCustomAction", "onClose"]);
    
    const handleClose = () => {
        onClose()
    }
    
    const handleCustomAction = () => {
        onCustomAction()
    }
</script>
  
<style scoped>
    .dialog-box {
        width: 50%;
    }

    .dialog-content {
        padding: 8% 10%;
    }

    .close-button {
        position: absolute;
        top: 0;
        right: 0;
        margin: 5%;
    }

    .buttons-box {
        display: flex;
        justify-content: center;
        margin-top: 4%;
    }

    .button {
        padding: 5px 30px;
        text-transform: none;
        margin: 0 5%;
        height: 40px;
    }
</style>
