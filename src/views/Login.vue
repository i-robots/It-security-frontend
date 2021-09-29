<template>
  <div class="container">
      <img src="../assets/login.png" />
      <form @submit.prevent="login">
          <div class="mb-3">
              <div class="l_left"><input type="email" v-model="email" placeholder="Email"></div>
              <div class="l_right"><span class="icon"><i class="fa fa-envelope"></i></span></div>
          </div>
          <div class="mb-3">     
              <div class="l_left">   
                <input v-if="showPassword" type="text" v-model="password" placeholder="Enter Password">
                <input v-else type="password" v-model="password" placeholder="Enter Password">
                </div><div class="l_right">
                    <span class="icon" @click="toggleShow">
                     
                    <i id="eye" :class="{ 'fa fa-eye-slash': showPassword, 'fa fa-eye': !showPassword }"></i>
                     <i id="lock" class="fa fa-lock"></i>
                    </span>
  
                    </div>
          </div>    
          <button type="submit" id="login" class="btn">Login</button>
          <div class="mb-3"><br/>
              <label>Don't have account <router-link to='/register'>Register here</router-link></label>
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
  name: 'Login',
  data(){
    return{
      email:'',
      password:'',
      notifications: [],
      showPassword:false
    }
  },
  components:{
    NotificationList
  },
  computed: {
    buttonLabel() {
      return (this.showPassword) ? "Hide" : "Show";
    }
    },
  methods:{
        async login(){
          const obj = { email:this.email, password:this.password};
          const res = await fetch('api/auth/login', {
                method: 'POST',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(obj)
          })

          const data = await res.json()
          if(data.error){
              this.notifications.push({id: 1001, message: data.message,type: 'dismissible'})
          }else{
              store.commit('setToken', arguments[1] = data.token)
              store.commit('setId', arguments[1] = data._id)
              this.$router.push('/dashboard')
          }
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        },
        toggleShow() {
      this.showPassword = !this.showPassword;
    },
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
#login{
  margin-top:5%;
}
.l_left {
	width: 85%;
	float: left;
  margin-top:5px;
}

.l_right {
	width: 15%;
	float: right;
  margin-top:5px;
}
#eye{
  font-size:1.2rem;
  margin-right:5px;

}
#lock{
  margin-right:15px;
  font-size:2rem;
    margin-top:5px;

}
</style>
