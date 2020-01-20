const app = require("./app");

app.listen(process.env.PORT || 8000, () => {
  console.log("server running... on port 8000");
});