<template>
    <Header title="User Dashboard" />
    <Button 
        @click="toggleItem" 
        :text="showAddItem ? 'Close X' : 'Add Feedback' " 
        :color="showAddItem ? '#914d3c' : '#4b423f' "
        style="padding: 5px 20px; margin-bottom: 15px"/>
  <AddItem @add-item="addItem" v-if="showAddItem" 
    @add-notification="addNotification" :itm="itm" :update="update"/>
  <Feedbacks :items="feedbacks" />
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="slide" appear>
        <div class="modal" v-if="showModal">
            <h1>Are you sure?</h1>
            <p>Deleting feedback</p>
           
        </div>
    </transition>
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import store from '../store'
import Header from '../components/Header'
import Button from '../components/Button'
import Feedbacks from '../components/Feedbacks'
import AddItem from '../components/AddItem'
import NotificationList from '../components/NotificationList' 

import axios from 'axios'

export default{
    name: 'Dashboard',
    components: {
        Header,
        Button,
        Feedbacks,
        AddItem,
        NotificationList,
    },
    data() {
        return{
            feedbacks: [],
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
        async addItem(formData, newItem){
            if(!this.update){
                const res = await fetch('api/feedbacks', {
                    method: 'POST',
                    headers: this.getHeader(),
                    body: JSON.stringify(newItem)
                })

                const data = await res.json()
                if(res.status === 200){
                    if(formData!=null){this.addFile(formData, data)}
                    this.feedbacks = [...this.feedbacks, data]
                    this.addNotification({id: data._id,message: 'feedback Added!',type: 'success'})
                }else{
                    this.addNotification({id: data._id,message: data.message,type: 'dismissible'})
                }
            }else{this.updateItem(formData, newItem)}
        },
        async updateItem(formData, newItem){
             const res = await fetch(`api/items/${this.itm._id}`,{
                method: 'PUT',
                headers: this.getHeader(),
                body: JSON.stringify(newItem)
            })  
            
            const data = await res.json()
            if(res.status === 200){ 
                if(formData){
                    this.addImages(formData,data)
                }else{this.feedbacks = this.feedbacks.map((item)  => item._id === data._id ? item = data : item )}
                this.addNotification({id: data._id,message: 'feedback Updated!',type: 'success'})
            }else{
                this.addNotification({id: data._id,message: data.message,type: 'dismissible'})
            }
        },
        async addFile(formData,data){
            try {
                formData.append("reportid", data._id)
                formData.append("fileLocation", data.file)
                const res = await axios.post('api/images/upload',formData, {headers: this.getHeader()}).then((result) => {return result;})
                this.addNotification({id: 101,message: res.data.message,type: 'success'})
                if(this.update){
                    this.feedbacks = this.feedbacks.map((item)  => item._id === data._id ? item = data : item )
                }else{this.feedbacks = [...this.feedbacks, data]}
            } catch(err){
                this.addNotification({id: 101,message: err,type: 'dismissible'})
            }
        },
        async fetchItem(){
            const res = await fetch(`api/feedbacks/myReport`,{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        del(id){ 
            this.showModal = true 
            this.delId = id
        },
        getHeader(){
            const token = JSON.parse(localStorage.getItem('token'))
            return {'Content-type': 'application/json', 'Authorization': ' Bearer ' + token}
        },
        addNotification(notif){
            this.notifications.push(notif)
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        },
        toggleItem(){
            store.commit('toggleItem')
            this.update = false
            this.showAddItem = store.showAddItem
        }
    },
    async created(){
        this.feedbacks = await this.fetchItem()
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
