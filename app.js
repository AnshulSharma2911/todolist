const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
const items = ["Pratice coding", "Read Book", "Workout"];
const workItems = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  let day = date.getDate();

  res.render("List", {
    ListTitle: day,
    newListItem: items,
  });

  app.post("/", function (req, res) {
    const item = req.body.newItem;
    if (req.body.List === "Work") {
      workItems.push(item);
      res.redirect("/work");
    } else {
      items.push(item);
      res.redirect("/");
    }
  });

  app.get("/work", function (req, res) {
    res.render("List", { ListTitle: "Work List", newListItem: workItems });
  });

  app.post("/work", function (req, res) {
    const item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
  });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
