export function getFromURL(url: string) {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            const { greeting } = data
            return { type: 'SUCCESS', greeting }
        }).catch((error) => {
            return { type: 'ERROR', error }
        })
}