    function getTop (cb) {
        var request = new window.XMLHttpRequest()
        request.open('GET', '/score', true)
        request.onload = function () {
            if (request.status >= 200 && request.status < 300) {
                cb(null, JSON.parse(request.responseText))
            } else {
                cb(request.status)
            }
        }
        request.onerror = cb
        request.send()
    }
  
    function saveScore (score) {
        var request = new window.XMLHttpRequest()
        request.open('POST', '/score', true)
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        request.send('{"score": ' + score + '}')
    }

    // Function to get URL query parameters as a JSON object
    function getQueryParamsAsJson() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const paramsObject = {};

        // Iterate over the URLSearchParams and construct the JSON object
        for (const [key, value] of urlParams.entries()) {
            // If the parameter key already exists, convert it to an array (handling multiple values for the same key)
            if (paramsObject[key]) {
                if (Array.isArray(paramsObject[key])) {
                    paramsObject[key].push(value);
                } else {
                    paramsObject[key] = [paramsObject[key], value];
                }
            } else {
                paramsObject[key] = value;
            }
        }

        return paramsObject;
    }
    

    document.addEventListener('DOMContentLoaded', () => {
        const tg = window.Telegram.WebApp;
        //Set the webview drawer to fullscreen
        tg.expand();

        // Get the initData string
        const initData = tg.initData;

        // Decode and parse the initData string
        const initDataUnsafe = tg.initDataUnsafe;
    
        function handleMainButtonClick() {
            console.log('Main button clicked!');
            // Handle main button click
        }
    
        tg.onEvent('mainButtonClicked', handleMainButtonClick);
    
        // Cleanup event listeners when necessary
        window.addEventListener('unload', () => {
            tg.offEvent('mainButtonClicked', handleMainButtonClick);
        });

        window.Game = {
            tgData: getQueryParamsAsJson(),
            tgData2: initData,
            tgData3: initDataUnsafe,
            getTop: getTop,
            saveScore: saveScore,
            shareScore: function () {
                if (!window.TelegramGameProxy) {
                    return console.log("Can't find TelegramGameProxy")
                }
                window.TelegramGameProxy.shareScore()
            }
        }
    });
    