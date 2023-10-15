import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useCallApiStore } from '@/store/CallApiStore';

export const useAuthenticateStore = defineStore('authenticate', () => {

    const token = ref([])
    const callApiStore = useCallApiStore();

    function registerUser(user){
        var callInfo = callApiStore.createCallInfo(user, 'POST');
        const response = callApiStore.callApi( callApiStore.baseURL.concat('/users'), callInfo);
        console.log(response);
    }

    function verifyEmail(code){
        var callInfo = callApiStore.createCallInfo(code, 'POST');
        const response = callApiStore.callApi(callApiStore.baseURL.concat('/users/verify_email'), callInfo);
        console.log(response);
    }

    function logInUser(user){
        var callInfo = callApiStore.createCallInfo(user, 'POST');
        const response = callApiStore.callApi(callApiStore.baseURL.concat('/users/login'), callInfo);
        console.log(response);
        token.value.push(response['token']);
    }

    return {token, registerUser, verifyEmail, logInUser, printToken}
});