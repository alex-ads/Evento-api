const express = require("express");

const palestranteRoute = require("./routes/palestranteRoutes");
const eventoRoute = require("./routes/eventoRoutes");
const palestraRoute = require("./routes/palestraRoutes");

require("express-async-errors");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  return res.status(400).json({ message: "Olá Mundo!" })
})

app.use("/palestrante", palestranteRoute);
app.use("/evento", eventoRoute);
app.use("/palestra", palestraRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;
