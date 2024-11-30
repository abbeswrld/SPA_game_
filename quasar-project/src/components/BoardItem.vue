
<template>
    <div :class="['item', field.value === 1 ? 'item-active' : '']"></div>
</template>

<script>
export default {
    name: 'BoardItem',
    props:{
        field: {
            type: Object,
            required: true,
        },
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