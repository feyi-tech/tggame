

const setData = () => {
    if(window.Game) {
        const urlQuery = document.getElementById('url-query');
    
        urlQuery.innerText = `tgData1: ${JSON.stringify(window.Game.tgData)} | tgData2: ${JSON.stringify(window.Game.tgData2)} | tgData3: ${JSON.stringify(window.Game.tgData3)}`
    } else {
        setTimeout(() => {
            setData()
        }, 200)
    }
}
document.addEventListener('DOMContentLoaded', () => {
    setData()
});