<template>
    <ul>
    <Feedback 
        v-for="feedback in items"
        :key="feedback._id"
        :feedback="feedback"  />
    </ul>
</template>

<script>
import Feedback from './Feedback'
export default {
    name: 'Feedbacks',
    props: {
        items: Array
    },
    components: {
        Feedback
    }
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

