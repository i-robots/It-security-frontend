<template>
  <div class="container">
      <img src="../assets/login.png" />
      <form @submit.prevent="login">
          <div class="mb-3">
              <input type="email" v-model="email" placeholder="Email">
          </div>
          <div class="mb-3">
              <input type="password" v-model="password" placeholder="Enter Password">
          </div>    
          <button type="submit" class="btn">Login</button>
          <div class="mb-3"><br/>
              <label>----  Admin  ----</label>
          </div>
      </form>
  </div>
  <NotificationList :notifications="notifications" @remove-notification="removeNotification"/>
</template>

<script>
import '@/assets/styles/style.css';
import store from '../store'
import NotificationList from '../components/NotificationList'

export default {
  name: 'AdminLogin',
  data(){
    return{
      email:'',
      password:'',
      notifications: []
    }
  },
  components:{
    NotificationList
  },
  methods:{
        async login(){
          const obj = { email:this.email, password:this.password};
          const res = await fetch('api/auth/adminlogin', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(obj)
          })
          const data = await res.json()
          if(data.error){
            this.notifications.push({id: 1001, message: data.message,type: 'dismissible'})
          }else{
            store.commit('setAtoken', arguments[1] = data.token)
            this.$router.push('/admindashboard')
          }
        },
        showNotification(msg, nid){
            let show = true;
            this.notifications.forEach((notif) => {if(notif.id == nid){show = false}})
            if(show){this.notifications.push({id: nid, message: msg,type: 'dismissible'})}
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        }
    }
}
</script>

<style scoped>
.idiv{
    height: 250px;
    width: 300px;
    margin: auto;
}

.idiv img{
    vertical-align: middle;
    height: 100%;
    width: 100%;
}

</style>