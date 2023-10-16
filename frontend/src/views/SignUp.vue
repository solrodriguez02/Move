<template>
    <div class='signup'>
    <v-card variant='flat' class='signup-form'>
        <h2 class='signup-header'>Create your account</h2>
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
            color="lightblue"
            size="large"
            type="submit"
            variant="elevated"
            @click = 'authenticateStore.registerUser(
{
  "username": formFields[2].value,
  "password": formFields[4].value,
  "firstName": formFields[0].value,
  "lastName": formFields[1].value,
  "gender": "male",
  "birthdate": 284007600000,
  "email": formFields[3].value,
  "phone": "98295822",
  "avatarUrl": "https://flic.kr/p/3ntH2u",
  "metadata": null
}
            )'
            class='sign-button'>
            Sign up
            </v-btn>

            <div class='other-option'>
                <RouterLink to='/signin' class='link'> 
                    <p>Already have an account? <strong>Sign in</strong> </p> 
                </RouterLink>
            </div>
        </v-form>
    </v-card>
    <div>
        <img class='signin-image' src='@/assets/signup.jpg' alt='signup model'/>
    </div>
</div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useAuthenticateStore } from '@/store/AuthenticationStore'
import { UserApi, Credentials } from '@/api/user.js'

const authenticateStore = useAuthenticateStore();
const form = ref(false);
const loading = ref(false);
const formFields= ref([
    { label: 'First Name', placeholder: 'Enter your First name', value: null },
    { label: 'Last Name', placeholder: 'Enter your Last name', value: null },
    { label: 'Username', placeholder: 'Create your username', value: null },
    { label: 'Email', placeholder: 'Enter your email', value: null },
    { label: 'Password', placeholder: 'Create your password', value: null },
    { label: 'Repeat password', placeholder: 'Repeat your password', value: null },
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