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
            @click = 'registerUser(formFields[2].value, formFields[4].value, formFields[0].value, formFields[1].value, formFields[3].value)'
            class='sign-button'>
            Sign up
            </v-btn>
            <v-alert
            v-if="hasError"
            color="red"
            closable
            variant="tonal"
            icon="$error"
            title="Error"
            @click:close="hasError = false"
            :text= "error"></v-alert>
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
import { RouterLink, useRouter} from 'vue-router';
import { ref } from 'vue';
import { UserApi, PersonalInfo } from '@/api/user.js'


var hasError = ref(false);
var error = ref(null);
var router = useRouter();

async function registerUser(username, password, firstName, lastName, email){
    try{
        const user = new PersonalInfo(username, password, firstName, lastName, email)
        await UserApi.register(user);
        router.push("/");
    }catch(error){  
        hasError = true;
        if (error.description.includes("constraint"))
                this.error = "Username or email already exists";
        else if (error.description.includes("Invalid"))
                this.error = "Email format is not valid";
        else
                this.error = error.description;
    }
}

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