<template>
    <div class='sign'>
    <v-card variant='flat' class='sign-form'>
        <h2 class='header'>Sign in</h2>
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
            @click = 'authenticateStore.logInUser(
{
  "username": formFields[0].value,
  "password": formFields[1].value,
})'
            class='sign-button'>
            Sign In
            </v-btn>

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
import { useAuthenticateStore } from '@/store/AuthenticationStore'

const authenticateStore = useAuthenticateStore();
const form = ref(false);
const loading = ref(false);
const formFields= ref([
    { label: 'Username', placeholder: 'Enter your email', value: null },
    { label: 'Password', placeholder: 'Enter your password', value: null },
])

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