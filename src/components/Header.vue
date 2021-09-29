<template>
    <header>
        <div><h1>{{ title }} </h1></div>
        <div>
        <Button 
            @click="$router.push('/dashboard')"
            :text="'Review Feedback' " 
            :color="'#685762' "/>
        <router-link to='/'>
            <Button :text=" 'Logout'"  />
        </router-link>
        </div>
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: 'Header',   
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
