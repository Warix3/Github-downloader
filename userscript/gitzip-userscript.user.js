// ==UserScript==
// @name        Github folder download
// @namespace   https://github.com/Warix3
// @description Adds a download button for folders to github repositories.
// @include     https://github.com/*/*/tree/*
// @version     1
// @grant       none
// @require     https://rawgit.com/KinoLien/gitzip/master/js/jquery-1.11.3.min.js
// @require     https://rawgit.com/KinoLien/gitzip/master/js/FileSaver.min.js
// @require     https://rawgit.com/KinoLien/gitzip/master/js/jszip.min.js
// @require     https://rawgit.com/KinoLien/gitzip/master/js/API.js
// @run-at      document-idle
// ==/UserScript==
GitZip.registerCallback(inputFn, this);

//fix for cached pages
document.body.onclick = function () {
    window.setTimeout(addButton, 1500);
};

addButton();

function addButton() {
    if (!document.getElementById("downloadButton")) {
        var downloadButton = '<div id="downloadButton" class="select-menu get-repo-select-menu js-menu-container float-right select-menu-modal-right">  <button class="btn btn-sm btn-primary" title="download this folder" type="button" aria-label="download this folder" tabindex="0"><span>Download folder</span></button></div>';
        var container = document.getElementsByClassName("file-navigation")[0];
        container.innerHTML = downloadButton + container.innerHTML;
        var downloadButtonElement = document.getElementById("downloadButton");
        downloadButtonElement.onclick = startDownload;
    }
}

function inputFn(status, message, percent) {
    console.log("status: " + status, "; message: " + message + "; percent: " + percent + ";");
    if (status = "error") {
        window.alert("Error: "+ message);
    }
}

function startDownload() {
    GitZip.zipRepo(document.URL);
}