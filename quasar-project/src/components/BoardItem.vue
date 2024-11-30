
<template>
    <div :class="itemClass"></div>
</template>

<script>
import { computed } from 'vue';
export default {
    setup(props) {
           const itemClass = computed(() => {
               return ['item', (props.field.value === 1 && props.preview) ? 'item-active' : ''];
           });

           return { itemClass };
       },

    name: 'BoardItem',
    props:{
        field: {
            type: Object,
            required: true,
        },
        preview: {
            type: Boolean,
            required: false,
            default: false,
        }
    },
}


</script>


<style scoped>
    .item {
        position: relative;
        width: 50px;
        height: 50px;
        background-color: #ccc;
        display: inline-block;
        margin: 5px;
        cursor: pointer;

        transition: .4s;
        transform-style: preserve-3d;
    }

    .item-active {
        background-color: #42b983cc;
        transform: rotateX(180deg);
    }
</style>