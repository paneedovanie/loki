const cors = require("cors"),
  express = require("express"),
  morgan = require("morgan"),
  path = require("path"),
  http = require("http"),
  app = express()

module.exports = async () => {
  if (config.environment !== "production") app.use(morgan("dev"));

  app.use(cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/storage", express.static(path.join(__basedir, "../storage")));

  require("./routes")(app);

  // app.use(express.static(path.join(__basedir, "../client/dist")));

  // app.use("*", function (req, res) {
  //   res.sendFile(
  //     path.join(__basedir, "../client/dist/index.html"),
  //     function (err) {
  //       if (err) res.status(500).send(err);
  //     }
  //   );
  // });

  let server = http.createServer(app)

  server.listen(config.port, (err) => {
    if (err) return console.log(err);
    console.log(`Server is running on port ${config.port}!`);
  });

  return server;
};
