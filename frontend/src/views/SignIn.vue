<template>
    <div class='signin'>
    <v-card variant='flat' class='signin-form'>
        <h2 class='signin-header'>Sign in</h2>
        <v-form
            v-model="form"
            @submit.prevent="onSubmit">

            <div class='field' v-for='field in formFields' :key='field.label'>
                <div class='field-text'> {{field.label}} </div>
                <v-text-field
                v-model="field.value"
                :readonly="loading"
                :rules="[required]"
                variant="outlined"
                clearable
                rounded
                :placeholder='field.placeholder'
                />
            </div>

            <v-btn
            :disabled="!form"
            :loading="loading"
            block
            rounded
            color="violet"
            size="large"
            type="submit"
            variant="elevated"
            @click = 'login(formFields[0].value, formFields[1].value)'
            class='sign-button'>
            Sign In
            </v-btn>
            <v-alert
            v-show="hasError"
            color="red"
            closable
            variant="tonal"
            icon="$error"
            title="Error"
            :text= "error"></v-alert>
            <div class='other-option'>
                <RouterLink to='/signup' class='link'> 
                    <p>Don't have an account? <strong>Sign up</strong> </p> 
                </RouterLink>
            </div>
        </v-form>
    </v-card>
    <div>
        <img class='signin-image' src='@/assets/signin.jpg' alt='signin model'/>
    </div>
</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { UserApi, Credentials} from '@/api/user'
import { useSecurityStore } from '@/store/SecurityStore'
import { onBeforeMount } from 'vue';

const securityStore = useSecurityStore()
var hasError = ref(false);
var error = ref(null);

async function login(username, password){
    try {
        const credentials = new Credentials(username, password);
        await securityStore.login(credentials, true);
    }catch(error){  
        hasError = true;
        this.error = error.description;
    }
}

onBeforeMount(() => {
    const securityStore = useSecurityStore()
    securityStore.initialize()
})
//todavia no funciona el llamado usando el login de api js
const form = ref(false);
const loading = ref(false);
const formFields= ref([
    { label: 'Username', placeholder: 'Enter your username', value: null },
    { label: 'Password', placeholder: 'Enter your password', value: null },
])
const credentials = new Credentials(formFields[0], formFields[1]);

const onSubmit = () => {
  if (!form.value) return;
  loading.value = true;
  setTimeout(() => (loading.value = false), 2000);
};

const required = (v) => {
  return !!v || 'Field is required';
};
</script>

<style scoped src='@/styles/SignIn.scss'></style>