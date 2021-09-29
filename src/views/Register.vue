<template>
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent="register">
            <div class="mb-3">
                <input type="text" v-model="name" placeholder="Enter name" >
            </div>
            <div class="mb-3">
                <input type="email" v-model="email" placeholder="Email">
            </div>
            <div class="mb-3">
             <input type="password" v-model="password" placeholder="Password">
             </div>
             <div class="mb-3">
             <input type="password" class="input" v-model="confirm_password" placeholder="Confirm Password">
             </div>
            <button type="submit">Submit</button>
            <div class="mb-3"><br/>
                <label>Have account <router-link to='/'>Login here</router-link></label>
            </div>
        </form>
    </div>
    <NotificationList :notifications="notifications" @remove-notification="removeNotification"/>
</template>

<script>
import '@/assets/styles/style.css';
import NotificationList from '../components/NotificationList'
export default{
    name:'Register',
    props:{
        center: String
    },
    data(){
        return{
          name:'',
          email:'',
          password:'',
          confirm_password:'',
          notifications: []
        }
    },
    components:{
      NotificationList,
    },
    methods:{
        async register(){
            if(this.name == '' | this.email == ''){
                this.showNotification('Empty feilds',1001)
            } else if(!this.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
                this.showNotification('Invalid Email',1003)
            } else if(this.password == ''){
                this.showNotification('password not setted!',1004)
            } else if(this.password != this.confirm_password){
                this.showNotification('password doesn\'t match')
            }
            else{
                const obj = {
                    name:this.name,
                    email:this.email,
                    password:this.password
                };
                const res = await fetch('api/auth/signup', {
                      method: 'POST',
                      headers: {'Content-type': 'application/json'},
                      body: JSON.stringify(obj)
                })
                const data = await res.json()
                if(res.status === 200){
                    this.$router.push('/')
                }else{
                    this.showNotification(data.message,1102)
                }
            }
        },
        showNotification(msg, nid){location
            let show = true;
            this.notifications.forEach((notif) => {if(notif.id == nid){show = false}})
            if(show){this.notifications.push({id: nid, message: msg,type: 'dismissible'})}
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        },
    }
}
</script>
<style scoped>
.container{
    height:430px;
}
.map{
    height:650px;
}
.mb{
    color: black;
    text-align: left;
    margin-bottom: 10px;
}
.mb p{
    margin-bottom: 4px;
}
.mb span{
    color: white;
    cursor: pointer;
    border-radius: 1ex;
    background: #31383c;
    padding: 1px 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.mb span:hover{
    background: #1e1f1e;
    padding: 2px 6px;
}
</style>