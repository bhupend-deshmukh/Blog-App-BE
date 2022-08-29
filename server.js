const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser")
const user_router = require("./routes/users");
const post_router = require("./routes/posts");
const likes = require("./routes/likes");


app.use(bodyParser.json())
app.use(cors());
app.use(cookieparser());
app.use(express.json());
app.use("/", user_router);
app.use("/", post_router);
app.use("/", likes);

const PORT = 5050;

app.listen(PORT, (req, res) => {
  console.log(`Your server is listening on http://localhost:${PORT}`);
});
