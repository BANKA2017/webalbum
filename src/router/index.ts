import {createRouter, createWebHistory} from "vue-router"

const About = () => import("@/views/About.vue")
const Main = () => import('@/views/Main.vue')
const NotFound = () => import("@/views/NotFound.vue")
const Settings = () => import("@/views/Settings.vue")
const Photos = () => import("@/views/Photos.vue")

export default createRouter({
    history: createWebHistory('/'),
    routes: [
        { path: '/about', component: About, name: 'about'},
        { path: '/settings', component: Settings, name: 'settings'},
        //{
        //    path: '/search',
        //    component: TimeLine,
        //    children: [
        //        {path: '', component: TimeLine, name: 'search'},//will no longer use params
        //        {path: ':search', redirect: to => ({ path: '/search/', query: { q: to.params.search }})}
        //    ]
        //},
        {
            path: '/',
            component: Main,
            name: 'main',
            children: [{
                path: 'index.html',
                redirect: '/'
            },{
                path: '/game/:game_name',
                component: Main,
                name: 'game'
            }]
        },
        {
            path: '/photos/:tweet_id',
            component: Photos,
            name: 'photos',
            children: [{
                path: '',
                component: Main,
            },{
                path: ':photo_index',
                component: Main,
                name: 'photo-index'
            }]
        },
        { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
        { path: '/:pathMatch(.*)', name: 'bad-not-found', component: NotFound },
    ]
})
