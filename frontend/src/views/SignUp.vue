<template>
    <div class='sign'>
    <v-card variant='flat' class='sign-form'>
        <h2 class='header'>Create your account</h2>
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
        <img class='signup-image' src='@/assets/signup.jpg' alt='signup model'/>
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

<style scoped>
.sign {
    display: flex;
    width: 100%;
    height: 150vh;
    margin-top: 2%;
}

.sign-form {
    width: 30%;
    margin-left: 12%;
    margin-right: 15%;
}

.header {
    text-align: center;
    margin-bottom: 5%;
}

.field {
    margin-top: 2%;
}

.sign-button {
    margin-top: 5%;
    height: 50px;
}

.field-text {
    margin-left: 4%;
    margin-bottom: 1%;
    font-size: 16px;
}

.other-option {
    margin-top: 10%;
}

.link {
    text-decoration: none;
    color: black;
    text-align: center;
}

.signup-image {
    height: 100%;
    width: 100%;
    border-radius: 24px;
}
</style>