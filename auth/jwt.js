const jwt = require("jsonwebtoken")

const verifytoken = (req, res, next)=>{
    const c_token = req.cookies;
    console.log(c_token);
    if (Object.keys(c_token).includes("JWT_TOKEN")){
        const token = c_token.JWT_TOKEN
        const token_data = jwt.verify(token, 'iamsecret')
        res.tokendata = token_data
        return next();
    }
    return res.send({'status': 'error', 'message': 'invalid auth.'})

}

module.exports = {verifytoken}   