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

const form = ref(false);
const loading = ref(false);
const formFields= ref([
    { label: 'Email', placeholder: 'Enter your email', value: null },
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

<style scoped>
.sign {
    display: flex;
    width: 100%;
    height: 80vh;
    margin-top: 2%;
}

.sign-form {
    width: 30%;
    margin-left: 12%;
    margin-top: 5%;
    margin-right: 15%;
}

.header {
    text-align: center;
    margin-bottom: 10%;
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

.signin-image {
    height: 100%;
    width: 100%;
    border-radius: 24px;
}
</style>