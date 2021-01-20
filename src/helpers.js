import axios from 'axios'

export function getFromURL(url) {
    return axios.get(url).then(res => {
        const { data } = res
        const { greeting } = data
        return { type: 'SUCCESS', greeting }
    }).catch((error) => {
        return { type: 'ERROR', error }
    })
}
