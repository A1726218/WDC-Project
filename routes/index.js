const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("index", { title: "Express" });
});

const CLIENT_ID = "";
const {0Auth2Client} = require('google-auth-library');
const client = new 0Auth2Client(CLIENT_ID);
       
const users = [{username:"testuser", password:"", google"USER_GOOGLE_ID"}];
const session = {};

router.post('/login, asyn function(req,res) {
            var user = null;
            console.log(JSON.stringify(req.body));
            
            if(req.session.user !== undefined) {
                console.log("Session Valid");
                user = req.session.user;
            }else if{req.body.idtoken !== undefined) {
                console.log("Google Token Recieved");
                
                
                
            const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: CLIENT ID
            }).catch(console.error);
                
            const payload = ticket.getPayLoad();
                
            const userid = payload['sub'];
                
            for (var i=0; i<users.length; i++){
                if (users[i].google === userid){
                    console.log("Google ID Valid");
                    req.session.user = user[i].username;
                    user = user[i].username;
                }
            }
       }
       
       if (user !== null) {
           res.sendStatus(200);
       }else{
           res.sendStatus(401);
       }
});

router.post('/logout', funciton(req,res) {
            if(req.session.user != undefined){
               delete req.session.user;
              }
               res.sendStatus(200);
});

module.exports = router;
