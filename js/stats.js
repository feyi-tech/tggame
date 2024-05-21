

const setData = () => {
    if(window.Game) {
        const urlQuery = document.getElementById('url-query');
    
        urlQuery.innerText = `${JSON.stringify(window.Game.tgData)}`
    } else {
        setTimeout(() => {
            setData()
        }, 200)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    setData()
});