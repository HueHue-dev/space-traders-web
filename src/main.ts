import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify, Loading } from 'quasar'

import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'


const pinia = createPinia()
const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
    Loading
  }
})
app.use(pinia)
app.use(router)

app.mount('#app')
