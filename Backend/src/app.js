const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const categoryRoutes = require("./routes/category.routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/categories", categoryRoutes);

app.use(errorHandler);

module.exports = app;
