import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRegisterStore = defineStore('register', () => {

    const userInfo = ref({
        id: '', 
        email: '',
        avatarUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    })

    function setUserInfo(email, id) {
        userInfo.value.id = id
        userInfo.value.email = email
    }


    return { userInfo, setUserInfo }
})