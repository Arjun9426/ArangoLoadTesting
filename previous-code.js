const app = require("express")();
var hostname = "localhost";
var port = 1234;

const Database = require("arangojs").Database;
const db = require("arangojs")();

db.useDatabase("_system");
const userCollection = db.collection("Users");

var doc = {
  _key: "22222",
  name: "pinga",
  age: 121,
};
/*
userCollection.save(doc).then(
meta => console.log('Document saved:', meta._rev),
err => console.error('Failed to save document:', err)
);
*/
userCollection.document("166").then(
  (doc) => console.log("Document:", JSON.stringify(doc, null, 2)),
  (err) => console.error("Failed to fetch document:", err.message)
);

app.get("/", function (req, res) {
  res.send("Hello Random");
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
