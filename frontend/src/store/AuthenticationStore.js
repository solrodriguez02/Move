import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticateStore = defineStore('authenticate', () => {

    const token = ref([])

    function createCallInfo(content, methodName){
        return {
            method: methodName,
            headers: {
            'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(content)
        };
    }

    async function callApi(endpoint, callInfo){
        const response = await fetch(endpoint, callInfo).catch(function(error) {
        console.log('Unexpected error: \n' + error.message);
        });
        return response.json();
    }

    function registerUser(user){
        var callInfo = createCallInfo(user, 'POST');
        const response = callApi('http://localhost:8080/api/users', callInfo);
        console.log(response.json());
    }

    function verifyEmail(code){
        var callInfo = createCallInfo(code, 'POST');
        const response = callApi('http://localhost:8080/api/users/verify_email', callInfo);
        console.log(response.json());
    }

    function logInUser(user){
        var callInfo = createCallInfo(user, 'POST');
        const response = callApi('http://localhost:8080/api/users/login', callInfo);
        console.log(response.json());
        //definir para obtener token y guardarlo
    }

    return {token, registerUser, verifyEmail, logInUser}
});