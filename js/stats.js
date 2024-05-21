document.addEventListener('DOMContentLoaded', () => {
    const urlQuery = document.getElementById('url-query');
    
    urlQuery.innerText = JSON.stringify(window.Game.tgData)
});