const express = require("express");
const app = express();
const port = 8080;

app.set("view engine", "ejs");

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

app.get("/", (req, res) => {
  res.render("./index", { title: "Mini Messagerboard", messages: messages });
});

app.get("/new", (req, res) => {
  res.render("./form.ejs", { title: "New Messages" });
});

app.use(express.urlencoded({ extended: true }));

app.post("/new", (req, res) => {
  const messageText = req.body.messageText;
  const authorName = req.body.authorName;
  messages.push({ text: messageText, user: authorName, added: new Date() });
  res.redirect("/");
});

app.get("/open", (req, res) => {
  res.render("./new.ejs", { title: "Open Message", messages: messages });
});

app.get("/message/:id", (req, res) => {
  const messageIndex = req.params.id;
  const myMessage = messages[messageIndex];
  res.render("./new.ejs", { title: "Opened Message", message: myMessage });
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
