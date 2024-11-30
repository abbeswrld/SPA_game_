

<template>
    <div class="board-wrapper">
        <div class="board">
            <BoardItem :game-status="gameStatus" v-for="field in fields" :field="field" :key="'item-' + field.id"
                @selectField="selectField($event)"/>
        </div>



            <p class="difficult">Количество клеток: <strong>{{ difficult }}</strong></p>

            <button class="btn" @click="start" :disabled="!canStartGame">Старт</button>
    </div>
</template>

<script>
import { ref } from 'vue';
import BoardItem from './BoardItem.vue'
import useGameinit from 'src/components/composables/useGameinit.js';
import useGamestart from 'src/components/composables/useGamestart.js';
import useGameprocess from 'src/components/composables/useGameprocess.js';
import { GAME_STATUS } from 'src/constants';

export default {
    name: 'BoardGame',
    props: {},
    components: {
        BoardItem,
    },
    setup(){
        const number = 25
        const gameStatus = ref(GAME_STATUS.NONE)

        const { difficult, fields, init } = useGameinit(number)

        const { start, canStartGame } = useGamestart(init, fields, difficult, number, gameStatus)

        const { selectField } = useGameprocess(fields)

        return {
            number,
            difficult,
            fields,
            init,
            start,
            gameStatus,
            canStartGame,
            selectField,
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

    button:disabled{
        opacity: .5;
    }
</style>