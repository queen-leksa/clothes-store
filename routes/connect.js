function connect() {
    const MongoClient = require("mongodb").MongoClient;
    const db_name = "admin";
    const db_pass = "qwerty123";
    const path = `mongodb+srv://${db_name}:${db_pass}@2dev1.h7fw2.mongodb.net/shop?retryWrites=true&w=majority`;
    return new MongoClient(path);
}

module.exports = connect;