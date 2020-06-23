const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");

const mealsRouter = require("./api/meals");
const reservationRouter = require("./api/reservation");

const port = process.env.PORT || 7000;

const buildPath = path.join(__dirname, "./../frontend");
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.use("/meals", mealsRouter);
router.use("/reservation", reservationRouter);

app.use("/api", router);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./../frontend/index.html"), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));