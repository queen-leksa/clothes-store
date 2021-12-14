function showPopup(msg) {
    let popup = document.createElement("div");
    popup.className = "popup";
    popup.innerText = msg;
    let close = document.createElement("div");
    close.className = "popup_close";
    close.innerText = "x";
    popup.appendChild(close);
    document.body.appendChild(popup);
    close.addEventListener("click", function(e) {
        popup.remove();
    });
}