<template>
    <ul>
        <User  :user="user" :key="user.id" v-for="user in users"/>
    </ul>
</template>

<script>
import User from './User'
export default {
    name: 'List',
    props: {
        users: Array
    },
    components: {
        User
    },
}
</script>
<style scoped>
ul{
    padding: 0;
    margin: 0;
}
ul li{
    display: inline-table;
}
</style>

