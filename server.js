const express = require("express");
const cookieparser = require("cookie-parser");
const app = express();

const user_router = require("./routes/users");
const post_router = require("./routes/posts");
const like_dislike = require("./routes/like_dislike");

app.use(cookieparser());
app.use(express.json());
app.use("/", user_router);
app.use("/", post_router);
app.use("/", like_dislike);

const PORT = 5050;

app.listen(PORT, (req, res) => {
  console.log(`Your server is listening on http://localhost:${PORT}`);
});


