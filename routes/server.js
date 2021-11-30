const router = require("express").Router();
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
    res.render("index", {
        names: goodsNames,
        goods: goods
    });
});

module.exports = router;