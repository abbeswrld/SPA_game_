
<template>
    <div class="board-wrapper">
        <div class="board">
            <BoardItem v-for="field in fields" :field="field" :key="'item-' + field.id"/>
        </div>
            <p class="difficult">Количество клеток: <strong>{{ difficult }}</strong></p>


            <button class="btn" @click="start">Старт</button>
    </div>
</template>

<script>
import BoardItem from './BoardItem.vue'
import useGameinit from 'src/components/composables/useGameinit.js';
import useGamestart from 'src/components/composables/useGamestart.js';

export default {
    name: 'BoardGame',
    props: {},
    components: {
        BoardItem,
    },
    setup(){
        const number = 25

        const { difficult, fields, init } = useGameinit(number)

        const { start } = useGamestart(init, fields, difficult, number)

        return {
            number,
            difficult,
            fields,
            init,
            start
        }
    },


}
</script>


<style scoped>
    .board {
        width: 300px;
        display: block;
        background: #eee;
        margin: 0 auto;
    }
    .board-wrapper {
        margin-bottom: 100px;
    }

    

    .btn{
        background-color: #42b983cc;
        color: white;
        border: none;
        border-radius: 3px;
        padding: 10px 40px;
        margin: 10px 0;
        cursor: pointer;
        outline: none;

    }

    button:hover{
        background-color: #42b983;
    }
</style>