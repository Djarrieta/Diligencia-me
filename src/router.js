import Vue from 'vue'
import Router from 'vue-router'
import Items from '@/views/Items'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path:'/items',
            name:'Items',
            component:Items
        },
        {
            path:'*',
            name:'Error',
            component:Error
        }
    ]
})
