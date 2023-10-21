import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavigationStore = defineStore('navigation', () => {
    function getTabText(tab){
        switch(tab) {
            case '/createroutine': 
              return 'Create Routine'
            case '/explore':
              return 'Explore'
            case '/myroutines':
              return 'My Routines'
            case'/exercise':
              return 'Exercise'
            case'/createdbyyou':
              return 'Created by You'
            case'/saveroutine':
              return 'Save Routine'
            case'/createexercise':
              return 'Create Exercise'
            case '/routine':
              return 'Routine'
            case'/editexercise':
              return 'Edit Exercise'
            case '/userprofile':
              return 'User Profile'
            default: 
              return 'Go Back'
          }
    }

    return { getTabText } 
})
