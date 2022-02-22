const knex = require("../config/db");


like = (req, res) => {
    if (req.body.like == true){
        req.body.customer_id = res.tokendata.id
        req.body.post_id  = res.tokendata.id
        knex("like_dislike")
        .insert(req.body)
        .then((data)=>{
            res.send({"status":"like successfully..."})
        })
        .catch((err)=>{
            res.send({'status':err})
        })
    }
    else{
        req.body.customer_id = res.tokendata.id
        req.body.post_id  = res.tokendata.id
        knex("like_dislike")
        .insert(req.body)
        .then((data)=>{
            res.send({"status":"dislike successfully..."})
        }).catch((err)=>{
            res.send({"status":err})
        })
    }
}



module.exports = {like};


