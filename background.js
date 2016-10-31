chrome.runtime.onMessage.addListener(handleMessage);


function handleMessage(m, sender,responseCallback) {
    switch(m.context) {
        case "getData": 
            var data = localStorage.getItem(m.dataKey);
            responseCallback({message: data});
        break;
    }
}


