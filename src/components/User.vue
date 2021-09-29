<template>
    <li class="user">
        <h3>{{ user.name }}</h3>
        <hr style="width:80%;float:left"><br>
        <p v-if="user.description" style="max-width:350px"><b>Description </b> {{user.description}}</p>
        <p v-if="user.email">Email: {{user.email}}</p>
        <embed v-if="user.file" v-bind:src="'/api/images/'+ user._id + '/' + user.file" width="500px" height="400px"/>
    </li>
</template>

<script>
export default{
    name: 'List',
    props: {
        user: Object
    }  
}
</script>

<style scoped>
    .user{
        background: #fffdfd;
        margin-right: 20px;
        margin-bottom: 20px;
        list-style: none;
        padding: 1px 20px;
        border-left: 5px solid rgb(224, 172, 74);
        border-radius: 5px;
        box-shadow: 3px 2px rgba(88, 76, 73, 0.4);
        width: fit-content;
    }

    .user h3{
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0%;
    }

    p{
        user-select: text;
        background-color: rgba(245, 245, 245, 0.644);
    }

    embed{
        margin-left: 10px;
        border-radius: 5px;
        box-shadow: 3px 2px rgba(121, 109, 106, 0.4);
    }
</style>