const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const setupAndStartServer = function () {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);

  if (process.env.DB_SYNC) {
    db.sequelize.sync({ alter: true });
  }
  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
};

setupAndStartServer();
