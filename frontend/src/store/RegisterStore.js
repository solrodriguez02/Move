import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UserApi } from '@/api/user'

export const useRegisterStore = defineStore('register', () => {

    const userInfo = ref({
        id: null, 
        username: '',
        email: '', 
        firstName: '',
        lastName: '', 
        gender: null, 
        avatarUrl: null,
    })

    function setUserEmail(email) {
        userInfo.value.email = email
    }

    async function fetchCurrentUser() {
        const currentUser = await UserApi.getCurrent(true)
        setUserInfo(currentUser)
    }

    function setUserInfo(currentUser) {
        userInfo.value.id = currentUser.id
        userInfo.value.username = currentUser.username
        userInfo.value.email = currentUser.email
        userInfo.value.firstName = currentUser.firstName
        userInfo.value.lastName = currentUser.lastName
        userInfo.value.gender = currentUser.gender
        userInfo.value.avatarUrl = currentUser.avatarUrl
    }

    return { userInfo, setUserEmail, fetchCurrentUser }
})