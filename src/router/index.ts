import { createRouter, createWebHashHistory } from 'vue-router'
import CloudSystem from '../pages/CloudSystem.vue'
import CloudLogin from '../pages/CloudLogin.vue'
import CloudFiles from '../pages/CloudFiles.vue'
import CloudGraphics from '../pages/CloudGraphics.vue'
import CloudDataTransmission from '../pages/CloudDataTransmission.vue'
import CloudFileClass from '../pages/CloudFileClass.vue'
import roleControl from '../pages/system/roleControl.vue'
import userControl from '../pages/system/userControl.vue'
import teamControl from '../pages/system/teamControl.vue'

const routes = [
    {
        path: '/', component: CloudSystem,
        redirect: 'CloudFiles',
        children: [
            {
                path: 'CloudFiles',
                component: CloudFiles,
            },
            {
                path: 'CloudGraphics',
                name: 'CloudGraphics',
                component: CloudGraphics,
            },
            {
                path: 'CloudDataTransmission',
                name: 'CloudDataTransmission',
                component: CloudDataTransmission
            },
            {
                path: 'CloudFileClass/:id',
                component: CloudFileClass
            },
            {
                path: 'roleControl',
                component: roleControl
            },
            {
                path: 'userControl',
                component: userControl
            },
            {
                path: 'teamControl',
                component: teamControl
            },
            
            

        ]
    },
    { path: '/login', name: 'login', component: CloudLogin },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})