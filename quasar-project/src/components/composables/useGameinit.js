import { onBeforeMount, ref } from 'vue'
import { DIFFICULT, FIELD } from 'src/constants'

export default function useGameinit(number) {
    let difficult = ref(DIFFICULT)
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

    onBeforeMount(init)

    return {
        difficult,
        fields,
        init
    }
}