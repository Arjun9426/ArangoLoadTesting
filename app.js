const app = require("express")();
var hostname = "localhost";
var port = 4321;
const Database = require("arangojs").Database;
const aql = require("arangojs").aql;
///const aql = require("arangojs").aql;

db = new Database("http://13.126.207.35:8529");

db.useDatabase("sampledb");
db.useBasicAuth("Arjun", "123456");

const userCollection = db.collection("Users");
const edgeCollection = db.edgeCollection("Friend");

var totalnode = 1000;
var totalrelations = 100;
var sep = totalnode / totalrelations;

app.get("/getFollowing", function (req, res) {
  console.log(
    ` for user in 1..1 outbound "Users/` +
      req.query.userId +
      `" Friends  
return user`
  );
  db.query(
    `for user in 1..1 outbound  "Users/${req.query.userId}" Friends sort user.name return user`,
    {
      //c: ' "Users/' + 23 + '"',
    }
  )
    .then((result) => {
      console.log(result._result);
      res.send(result._result);
    })
    .catch((err) => {
      console.log("inside err");

      console.log(err);
    });
});

app.get("/getFollowers", function (req, res) {
  console.log(
    ` for user in 1..1 inbound "Users/` +
      req.query.userId +
      `" Friends  
return user`
  );
  db.query(
    `for user in 1..1 outbound  "Users/${req.query.userId}" Friends sort user.name return user`,
    {
      //c: ' "Users/' + 23 + '"',
    }
  )
    .then((result) => {
      console.log(result._result);
      res.send(result._result);
    })
    .catch((err) => {
      console.log("inside err");

      console.log(err);
    });
});
// code to insert edges
/*
docs = [];

var doc = {
  _from: "Users/1",
  _to: "Users/2",
  relation: "Friend",
};

var starttime = new Date();

var count = 0;
for (var i = 1; i <= totalnode; i++) {
  doc._from = "Users/" + i.toString();
  for (var j = 1; j <= totalrelations; j++) {
    doc._to = "Users/" + (((i + sep * j - 2) % totalnode) + 1).toString();
    var temp = new Object();
    temp._from = doc._from;
    temp._to = doc._to;
    temp.relation = doc.relation;
    docs.push(temp);
  }
}
var endtime = new Date();
var totaltime = (endtime - starttime) / 1000;
console.log(
  "Time took to insert 100000 objects into docs array => " + totaltime
);
edgeCollection.import(docs).then(
  (result) => {
    console.log("Import complete:", result);
    var endtime1 = new Date();
    var totaltime = (endtime1 - endtime) / 1000;

    console.log(
      "Time took to insert 100000 edge documents into arangoDB => " + totaltime
    );
  },
  (err) => console.error("Import failed:", err)
);
*/
// code to insert Users in database
/*
var bharatbhoomi = [
  "Hastinapur",
  "Naglok",
  "Kuntibhoj",
  "Dwarka",
  "Virat",
  "SindhuDesh",
  "Ghandhar",
  "Kashi",
];
var doc = {
  _key: "1",
  name: 1,
  age: 1,
  phone: 1,
  rajya: "random",
};
for (var i = 0; i < totalnode; i++) {
  doc._key = (i + 1).toString();
  doc.name = i + 1;
  doc.phone = i + 1;
  doc.age = totalnode - i;
  doc.rajya = bharatbhoomi[i % bharatbhoomi.length];
  userCollection
    .save(doc)
    .then
    //(meta) => console.log("Document saved:", meta._rev),
    //(err) => console.error("Failed to save document:", err)
    ();
}
*/

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
