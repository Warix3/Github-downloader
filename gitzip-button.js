//fix for pjax
document.addEventListener("pjax:success", addButtons);

setToken();
addButtons();


GitZip.registerCallback(inputFn, this);
function addButtons() {
    //folder button
    if (!document.getElementsByClassName("select-menu get-repo-select-menu js-menu-container float-right select-menu-modal-right")[0]) {
        var downloadButton = '<div id="downloadButton" class="select-menu get-repo-select-menu js-menu-container float-right select-menu-modal-right"><button class="btn btn-sm btn-primary" type="button" tabindex="0"><span>Download</span>  </button></div>';
        var container = document.getElementsByClassName("file-navigation")[0];
        container.innerHTML = downloadButton + container.innerHTML;
        var downloadButtonElement = document.getElementById("downloadButton");
        downloadButtonElement.onclick = function () {
            startDownload(document.URL)
        };
    }
    //file buttons
    if(!document.getElementById("downloadButton0") && !document.getElementById("downloadButton1"))
        var entries = document.getElementsByClassName("files js-navigation-container js-active-navigation-container")[0].getElementsByClassName("js-navigation-item");
        for (var i = 0; i < entries.length; i++) {
            var tr = entries[i];
            if (tr.getElementsByTagName("a")[0].getAttribute("title") != "Go to parent directory") {
                tr.innerHTML = tr.innerHTML + '<td class="age"><a href="#" id="downloadButton' + i + '" >Download</a></td>';
                document.getElementById("downloadButton" + i).onclick = function (e) {
                    startDownload(e.target.parentElement.parentElement.getElementsByClassName("content")[0].getElementsByTagName("a")[0].getAttribute("href"))
                };
            }
        }
}

function startDownload(url) {
    if (!url.startsWith("https://github.com"))
        url = "https://github.com" + url;
    GitZip.zipRepo(url);
}

function inputFn(status, message, percent) {
    console.log("status: " + status, "; message: " + message + "; percent: " + percent + ";");
    if (status == "error") {
        window.alert("Error: "+ message);
        window.alert("Go to settings page of this addon to set your access token.")
    }
}

function setToken() {
    chrome.runtime.sendMessage({context:"getData",dataKey:"token"}, function(message){
        GitZip.setAccessToken(message.data);
    })
}

