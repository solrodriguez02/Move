import { defineStore } from 'pinia'

export const useCallApiStore = defineStore('callApi', () => {

    const baseURL = 'http://localhost:8080/api';

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
        return response;
    }


    return {createCallInfo, callApi, baseURL}
});