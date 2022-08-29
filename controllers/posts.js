const knex = require("../config/db");

list_post = (req, res) => {
  knex
    .select(
      "posts.id",
      "posts.title",
      "posts.description",
      "posts.user_id",
      "users.first_name",
      "users.last_name",
      "posts.created_at"
    )
    .from("users")
    .join("posts", "posts.user_id", "users.id")
    .then(async (data) => {
      try {
        if(data.length>0){
          let newData = [];
          for (let ind = 0; ind < data.length; ind++) {
            let likes = await knex("likes").where({
              post_id: data[ind].id,
              like: 1,
            });
            let newObj = {
              id: data[ind].id,
              title: data[ind].title,
              description: data[ind].description,
              user_id: data[ind].user_id,
              created_at: data[ind].created_at,
              likes: likes.length,
              users: {
                first_name: data[ind].first_name,
                last_name: data[ind].last_name,
              },
            };
            newData.push(newObj);
          }
          res.send({ status: "success", count: newData.length, data: newData });
        }
        else {
          res.send({ status: "error", message: "blog does't exists..." });
        }
      } catch (error) {
        res.send({ status: "error", message: error.message });
      }
    })
    .catch((err) => {
      console.log(err.message);
    });
};

get_post_by_id = (req, res) => {
  knex
    .select(
      "posts.id",
      "posts.title",
      "posts.description",
      "posts.user_id",
      "users.first_name",
      "users.last_name",
      "posts.created_at"
    )
    .from("posts")
    .join("users", "users.id", "posts.user_id")
    .where("posts.id", req.params.id)
    .then(async (data) => {
      try {
        if(data.length>0){

          const newData = [];
          let likes = await knex("likes").where({
            post_id: req.params.id,
            like: 1,
          });
          let newObj = {
            id: data[0].id,
            title: data[0].title,
            description: data[0].description,
            user_id: data[0].user_id,
            created_at: data[0].created_at,
            likes: likes.length,
            created_users: {
              first_name: data[0].first_name,
              last_name: data[0].last_name,
            },
          };
          newData.push(newObj);
          res.send({
            status: "success",
            data: newData,
          });
        }
        else {
          res.send({ status: "error", message: "id not found...!!!" });
        }
      } catch (error) {
        console.log(error.message);
      }
      
    })
    .catch((err) => {
      res.send({ status: err });
    });
};
create_post = (req, res) => {
  req.body.user_id = res.tokendata.id;
  const { title, description, user_id } = req.body;

  if (title == undefined || description == undefined || user_id == undefined) {
    return res.send({ status: "error", message: "body data empty..." });
  }

  knex("posts")
    .insert({ title, description, user_id })
    .then((data) => {
      res.send({
        status: "success",
        message: "posts cteated successfuly...",
        user_post: { title, description, user_id },
      });
    })
    .catch((err) => {
      if (err.errno == 1364) {
        console.log(err.message);
        res.send({
          status: "error",
          message: "please wtrite the title or description...",
        });
      }
      console.log(err.message);
      res.send({ status: "error", message: err.message });
    });
};

getAllPostsBy_user_id = (req, res) => {
  knex
    .select("*")
    .from("posts")
    .where("user_id", req.params.user_id)
    .then((data) => {
      if (data.length != 0) {
        res.send({ status: "success..", allpost: data.length, posts: data });
      } else {
        res.send({
          status: "user_id not found.....",
          message: "please enter your correct user_id",
        });
      }
    });
};

// updatePosts....
updatePost = (req, res) => {
  let login_id = res.tokendata.id;
  let id = req.params.post_id;
  console.log(id);
  const { title, description } = req.body;
  console.log(title, description);
  if (title == undefined || description == undefined) {
    return res.send({ status: "error", message: "body data empty..." });
  }
  knex
    .select("*")
    .from("posts")
    .join("users", "users.id", "posts.user_id")
    .where({ "posts.id": id })
    .then((data) => {
      if (data.length == 0) {
        res.send({ status: "error", message: "this blog does't exists..." });
      } else {
        console.log(typeof data[0].user_id);

        if (data[0].id == login_id) {
          knex("posts")
            .where("id", id)
            .update({ title, description })
            .then((data1) => {
              res.send({
                status: "success",
                message: "post updated successfully...",
                updated_data: { title, description },
              });
            })
            .catch((err1) => {
              res.send({ status: "error", message: err1.message });
            });
        } else {
          res.send({
            status: "error",
            message: "You do not have permission to update posts",
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

deletePost = (req, res) => {
  let login_id = res.tokendata.id;
  let id = req.params.post_id;
  console.log(id);

  knex
    .select("*")
    .from("posts")
    .join("users", "users.id", "posts.user_id")
    .where({ "posts.id": id })
    .then((data) => {
      if (data.length == 0) {
        res.send({ status: "error", message: "this blog does't exists..." });
      } else {
        
        if (data[0].id == login_id) {
          knex("posts")
            .where("id", id)
            .del()  
            .then((data1) => {
              knex("likes").where({"post_id":id}).then((likes)=>{
                if(likes.length > 0){
                  knex("likes").where({"post_id":id}).del().then((delLike)=>{
                    res.send({status:"success",message:"posts deleted successfully....."})
                  })
                }else{
                  res.send({status:"success",message:"posts deleted successfully..."})
                }
              })
              
            })
            .catch((err1) => {
              res.send({ status: "error", message: err1.message });
            });
        } else {
          res.send({
            status: "error",
            message: "You do not have permission to delete posts",
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};



module.exports = {
  list_post,
  create_post,
  get_post_by_id,
  getAllPostsBy_user_id,
  updatePost,
  deletePost,
};
