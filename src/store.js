import { createStore } from "vuex";

const store = createStore({
    state:{
        update: false,
        showAddItem: false
    },
    mutations: {
        setId(){
            const id = arguments[1]
            localStorage.setItem('id',JSON.stringify(id))
        },
        setToken(){
            const token = arguments[1]
            localStorage.setItem('token',JSON.stringify(token))
        },
        setAtoken(){
            const token = arguments[1]
            localStorage.setItem('atoken',JSON.stringify(token))
        },
        toggleItem(){
            this.showAddItem = !this.showAddItem
            this.update = false
        },
        toggleUpdate(){
            this.showAddItem = true
            this.update = true
        }
    }
});

export default store;