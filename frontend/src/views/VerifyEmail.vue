<template>
    <div class='verify-email'>
        <h1>Verify your email</h1>
        <p>You are almost done! Please enter the code we sent you by email to verify your account</p>

        <v-form class='form-box'
            v-model="submit"
            @submit.prevent="onSubmit">

            <v-text-field
                v-model='form.code'
                :readonly='loading'
                :rules="[required]"
                variant="outlined"
                clearable
                rounded
                placeholder='Enter your code here'
                class='code-field'/>


                <v-btn
            :disabled="!submit"
            :loading="loading"
            block
            rounded
            color="violet"
            size="large"
            type="submit"
            variant="elevated"
            @click = 'verifyEmail(form.code)'
            class='sign-button'>
            Sign In
            </v-btn>

        </v-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { EmailVerificationInfo } from '@/api/user'
import { UserApi } from '@/api/user'
import { useSecurityStore } from '@/store/SecurityStore'

const router = useRouter()
const securityStore = useSecurityStore()
const submit = ref(false)

const form = ref({
  code: '',
})

const loading = ref(false)

const onSubmit = () => {
  if (!submit.value) return
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}

const required = (v) => {
  return !!v || 'Field is required'
}

async function verifyEmail(code){
    try{
        const emailVerificationInfo = new EmailVerificationInfo('funciona@gmail.com', code)
        await UserApi.verifyEmail(emailVerificationInfo, true);
    } catch(error){
        console.log(error)
    }
}

</script>

<style scoped src='@/styles/VerifyEmail.scss'/>