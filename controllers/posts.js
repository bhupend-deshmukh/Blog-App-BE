const knex = require("../config/db");

list_post = (req, res) => {
  knex("posts")
    .select("*")
    .where("customer_id", res.tokendata.id)
    .then((data) => {
        if (data.length != 0){
            res.send({ status: "success", count: data.length, data: data });
        }
        else{
            res.send({"status":"post not created..."});
        }
    })
    .catch((err) => {
      res.send(err);
    });
};

get_post_by_id = (req,res) => {
    knex
    .select("*")
    .from("posts")
    .where("id",req.params.id)
    .then((data)=>{
        if (data.length != 0){
            res.send({"post":data})
        }
        else{
            res.send({"status":"id not found..."})
        }

    }).catch((err)=>{
        res.send({"status":err})
    })
}


create_post = (req,res)=>{
    console.log(res.tokendata);
    req.body.customer_id = res.tokendata.id
    // res.send(req.body)
    knex("posts")
    .insert(req.body)
    .then((data)=>{
        res.send({"status":"success","user_post":req.body})
    })
    .catch((err)=>{
        res.send({"status" : err})
    })
}

module.exports = { list_post ,create_post,get_post_by_id};