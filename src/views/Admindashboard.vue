<template>
  <Header2 title="Admin Dashboard" />
  <List :users="users" />
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="slide" appear>
        <div class="modal" v-if="showModal">
            <h1>Are you sure?</h1>
            <p>Deleting feedback</p>
            <div class="buttons">
                <button @click="showModal = false">No</button>
            </div>
        </div>
    </transition>
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import Header2 from '../components/Header2'
import List from '../components/List'
import NotificationList from '../components/NotificationList' 


export default{
    name: 'AdminDashboard',
    components: {
        Header2,
        List,
        NotificationList,
    },
    data() {
        return{
            users: [],
            notifications: [],
            showModal: false,
            itm: [],
            delId: '',
            showAddItem: false,
            update: false,
            token: ''
        }
    },
    methods: {
        async fetchItems(){
            const res = await fetch('api/feedbacks',{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        async fetchItem(id){
            const res = await fetch(`api/feedbacks/${id}`,{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        del(id){ 
            this.showModal = true 
            this.delId = id
        },
        getHeader(){
            const token = JSON.parse(localStorage.getItem('atoken'))
            return {'Content-type': 'application/json', 'Authorization': ' Bearer ' + token}
        },
        addNotification(notif){
            this.notifications.push(notif)
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        },
    },
    async created(){
        this.users = await this.fetchItems()
    }
}
</script>

<style>
.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
}

.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 98;
    width: 100%;
    max-width: 400px;
    background-color: rgb(243, 228, 225);
    border-radius: 16px; 
    padding: 25px;
}

.modal h1{
    color: rgba(148, 37, 37, 0.884);
}

button{
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    
    display: inline-block;
    padding: 5px 20px;
    background-image: linear-gradient(to right, #a33e3e, #e95f5f);
    border-radius: 10px;
    
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
    
    box-shadow: 3px 3px rgba(54, 52, 52, 0.4);
    transition: 0.4s ease-out;
}

.modal button{
    margin-right: 20px;
}

button:hover {
    box-shadow: 1px 1px rgba(87, 81, 81, 0.6);
}

.fade-leave-active{
    transition: opacity .5s;
}

.fade-leave-to {
    opacity: 0;
}

.slide-leave-active {
    transition: transform .2s;
}
</style>
