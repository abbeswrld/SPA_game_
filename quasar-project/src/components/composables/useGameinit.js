import { onBeforeMount, ref, watch } from 'vue'
import { DEFAULT_DIFFICULT, FIELD, MAX_DIFFICULT } from 'src/constants'


export default function useGameinit(number) {
    let difficult = ref(DEFAULT_DIFFICULT)
    let fields = ref([])

    const init = () => {
        fields.value = [];
        for (let i = 0; i < number; i++) {
            fields.value.push({
                id: i,
                clicked: false,
                value: FIELD.EMPTY,
            });
        }
    }

    watch(difficult, (newDifficult) => {
        if (newDifficult > MAX_DIFFICULT) {
            difficult.value = MAX_DIFFICULT
        }
    })


    onBeforeMount(init)

    return {
        difficult,
        fields,
        init
    }
}
