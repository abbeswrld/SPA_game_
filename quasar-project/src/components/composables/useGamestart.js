
export default function useGamestart(init, fields, difficult, number) {
    

    const start = () => {
        init()
        prepareGame()
    }

    const prepareGame = () => {
        for(let i = 0; i < difficult.value; i++){
            const index = rand(0, number - 1) 

            if(fields.value[index].value !== 1){
                fields.value[index].value = 1   
            } else{
                i--
            }
            
        }
    }

    const rand = (min, max) => {
        return Math.floor(Math.random() * (max - min)) + min
    }

    return {
        start
    }
}