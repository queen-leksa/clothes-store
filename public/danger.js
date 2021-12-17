// document.body.style.background = "darkslateblue";

let div = document.querySelector(".admin");

const getData = async function(tag) {
    let res = await fetch("/admin/db");
    let result = res.json();
    console.log(result);
    // Далее распределить данные в виде html-тегов
}

const updateData = async function(param, data) {
    let res = await fetch(`/admin/db/${param}`, {
        method: "put",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
}

const deleteData = async function(param) {
    let res = await fetch(`/admin/db/${param}`, {
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
}

getData(div);