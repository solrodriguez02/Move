import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {

    const userInfo = ref({
        id: '', 
        email: '',
    })


    function setUserInfo(email, id) {
        userInfo.value.id = id
        userInfo.value.email = email
    }


    return { userInfo, setUserInfo }
})