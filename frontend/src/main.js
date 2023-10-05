import App from './App.vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { registerPlugins } from '@/plugins'
import router from './router'

const app = createApp(App)

registerPlugins(app)

app.use(router)

app.use(createPinia())
app.mount('#app')
