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
          dark_gray: '#3d3b42'
        },
      },
    },
  },

  icons: {
    defaultSet:'md',
    aliases: {
      ...aliases,
      check: 'check_box',
      warm: 'brightness_5', 
      fire: 'local_fire_department', 
      cool: 'ac_unit',
      rest: 'bedtime', 
      time: 'alarm', 
      reps: 'close', 
      space: 'zoom_out_map', 
      person: 'accessibility',
      flash: 'flash_on', 
      dumbbell: 'fitness_center',
      edit: 'edit', 
      add: 'add', 
      search: 'search', 
      filter: 'tune',
      arrow: 'expand_more', 
      next: 'navigate_next', 
      back: 'arrow_back_ios', 
      options: 'more_vert', 
      favempty: 'favorite_border', 
      favfull: 'favorite', 
      delete: 'delete',
      share: 'share', 
      close: 'close'
    },
    sets: {
      md,
    },
  },

})
