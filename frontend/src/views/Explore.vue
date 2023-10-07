<template>
  <v-container>
    <v-sheet class="d-flex mb-5"  align-center>
      <v-sheet class="ma-2 pa-2 me-auto">
        <h1>Explore</h1>
      </v-sheet>
      <v-sheet class="ma-2 pa-2">
        <v-text-field 
            
            density='compact'
            placeholder='Search rutine'
            prepend-inner-icon='$search'
            rounded
            variant='outlined'/>  
      </v-sheet>
    </v-sheet>
  </v-container>

</template>
  
  <script setup>
    //
  </script>

<style scoped>
.header {
    display: flex;
    width: 90%;
    align-content: center;
    justify-content: center;
    
    align-items: center;
    margin: auto;
    padding-bottom: 4%;
  }
.searcher {
  display: flex;
  height: 43px;
  margin-top: 2.5%;
}


</style>