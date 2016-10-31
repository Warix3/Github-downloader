function saveOptions(e) {
  localStorage.setItem("token",document.querySelector("#color").value);
}

document.querySelector("form").addEventListener("submit", saveOptions);