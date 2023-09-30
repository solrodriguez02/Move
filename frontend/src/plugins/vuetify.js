/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, md } from 'vuetify/iconsets/md'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          blue: '#5271FF',
          violet: '#CB6CE6',
          turquoise: '#0FC2C8',
          lightblue: '#2AAAF4'
        },
      },
    },
  },

  icons: {
    defaultSet:'md',
    aliases: {
      ...aliases,
      check: 'check_box',
      warm: 'brightness_5', // sol del warm up
      fire: 'local_fire_department', // fuego del ejercitamiento
      cool: 'ac_unit', // copo de nieve del enfriamiento
      rest: 'bedtime', // luna para el descanso
      time: 'alarm', // reloj para el tiempo
      space: 'zoom_out_map', // espacio para el ejercicio
      person: 'accessibility',
      flash: 'flash_on', // flash para la dificultad (con relleno)
      dumbbell: 'fitness_center', // pesa
    },
    sets: {
      md,
    },
  },

})
