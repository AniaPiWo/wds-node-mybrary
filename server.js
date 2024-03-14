if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
//setup
const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false }));

//routes
const indexRouter = require("./routes/index");
const authorRouter = require("./routes/authors");
const bookRouter = require("./routes/books");

//mongoose connection
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

//middleware
app.use("/", indexRouter);
app.use("/authors", authorRouter);
app.use("/books", bookRouter);

//start a server and have it listen for incoming connection
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});
