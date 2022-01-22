const express = require("express");
const cors = require("cors");
const config = require("./config");

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/static", express.static("app/static"));
app.set("trust proxy", true);

app.get("/", (req, res) => {
  const help = `
    <pre>
      Welcome to the API!
      Use an x-access-token header to work with your own data:
      fetch(url, { headers: { 'x-access-token': 'whatever-you-want' }})
      The following endpoints are available:
    </pre>
  `;

  res.send(help);
});

const baseAPIPath = "/api/v1";
app.use(baseAPIPath, require("./app/routes/user.routes"));
app.use(baseAPIPath, require("./app/routes/config.routes"));
app.use(baseAPIPath, require("./app/routes/index.routes"));
app.use(baseAPIPath, require("./app/routes/login.routes"));
app.use(baseAPIPath, require("./app/routes/signup.routes"));
app.use(baseAPIPath, require("./app/routes/password-reset.routes"));
app.use(baseAPIPath, require("./app/routes/accordian.routes"));
app.use(baseAPIPath, require("./app/routes/account.routes"));
app.use(baseAPIPath, require("./app/routes/email.routes"));
app.use(baseAPIPath, require("./app/routes/search.routes"));
app.use(baseAPIPath, require("./app/routes/class.routes"));


app.listen(config.port).on("listening", () => {
  console.log(`API is live on ${config.port}`);
});
