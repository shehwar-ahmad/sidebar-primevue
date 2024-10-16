import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'


const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities',
      },
    },
  },
})

app.use(router)

app.mount('#app')
