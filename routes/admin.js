const router = require("express").Router();
const dbConnect = require("./connect");
const mongo = require("mongodb");

// cb - функция, которая будет работать внутри функции dbQuery (callback)
const dbQuery = function(cb, res, queryParam = {}, dataObj = null) {
    const client = dbConnect();
    client.connect(function(err) {
        if (err) {
            res.send({"message": "Ошибка соединения с базой данных"})
            client.close();
        }
        const col = client.db("shop").collection("clothers");
        cb(col, client, res, queryParam, dataObj);
    });
};

const queryFind = function(col, cl, rs, obj = {}) {
    col.find(obj).toArray(function(err, result) {
        if (err) {
            rs.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            rs.send({"message": "ok", "data": result});
            cl.close();
        }
    });
}
const queryDelete = function(col, cl, rs, obj) {
    col.deleteOne(obj, function(err, result) {
        if (err) {
            rs.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            rs.send({"message": "ok", "data": result});
            cl.close();
        }
    });
}
const queryAdd = function(col, cl, rs, param = null, obj) {
    col.insertOne(obj, function(err) {
        if (err) {
            rs.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            rs.send({"message": "ok"});
            cl.close();
        }
    });
}
const queryUpdate = function(col, cl, rs, param, newData) {
    console.log(newData, param);
    col.updateOne(param, {$set: newData}, function(err, result) {
        if (err) {
            rs.send({"message": "База данных не отвечает"});
            cl.close();
        } else {
            rs.send({"message": "ok", "data": result});
            cl.close();
        }
    });
}

/* Получить все товары из БД */
router.get("/db", function(req, res) {
    // res.send({msg: "omg"})
    dbQuery(queryFind, res);
});
/* Удалить товар из БД по артикулу */
router.delete("/db/:article", function(req, res) {
    dbQuery(queryDelete, res, {"article": req.params.article});
});
/* Изменить информацию о товаре в БД по артикулу */
router.put("/db/:article", function(req, res) {
    dbQuery(queryUpdate, res, {"_id": mongo.ObjectId(req.params.article)}, req.body);
});

router.get("/", function(req, res) {
    res.render("admin");
});

module.exports = router;