// document.body.style.background = "darkslateblue";

let div = document.querySelector(".admin");

const getData = async function (tag) {

    let res = await fetch("/admin/db");
    let result = await res.json();
    // Далее распределить данные в виде html-тегов
    localStorage.setItem("goods", JSON.stringify(result.data));
    if (result.data) {
        parseGoods(result.data, div);
    }
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
    let result = await res.json();
    console.log(result);
}

const deleteData = async function(param) {
    let res = await fetch(`/admin/db/${param}`, {
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let result = await res.json();
    showPopup(JSON.stringify(result));
}

const parseGoods = function (goods, el) {
    let html = `<table>`
    html += `<tr>`;
    for (let name in goods[0]) {
        html += `<th>${name}</th>`;
    }
    html += `<th></th>`;
    html += `</tr>`;
    for (let i = 0; i < goods.length; i++) {
        html += `<tr>`;
        for (let name in goods[i]) {
            html += `<td>${goods[i][name]}</td>`;
        }
        html += `<td>
                    <button data-id="${i}" onclick="updateItem(this)">Изменить</button>
                    <button data-art="${goods[i].article}" onclick="deleteItem(this)">Удалить</button>
                 </td>`;
        html += `</tr>`;
    }
    html += `</table>`;
    el.innerHTML = html;
}

const deleteItem = function (btn) {
    console.log(btn);
    let article = btn.getAttribute("data-art");
    deleteData(article);
}

const updateItem = function(i) {
    console.log(goods[i]);
}


let goods = localStorage.getItem("goods");
console.log(goods);
if (goods) {
    goods = JSON.parse(goods);
    parseGoods(goods, div);
} else {
    getData(div);
}
