const express = require("express");
const { router } = require("./routes/users");

const app = express();
app.use(express.json({ type: "application/json" }));
app.use("/", router);
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ success: false, message: err.message });
});
app.listen(80, () => {
  console.log("app is listened on http://localhost:80");
});
