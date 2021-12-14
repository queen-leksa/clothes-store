const router = require("express").Router();
const dbConnect = require("./connect.js");

const fs = require("fs");

let goodsNames = ["Название", "Категория", "Артикул", "Цвет", "Размер", "Кол-во", "Цена", "Бренд"];
let fileText = fs.readFileSync("./data/goods.csv", "utf-8");
// console.log(fileText);
// let goods = fileText.split("\n"); - для UNIX!
const OS = "mac"; // "win"
let splitter;
if (OS === "mac") {
    splitter = "\n";
} else {
    splitter = "\r\n";
}
let goods = fileText.split(splitter); // - для Window

for (let i = 0; i < goods.length; i++) {
    //'Футболка;Одежда;00123;cyan;M;10;1000;ВсеМайки.ru', => ['Футболка','Одежда','00123','cyan','M','10','1000','ВсеМайки.ru']
    goods[i] = goods[i].split(";");
}
// console.log(goods);

router.get("/item", (req, res) => {
    res.render('item')
})

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
    });
    console.log(goods.length);
    console.log(goods);
    res.render("index", {
        names: goodsNames,
        goods: goods
    });
});

router.get("/add", function (req, res) {
    res.render("form", {
        names: goodsNames,
        formNames: ["name", "category", "article", "color", "size", "count", "price", "brand"],
        types: ["text", "text", "number", "color", "text", "number", "number", "text"]
    });
});

router.post("/addPro", function(req, res) {
    console.log(req.body);
    const client = dbConnect();
    client.connect(function(err) {
        if (err) {
            console.log("Ошибка!");
            res.send({"message": "Ошибка соединения с БД"});
            client.close();
        }
        console.log("Соединение с бд успешно");
        const col = client.db("shop").collection("clothers");
        col.findOne({"article": req.body.article}, function(err, data) {
            if (data) {
                res.send({"message": "Товар с таким артикулом уже существует"})
            } else {
                col.insertOne(req.body, function (err) {
                    if (err) {
                        console.log("Данные не добавились");
                        res.send({"message": "БД не хочет с тобой работать"});
                        client.close();
                    } else {
                        res.send({"message": "ok"});
                        client.close();
                    }
                });
            }
            console.log(data);
        });
    });
});

router.get("/goods", function (req, res) {
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
            res.render("goods", {
                names: goodsNames,
                formNames: ["name", "category", "article", "color", "size", "count", "price", "brand"],
                goods: data
            });
            client.close();
        });
    });
});
module.exports = router;