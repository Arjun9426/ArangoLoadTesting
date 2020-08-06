const app = require("express")();
var hostname = "localhost";
var port = 1234;

const Database = require("arangojs").Database;
const db = new Database({
    url: "http://localhost:8529",
    database: "-sy",
    auth: { username: "root", password: "" },
  });

db.createDatabase("mydb").then(
  () => console.log("Database created"),
  (err) => console.error("Failed to create database:", err)
);

db.useDatabase("mydb");

var collection = db.collection("firstCollection");
collection.create().then(
  () => console.log("Collection created"),
  (err) => console.error("Failed to create collection:", err)
);

var doc = {
  _key: "22222",
  name: "pinga",
  age: 121,
};

collection.save(doc).then(
  (meta) => console.log("Document saved:", meta._rev),
  (err) => console.error("Failed to save document:", err)
);

app.get("/", function (req, res) {
  res.send("Hello Random");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
