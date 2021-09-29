<template>
    <header>
        <div><h1>{{ title }} </h1></div>
        <div>
        <Button 
            @click="$router.push('admindashboard')"
            :text="'View Feedback' " 
            :color="'#685762' "/>
        <Button 
            @click="$router.push('adminusers')"
            :text="'Users' " 
            :color="'#5f9186' "/>
        <router-link to='/'>
            <Button :text=" 'Logout'"  />
        </router-link>
        </div>
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: 'Header2',   
    props: {
        title: String,
    },
    components:{
        Button
    }
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2c3e50;
}

h1,img{
    float: left;
    margin-left: 20px;
}
</style>
