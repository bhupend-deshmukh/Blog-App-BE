const knex = require("../config/db");

like = (req, res) => {
  let { post_id, like } = req.body
  
  let user_id = res.tokendata.id;
  knex("posts")
    .where("id", post_id)
    .then((data) => {
      if (data.length > 0) {
        let post_created_user = data[0].user_id;
        knex
          .select("first_name", "last_name")
          .from("users")
          .where("id", post_created_user)
          .then((userData) => {
            knex("likes")
              .where({ user_id, post_id })
              .then((likes) => {
                if (likes.length > 0) {
                  knex("likes")
                    .where({ user_id: user_id, post_id: post_id })
                    .update({ like })
                    .then((update) => {
                      res.send({
                        status: "success",
                        message: "like successfully...",
                        like: like,
                        posts: {
                          post_id: post_id,
                          title: data[0].title,
                          description: data[0].description,
                          user: {
                            first_name: userData[0].first_name,
                            last_name: userData[0].last_name,
                          },
                        },
                      });
                    });
                } else {
                  knex("likes")
                    .insert({ user_id, post_id, like })
                    .then((deta) => {
                      res.send({
                        status: "success",
                        message: "like successfully...",
                        like: like,
                        posts: {
                          post_id: post_id,
                          title: data[0].title,
                          description: data[0].description,
                          user: {
                            first_name: userData[0].first_name,
                            last_name: userData[0].last_name,
                          },
                        },
                      })
                    })
                    .catch((err) => {
                      red.send(err);
                    });
                }
              })
              .catch((err) => {
                
                console.log(err);
              }); 
          });     
      } else {
        res.send({ status: "error", message: "this blog does't exist..." });
      }
    })
    .catch((err) => {
      res.send({ status: "error", message: err.message });
    });
};

// seelikes = (req, res) => {};

module.exports = { like };