<template>
    <div class='create-exercise'>
        <h2 class='header'>Create a new exercise</h2>
        <v-form class='form'
            v-model='form'
            @submit.prevent='onSubmit'>

            <div class='field-text'> Title </div>
            <v-text-field
                :readonly='loading'
                :rules='[required]'
                variant='outlined'
                density='compact'
                clearable
                rounded
                placeholder='Enter the exercise name'/>

            <div class='field' v-for='field in formFields' :key='field.name'>
                <div class='field-text'> {{ field.label }} </div>
                <v-select
                    :items='field.items'
                    :multiple="field.label == 'Elements required' || field.label =='Muscle groups'"
                    :chips="field.label == 'Elements required' || field.label =='Muscle groups'"
                    :rules="[required]"
                    variant='outlined'
                    density='compact'
                    rounded
                    :placeholder='field.placeholder'/>
            </div>

            <div class='field' v-for='text in formTexts' :key='text.label'>
                <div class='field-text'> {{ text.label }} </div>
                <v-textarea
                    auto-grow
                    variant='outlined'
                    rows='3'
                    row-height='25'
                    clearable
                    :placeholder='text.placeholder'
                    shaped/>
            </div>

            <div class='field-text-image'> Image </div>
            <v-file-input
                label='Attach a representative image for the exercise'
                density='compact'
                variant='outlined'
                rounded/>

            <RouterLink to='/createdbyyou' class='save-button'>
                <v-btn
                    :disabled='!form'
                    :loading='loading'
                    block
                    rounded
                    color='violet'
                    size='large'
                    type='submit'
                    variant='elevated'> Save </v-btn>
            </RouterLink>
        </v-form>

    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ref } from 'vue';

const form = ref(false);
const loading = ref(false);

const difficulties = ref(['Easy', 'Medium', 'Difficult']);
const elements = ref(['None', 'Dumbell', 'Jump rope', 'Mat', 'Resistance band', 'Step', 'Kettlebell', 'Foam roller', 'Ankle Weights' ]);
const space = ref(['Ideal for reduced spaces', 'Requires some space', 'Much space is needed']);
const muscleGroups = ref(['Chest', 'Back', 'Shoulders', 'Arms', 'Biceps', 'Triceps', 'Legs', 'Quadriceps', 'Hamstrings', 'Calves', 'Glutes', 'Abdominals', 'Lower Back', 'Core']);
const approach = ref(['Cardio', 'Strength', 'HIIT', 'Flexibility', 'Bodyweight', 'Resistance', 'CrossFit', 'Yoga', 'Pilates', 'Functional', 'Calisthenics', 'Aerobic ', 'Streching']);

const formFields = ref([
    { label: 'Difficulty', placeholder: 'Enter the exercise difficulty', items: difficulties },
    { label: 'Approach', placeholder: 'How much space is it necesary', items:  approach},
    { label: 'Muscle groups', placeholder: 'How much space is it necesary', items:  muscleGroups},
    { label: 'Elements required', placeholder: 'Does the exercise require any element?', items:  elements },
    { label: 'Space requirements', placeholder: 'How much space is it necesary', items:  space},
]);

const formTexts = ref([
    { label: 'Description', placeholder: 'What are the steps to follow to perform the exercise? How would you describe it?' },
    { label: 'Make it easier', placeholder: 'Is there an easier way to exercise it?' },
    { label: 'Make it harder', placeholder: 'Is there a more challenging way to exercise it?' },
]);

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
.create-exercise {
    margin: 0 20%;
    padding-bottom: 5%;
}

.header {
    text-align: center;
    margin-bottom: 2%;
}

.field-text {
    margin: 0.5% 2%;
}

.field-text-image {
    margin: 0.5% 6%;
}

.save-button {
    text-decoration: none;
}
</style>