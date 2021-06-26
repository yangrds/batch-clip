import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/packages/theme-chalk/src/base.scss';
import { components, plugins } from './el'
import store from './store/index'
import router from './router/index'
import CloudButton from './components/CloudButton.vue'



const app = createApp(App)


app.component('CloudButton', CloudButton)

components.forEach(component => {
    app.component(component.name, component)
})

plugins.forEach(plugin => {
    app.use(plugin)
})

app.use(router)
app.use(store)
app.mount('#app')





