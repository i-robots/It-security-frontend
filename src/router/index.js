import {createRouter, createWebHistory} from 'vue-router'
import Dashboard from '../views/Dashboard'
import Login from '../views/Login'
import Register from '../views/Register'
import AdminLogin from '../views/Adminlogin'
import AdminDashboard from '../views/Admindashboard'
import Users from '../views/Users'

const routes = [
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/adminlogin',
        name: 'adminlogin',
        component: AdminLogin
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },
    {
        path: '/admindashboard',
        name: 'admindashboard',
        component: AdminDashboard
    },
    {
        path: '/adminusers',
        name: 'users',
        component: Users
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(
        process.env.BASE_URL
    ), 
    routes
})

export default router