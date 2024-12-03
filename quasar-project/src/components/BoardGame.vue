<template>
    <div class="board-wrapper">
        <div class="board">
            <BoardItem :game-status="gameStatus" v-for="field in fields" :field="field" :key="'item-' + field.id"
                @selectField="selectField($event)"/>
        </div>

        <p class="difficult">Количество клеток: <strong>{{ difficult }}</strong></p>
        <div class="message-placeholder">
            <p class="win" v-if="isWin">Вы молодец! Продолжайте в том же духе!</p>
            <p class="fail" v-if="isFail">Вот не удача, Вы проиграли</p>
        </div>
        <div class="btnplay">
            <button class="btn" @click="start" :disabled="!canStartGame">Старт</button>
            <button class="btn" @click="$emit('exit')" :disabled="!canStartGame">Выйти</button>
        </div>
        
    </div>
</template>

<script>
import { ref } from 'vue';
import BoardItem from './BoardItem.vue';
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
    setup() {
        const number = 25;
        const gameStatus = ref(GAME_STATUS.NONE);

        const { difficult, fields, init } = useGameinit(number);

        const { start, canStartGame } = useGamestart(init, fields, difficult, number, gameStatus);

        const { selectField, isWin, isFail } = useGameprocess(fields, gameStatus, difficult, start);

        
        
        return {
            number,
            difficult,
            fields,
            init,
            start,
            gameStatus,
            canStartGame,
            selectField,
            isWin,
            isFail,
        };
    },
};
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

    .difficult{
        margin: 10px 10px;
        padding-bottom: 10px;
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
    
    
    .btnplay {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btnplay button {
      margin-right: 10px;
    }

    button:hover{
        background-color: #42b983;
    }

    button:disabled{
        opacity: .5;
    }

    .win{
        color: rgb(22, 149, 35);
    }

    .fail{
        color: tomato;
    }

    .message-placeholder {
        height: 20px;
        margin-bottom: 10px;
    }
</style>