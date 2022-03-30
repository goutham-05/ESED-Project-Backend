const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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
      if (results) {
        res.send(results);
      } else {
        res.send(error);
      }
    }
  );
});

app.get("/items-list", (req, res) => {
  connection.query(
    "SELECT * FROM crate_items",
    function (error, results, fields) {
      if (results) {
        res.send(results);
      } else {
        res.send(error);
      }
    }
  );
});

app.get("/crates-list", (req, res) => {
  connection.query(
    "SELECT * FROM crate_info",
    function (error, results, fields) {
      if (results) {
        res.send(results);
      } else {
        res.send(error);
      }
    }
  );
});

app.get("/create-client", (req, res) => {
  const userdId = req.body.userdId;
  const company_id = req.body.companyId;
  const employee_email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.employee_firstname;
  const lastName = req.body.employee_lastname;
  const employee_role = req.body.employeeRole;
  const employee_department = req.body.branch;
  const employee_contact = req.body.employeeRole;
  connection.query(
    `INSERT INTO users VALUES (NULL, ${userdId}, ${company_id}, ${employee_email}, ${password}, ${firstName}, ${lastName}, ${employee_role}, ${employee_department}, ${employee_contact})`,
    (error, results, fields) => {
      if (results) {
        res.send(results);
      } else {
        res.send(error);
      }
    }
  );
});

app.get("/get-clients", (req, res) => {
  connection.query(`SELECT * FROM users`, (error, results, fields) => {
    if (results) {
      res.send(results);
    } else {
      res.send(error);
    }
  });
});

app.get("/get-billing-history", (req, res) => {
  connection.query(`SELECT * FROM orders`, (error, results, fields) => {
    if (results) {
      res.send(results);
    } else {
      res.send(error);
    }
  });
});

app.post("/create-crate", (req, res) => {
  const user_id = req.body.clientId;
  const company_id = req.body.companyId;
  const crate_name = req.body.crateName;
  const crate_contents = req.body.crateType;
  const crate_location = req.body.address;
  const crate_shelf_id = req.body.address;

  connection.query(
    `INSERT INTO crate_info values(0, ${user_id}, ${company_id}, ${crate_name}, ${crate_contents}, ${crate_location}, ${crate_shelf_id}, "active")`,
    function (error, results, fields) {
      if (results) {
        res.send(results);
      } else {
        res.send(error);
      }
    }
  );
});

app.post("/request-delivery", (req, res) => {
  const crate_id = req.body.crate_id;
  connection.query(
    `UPDATE crate_info set delivery_status=active where crate_id=${crate_id}`,
    function (error, results, fields) {
      if (results) {
        res.send(results);
      } else {
        res.send(error);
      }
    }
  );
});

app.post("/add-item", (req, res) => {
  const user_id = req.body.itemName;
  const item_type = req.body.itemType;

  connection.query(
    `INSERT INTO items values(0, ${user_id}, ${item_type}, false)`,
    function (error, results, fields) {
      if (results) {
        res.send(results);
      } else {
        res.send("Unable to add item", error);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
