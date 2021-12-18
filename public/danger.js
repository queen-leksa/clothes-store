// document.body.style.background = "darkslateblue";

let div = document.querySelector(".admin");
let clear = document.querySelector(".update");
var goods;
const getData = async function (tag, local) {
    let res = await fetch("/admin/db");
    let result = await res.json();
    // Далее распределить данные в виде html-тегов
    localStorage.setItem("goods", JSON.stringify(result.data));
    if (result.data) {
        window.goods = [...result.data];
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

const deleteData = async function(param, row) {
    let res = await fetch(`/admin/db/${param}`, {
        method: "delete",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    let result = await res.json();
    if (result.message === "ok") {
        showPopup(JSON.stringify(result));
        window.goods = window.goods.filter(item => item.article !== param);
        localStorage.setItem("goods", JSON.stringify(window.goods));
        row.remove();
    } else {
        showPopup(result.message);
    }
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
    deleteData(article, btn.parentElement.parentElement);
}

const updateItem = function(btn) {
    let index = btn.getAttribute("data-id");
    let row = btn.parentElement.parentElement;
    let rowNames = row.parentElement.firstElementChild;
    for (let i = 1; i < row.childNodes.length - 1; i++) {
        let td = row.childNodes[i];
        let val = td.innerText;
        let name = rowNames.childNodes[i].innerText;
        td.innerHTML = `<input type="text" name="${name}" value="${val}">`;
    }
    let last = row.lastElementChild;
    last.innerHTML = `<button>Ок</button>
                      <button>Отмена</button>`
    let cancel = last.lastElementChild;
    cancel.onclick = function() {
        for (let i = 1; i < row.childNodes.length - 1; i++) {
            let td = row.childNodes[i];
            td.innerHTML = td.firstElementChild.value;
        }
        last.innerHTML = `<button data-id="${index}" onclick="updateItem(this)">Изменить</button>
        <button data-art="${window.goods[index].article}" onclick="deleteItem(this)">Удалить</button>`
    }
    let inputs = row.querySelectorAll("input");
    let newData = {};
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].onchange = function(e) {
            newData[e.target.name] = e.target.value;
        }
    }
    let change = last.firstElementChild;
    change.onclick = function() {
        console.log(Object.keys(newData));
        let id = row.firstElementChild.innerText
        if (Object.keys(newData).length) {
            updateData(row.firstElementChild.innerText, newData);
            window.goods.map(function(el) {
                if(el._id === id) {
                    for (let key in newData) {
                        el[key] = newData[key];
                    }
                }
                return el;
            });
            localStorage.setItem("goods", JSON.stringify(window.goods));
            cancel.click();
        } else {
            cancel.click();
        }
    }

    console.log(btn, window.goods[index]);
}


goods = localStorage.getItem("goods");
if (goods) {
    goods = JSON.parse(goods);
    parseGoods(goods, div);
} else {
    getData(div, goods);
}

clear.addEventListener("click", function(e) {
    localStorage.removeItem("goods");
    goods = null;
    getData(div, goods);

})
