const jwt = require("jsonwebtoken")

const verifytoken = (req, res, next)=>{
    let token = req.query.token || req.headers.token || req.cookies.JWT_TOKEN;
    console.log(token, "token...")
    if (token){
        const token_data = jwt.verify(token, 'iamsecret')
        res.tokendata = token_data
        console.log(token_data);
        return next();
    }
    return res.send({'status': 'error', 'message': 'invalid auth.'})
}

module.exports = {verifytoken}   