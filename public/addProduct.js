const form = document.forms[0];

async function send(data) {
    let res = await fetch("/addPro", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    });
    let info = await res.json();
    console.log(info);
    if (info.message !== "ok") {
        showPopup(info.message)
    } else {
        form.reset();
    }

}

form.addEventListener("submit", function(e) {
    e.preventDefault(); // остановить событие по умолчанию
    let body = {};
    for (let i = 0; i < form.elements.length; i++) {
        let el = form.elements[i];
        if (el.name) {
            body[el.name] = el.value;
        }
    }
    console.log(body);
    if (body.article) {
        send(body);
    } else {
        showPopup("Артикул не заполнен!");
    }
});