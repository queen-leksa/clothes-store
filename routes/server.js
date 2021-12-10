const router = require("express").Router();
const dbConnect = require("./connect.js");

const fs = require("fs");

let goodsNames = ["Название", "Категория", "Артикул", "Цвет", "Размер", "Кол-во", "Цена", "Бренд"];
let fileText = fs.readFileSync("./data/goods.csv", "utf-8");
// console.log(fileText);
// let goods = fileText.split("\n"); - для UNIX!
let goods = fileText.split("\r\n"); // - для Window

for (let i = 0; i < goods.length; i++) {
    //'Футболка;Одежда;00123;cyan;M;10;1000;ВсеМайки.ru', => ['Футболка','Одежда','00123','cyan','M','10','1000','ВсеМайки.ru']
    goods[i] = goods[i].split(";");
}
// console.log(goods);

router.get("/", function (req, res) {
    // res.send("<h1>Магазин одежды</h1>");

    const client = dbConnect();
    client.connect(function(err) {
        if (err) {
            console.log("Ошибка!");
        }
        console.log("Соединение с бд успешно");
        const col = client.db("shop").collection("clothers");
        col.find({}).toArray(function(err, data) {
            if (err) {
                console.log("Ошибка получения данных");
            }
            console.log(data[0]);
            client.close();
        });
    })

    res.render("index", {
        names: goodsNames,
        goods: goods
    });
});

router.get("/add", function (req, res) {
    res.render("form");
});

router.post("/addPro", function(req, res) {
    console.log(req.body);
    res.send({"message": "ok"});
});

module.exports = router;