import { ref } from 'vue'
import { defineStore } from 'pinia'
import { UserApi, EditedPersonalInfo } from '@/api/user'

export const useRegisterStore = defineStore('register', () => {

    const userInfo = ref({
        id: null, 
        username: '',
        email: '', 
        firstName: '',
        lastName: '', 
        gender: null, 
        phone: '',
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
        userInfo.value.phone = currentUser.phone
        userInfo.value.avatarUrl = currentUser.avatarUrl
    }

    async function updateUser(firstName, lastName, gender, phone, avatarUrl) {
        if(firstName != null) userInfo.value.firstName = firstName
        if(lastName != null) userInfo.value.lastName = lastName
        if(gender != null) userInfo.value.gender = gender
        if(phone != null) userInfo.value.phone = phone
        if(avatarUrl != null) userInfo.value.avatarUrl = avatarUrl
        const newUserInfo = new EditedPersonalInfo(userInfo.value.firstName, userInfo.value.lastName, userInfo.value.gender, userInfo.value.phone, userInfo.value.avatarUrl)
        await UserApi.modifyCurrent(newUserInfo, true)
    }

    return { userInfo, setUserEmail, fetchCurrentUser, updateUser }
})