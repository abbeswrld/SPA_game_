
import { nextTick, computed } from 'vue';
import { DEFAULT_DIFFICULT, FIELD, GAME_SPEED, GAME_STATUS } from 'src/constants';
import axios from 'axios';

export default function useGameprocess(fields, gameStatus, difficult, start) {

    const selectField = (id) => {
        const index = fields.value.findIndex((field) =>{
            return field.id === id
        })

        if (index > -1 && !fields.value[index].clicked){
            fields.value[index].clicked = true;
            

            checkGame()
        }

    }

    const checkGame = () => {
        const errorIndex = fields.value.findIndex((field) => {
            return field.clicked && field.value === FIELD.EMPTY
            
        })

        if (errorIndex > -1){
            setGameOver()
            return
        }
        
        const notFoundItemIndex = fields.value.findIndex((field) => {
            return !field.clicked && field.value === FIELD.FILLED
        })

        if (notFoundItemIndex === -1){
            setWin();
        }
    }

    const setGameOver = async () => {
        gameStatus.value = GAME_STATUS.FAIL;
        const username = localStorage.getItem('username');
        await axios.post('http://localhost:8000/api/update_user_record/', {
            params: {
              username: username, 
              record: difficult.value - 1,
            },
          });
        difficult.value = DEFAULT_DIFFICULT;
    };
      

    const setWin = () => {
        gameStatus.value = GAME_STATUS.WIN

        setTimeout(async () => {
            gameStatus.value = GAME_STATUS.WIN
            difficult.value += 1

            await nextTick()

            start()
        }, GAME_SPEED)
        
    }

    const isWin = computed(() => {
      return gameStatus.value === GAME_STATUS.WIN 
    })
    const isFail = computed(() => {
        return gameStatus.value === GAME_STATUS.FAIL
    })

    return {
        selectField,
        isWin,
        isFail,
        
    }
}