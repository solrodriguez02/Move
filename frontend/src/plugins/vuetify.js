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
          lightblue: '#2AAAF4',
          gray: '#E1E0E0',
          dark_gray: '#616161'
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
      reps: 'close', // cruz
      space: 'zoom_out_map', // espacio para el ejercicio
      person: 'accessibility',
      flash: 'flash_on', // flash para la dificultad (con relleno)
      dumbbell: 'fitness_center', // pesa
      edit: 'edit', // lapiz de editar
      add: 'add', // +
      search: 'search', //lupa
      filter: 'tune', // filtros
      arrow: 'expand_more', // flecha mirando hacia abajo
      next: 'navigate_next', //flecha hacia la derecha
      back: 'arrow_back_ios', // flecha hacia la izquierda
      options: 'more_vert', // tres puntitos verticales
      favempty: 'favorite_border', // corazon vacio
      favfull: 'favorite', //corazon lleno (cuando esta fav la rutina)
    },
    sets: {
      md,
    },
  },

})
