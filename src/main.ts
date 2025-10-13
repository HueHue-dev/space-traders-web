import { createApp } from 'vue'
import { Quasar, Notify, Loading } from 'quasar'

import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'

import 'quasar/src/css/index.sass'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Quasar, {
  plugins: {
    Notify,
    Loading,
  },
})
app.use(router)

app.mount('#app')
