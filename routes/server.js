const router = require("express").Router();

router.get("/", function (req, res) {
    // res.send("<h1>Магазин одежды</h1>");
    res.render("index");
});

module.exports = router;