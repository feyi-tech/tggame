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

  
    window.Game = {
        tgData: getQueryParamsAsJson(),
        getTop: getTop,
        saveScore: saveScore,
        shareScore: function () {
            if (!window.TelegramGameProxy) {
                return console.log("Can't find TelegramGameProxy")
            }
            window.TelegramGameProxy.shareScore()
        }
    }