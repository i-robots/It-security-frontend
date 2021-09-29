<template>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label for="name">Name</label>
            <input type="text" v-model="name" name="name" placeholder='Enter Name'>
        </div>
        <div class="form-control">
            <label for="comment">Your feedback </label><span v-if="update">{{itm.price}}</span>
            <textarea type="text" v-model="comment" name="comment" placeholder='Write your comment'/>
        </div>
        <div class="form-control">
                <label>Upload file
                  <input type="file" ref="pdf_file" v-on:change="handleFileUpload()" class="file"/>
                </label>
                <span class="info">Upload pdf file</span>
            </div>
        <input class="btn" type="submit" value="Submit Feedback">
    </form>
</template>

<script>
export default{
    name:'AddItem',
    props: {
        itm: Object,
        update: Boolean
    }, 
    data(){
        return{
            name: '',
            comment: '',
            pdf_file: null
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()

            if(!this.name){
                this.showNotification("Name Empty!")
                return
            }

            if(!this.comment){
                this.showNotification('Comment Empty')
                return
            }
            if(!this.pdf_file){
                this.$emit('add-item', null , this.newItem(null))
                return
            }

            const fileData = this.checkFile()
            if(fileData){
                this.$emit('add-item', fileData[0] , this.newItem(fileData[1]))
            }
        },
        checkFile(){
            var formData = new FormData()
            
            var file = this.pdf_file;
            let allowedExtension = ['application/pdf'];
            if(allowedExtension.indexOf(this.pdf_file.type)==-1){
                this.showNotification('unsupported '+this.pdf_file.type+' file selected!')
                return
            }
            let filename = Math.floor(Math.random() * 1000000) + '.' + file.name.split('.').pop()
            formData.append("pdf_file", file)
            return [formData , filename]
        },
        showNotification(msg){
            this.$emit('add-notification',{id: 0,message: msg,type: 'dismissible'})
        },
        newItem(filename){
            return {
                name: this.name,
                description: this.comment,
                file: filename
            }
        },
        handleFileUpload(){
          this.pdf_file = this.$refs.pdf_file.files[0];
        }
    },
    emits: ["add-item","add-notification"]
}
</script>

<style scoped>
.add-form{
    margin-top: 20px;
    margin-bottom: 20px;
}

.form-control{
    margin: 20px 0;
}

.form-control label{
    display: block;
    font-weight: bold;
}

.form-control input, textarea{
    width: 55%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

textarea{
    height: 100px;
}

.form-control-check{
    display: inline;
    justify-content: space-between;
}

.form-control-check label{
    flex: 1;
}

.form-control-check input{
    flex: 2;
    width: 20%;
    height: 20px;
}

.btn{
    display: inline-block;
    width: 60%;
    background: rgba(107, 155, 107, 0.911);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    margin: 5px;
    font-size: 15px;
}

.form-control span{
    font-size: 16px;
    color: rgb(114, 77, 77);
    display: inline;
}

.watermark { 
  user-select: none;
  position: absolute;
  opacity: 0.15;
  z-index: 1;
  right: 0;
  max-height: 95%;
  max-width: 95%;
}

@media (max-width:900px) {
    .watermark { 
        max-width:50%;
    }
}
</style>