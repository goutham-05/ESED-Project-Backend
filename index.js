const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3001;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mysql = require("mysql");

var connection = mysql.createConnection({
  user: "root",
  password: "1494",
  database: "comp1471",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", (req, res) => {
  connection.query(
    "SELECT * FROM crate_items",
    function (error, results, fields) {
      console.log("Koca: ", results);
      console.log("fields: ", fields);
      console.log("error: ", error);
    }
  );
});

app.get("/items-list", (req, res) => {
  connection.query(
    "SELECT * FROM crate_items",
    function (error, results, fields) {
      console.log("Koca: ", results);
      console.log("fields: ", fields);
      console.log("error: ", error);
      res.send(results);
    }
  );
});

app.get("/crates-list", (req, res) => {
  connection.query(
    "SELECT * FROM crate_info",
    function (error, results, fields) {
      console.log("Koca: ", results);
      console.log("fields: ", fields);
      console.log("error: ", error);
      res.send(results);
    }
  );
});

app.get("/create-client", (req, res) => {
  const userdId = req.email;
  connection.query(
    `INSERT INTO users VALUES (NULL, ${userdId}, '1', 'afasdfw', 'sadf', 'asdfasd', 'sadf', 'manager', 'fasdfasdf', '324134')`,
    (error, results, fields) => {
      console.log("Koca: error", error);
      console.log("Koca: results", results);
    }
  );
});

app.get("/get-clients", (req, res) => {
  connection.query(`SELECT * FROM users`, (error, results, fields) => {
    res.send(results);
  });
});

app.get("/get-billing-history", (req, res) => {
    connection.query(`SELECT * FROM orders`, (error, results, fields) => {
      res.send(results);
    });
  });

app.post("/create-crate", (req, res) => {
  console.log("Koca: req ", req.body);
  const user_id = req.body.clientId;
  const company_id = req.body.companyId;
  const crate_name = req.body.crateName;
  const crate_contents = req.body.crateType;
  const crate_location = req.body.address;
  const crate_shelf_id = req.body.address;

  connection.query(
    `INSERT INTO crate_info values(0, 1, ${company_id}, "test", "crate_contents", 2, 1, "active")`,
    function (error, results, fields) {
      console.log("Koca: ", results);
      console.log("fields: ", fields);
      console.log("error: ", error);
      res.send(results);
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
