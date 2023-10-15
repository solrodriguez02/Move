<template>
    <v-container>
      <h1>User Profile</h1>
      <div class="profile">
        <div class="avatar-profile">
          <v-avatar size="200">
            <img src="@/assets/temporary/profile-pic.png" alt="Avatar" />
          </v-avatar>
          <div>
            <v-btn block rounded="xl" variant="tonal" class="edit-profile">
              <v-icon icon="$edit" color="grey"></v-icon>
              <h4 style="color: grey; margin-left: 1%">Edit Profile</h4>
            </v-btn>
          </div>
        </div>
        <div class="user-info">
          <v-row>
            <v-col
              v-for="user in userItems"
              :key="user.title"
              cols="4"
              class="aligned-items"
            >
              <h3 style="color: grey">{{ user.title }}</h3>
              <h2>{{ user.detail }}</h2>
            </v-col>
          </v-row>
        </div>
      </div>
      <div class="statistics">
        <h2>Statistics</h2>
      </div>
      <div class="center-card">
      <v-card variant="outlined" width="80%" class="stats-card">
        <v-card-item>
          <div class="stats-display">
            <div class="stats-row">
              <v-avatar color="blue" rounded="1" size="40px">
                <v-icon color="white" icon="$check"></v-icon>
              </v-avatar>
            </div>
            <div class="stats-info">
              <h3 class="single-line">Completed routines:</h3>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </div>
    </v-container>
  </template>
  

<script setup>
    import { ref } from 'vue'

    const userItems = ref([
    { title:'Username', detail:'carolodominguez1'},
    { title:'First Name', detail:'Carolo'}, 
    { title:'Last Name', detail:'Dominguez'}, 
    { title:'Gender', detail:'Male'},
    { title:'Mail', detail:'carolodominguez@hotmail.com'},
  ])
</script>

<style scoped>
.profile {
    margin-top: 3%;
    margin-left: 5%;
    display: flex;
    
  }

.avatar-profile {
    margin-right: 5%;
  }

.edit-profile {
    display: flex;
    margin-top: 5%;
}

.statistics{
    margin-top: 8%;
    margin-left: 5%;
    display: flex;
}

.user-info{
    margin-top: 2%;
}

.aligned-items {
  align-items: center;
  flex-wrap: wrap;
}

.stats-card {
  height: 100%;
  display: flex; 
  align-items: center; 
  padding: 0.5%;
}
.stats-display {
  display: flex;
  align-items: center;
  width: 100%;
}

.stats-row {
  margin-right: 10px; /* Adjust margin as needed */
}
.single-line {
  white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis; 
}
.stats-info {
  flex: 1;
}
.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-top: 2%;
}
</style>