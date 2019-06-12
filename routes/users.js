const express = require("express");
const router = express.Router();

const restaurants = ["Kiku Cuernavaca", "Puesto de Tacos", "El Rincon de San Francisco", "Little Pizza Emilio Portes Gil", "Restaurant los Compadres", "Taqueria EL Amigo", "Pollo Frito Buenos Aires", "la Estrella de Dimas", "Restaurante 75", "Abondance Restaurante Bar", "El angel Restaurante", "Restaurante Pueblo Bonito", "Mcdonalds Parque Tangamanga", "Tortas y Hamburguesas el Gordo", "Sirlone", "Unicols Pizza", "Tacos El Guero", "Restaurant El Muladar de Calzada", "La Posada del Virrey", "Restaurant and Bar and Clothesline Carlos N Charlies", "KFC", "Giovannis", "Restaurant Oriental Express", "Mariscos Tia Licha", "Cafe Ambar"];
let loggedInUsers = [];

router.get("/search", function(req, res) {

    let result = restaurants.filter(e => ~e.toUpperCase().indexOf(req.query.q.toUpperCase()));
    if (req.query.n) {
        result = result.slice(0, req.query.n);
    }

    if (!req.query.q) {
        return res.send([]);
    }

    res.send(result);
});

const users = [
    {
        "ID": 1,
        "FirstName": "Elon",
        "LastName": "Musk",
        "Email": "elonmusk@spaceman.com",
        "Password": "spaceman",
        "Owner": true,
        "RestID": 2,
        "BookingID": null,
    },
    {
        "ID": 2,
        "FirstName": "Jane",
        "LastName": "Smith",
        "Email": "catlover99@hotmail.com",
        "Password": "kitty999",
        "Owner": false,
        "RestID": null,
        "BookingID": null,
    },
    {
        "ID": 3,
        "FirstName": "Dave",
        "LastName": "McCarthy",
        "Email": "d.carthy@gmail.com",
        "Password": "darth",
        "Owner": true,
        "RestID": 1,
        "BookingID": null,
    },
    {
        "ID": 4,
        "FirstName": "Test",
        "LastName": "Account",
        "Email": "test",
        "Password": "123",
        "Owner": false,
        "RestID": null,
        "BookingID": null,
    },
];

router.post("/login", function(req, res) {

    req.pool.getConnection(function(err, connection) {

        if (err) {
            connection.release();
            res.json({});
        }

        const email = req.body.login_email;
        const password = req.body.login_password;

        const query = "SELECT PeopleID, First_Name, Last_Name, Email FROM People WHERE Email = ? && Password = SHA2(?, 256)";

        try {
            connection.query(query, [email, password], function(err, result) {
                connection.release();
                if (result.length) {
                    const user = new Object();

                    user.session = req.sessionID;
                    user.id = result[0]["PeopleID"];
                    user.firstName = result[0]["First_Name"];
                    user.lastName = result[0]["Last_Name"];
                    user.email = result[0]["Email"];

                    loggedInUsers.push(user);
                    return res.end();
                }

                return res.send("Incorrect username or password!");
            });

        } catch (err) {
            connection.release();
            return res.send("An error occured, please try again later!");
        }
    });
});

router.post("/logout", function(req, res) {

    loggedInUsers = loggedInUsers.filter(u => u.session !== req.sessionID);
    module.exports.loggedInUsers = loggedInUsers;
    return res.status(200).end();
});

router.post("/checklogin", function(req, res) {

    const currentUser = loggedInUsers.filter(u => {
        if (u.session === req.sessionID) {
            return true;
        }
        return false;
    });

    if (currentUser.length) {
        return res.send(`${currentUser[0].firstName} ${currentUser[0].lastName}`);
    }

    return res.status(204).end();
});

router.post("/register", function(req, res) {

    let peopleID = 0;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    if (!first_name) return res.send("First name cannot be empty!");
    if (!last_name) return res.send("Last name cannot be empty!");
    if (!email) return res.send("Email cannot be empty!");
    if (!password) return res.send("Password cannot be empty!");

    req.pool.getConnection(function(err, connection) {

        if (err) {
            connection.release();
            res.json({});
        }

        try {
            connection.query("SELECT COUNT(Email) FROM People WHERE Email = ?", [email], function(err, dupEmail) {

                if (dupEmail[0]["COUNT(Email)"]) {
                    connection.release();
                    return res.send("Email already in use!");
                }

                connection.query("SELECT COUNT(PeopleID) FROM People", [], function(err, peopleCount) {

                    peopleID = ++peopleCount[0]["COUNT(PeopleID)"];

                    const query = "INSERT INTO People (PeopleID, First_Name, Last_Name, Email, Password) VALUES (?, ?, ?, ?, SHA2(?, 256))";
                    connection.query(query, [peopleID, first_name, last_name, email, password], function(err) {

                        connection.query("SELECT COUNT(PeopleID) FROM People", [], function(err, finalCount) {
                            connection.release();
                            if (peopleID != finalCount[0]["COUNT(PeopleID)"]) {
                                throw err;
                            } else {
                                res.send("Successfully created an account!");
                            }
                        });
                    });
                });
            });

        } catch (err) {
            connection.release();
            return res.send("An error occured, please try again later!");
        }

    });
});

router.post("/create", function(req, res) {

    console.log(req.body);
    return res.status(200).end();
});

router.get("/retrieve", function(req, res) {

    const currentUser = loggedInUsers.filter(u => u.session === req.sessionID);

    const user = new Object();
    user.first_name = currentUser[0].firstName;
    user.last_name = currentUser[0].lastName;
    user.email = currentUser[0].email;

    res.json(user);
});

router.post("/update", function(req, res) {

    const currentUser = loggedInUsers.filter(u => u.session === req.sessionID);

    const id = currentUser[0].id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;

    const existing_email = currentUser[0].email;

    if (!first_name) return res.send("First name cannot be empty!");
    if (!last_name) return res.send("Last name cannot be empty!");
    if (!email) return res.send("Email cannot be empty!");
    if (!password) return res.send("Password cannot be empty!");

    req.pool.getConnection(function(err, connection) {

        if (err) {
            connection.release();
            res.json({});
        }

        const query = "UPDATE People SET First_Name = ?, Last_Name = ?, Email = ?, Password = SHA2(?, 256) WHERE PeopleID = ?";

        try {
            connection.query("SELECT COUNT(Email) FROM People WHERE Email = ?", [email], function(err, dupEmail) {

                if (dupEmail[0]["COUNT(Email)"] && email != existing_email) {
                    connection.release();
                    return res.send("Email already in use!");
                }

                connection.query(query, [first_name, last_name, email, password, id], function(err) {
                    connection.release();
                    if (!err) {
                        const modifiedUser = loggedInUsers.filter(u => u.session === req.sessionID)[0];
                        modifiedUser["firstName"] = first_name;
                        modifiedUser["lastName"] = last_name;
                        modifiedUser["email"] = email;
                        loggedInUsers = loggedInUsers.filter(u => u.session !== req.sessionID);
                        loggedInUsers.push(modifiedUser);
                        return res.send("Succesfully updated details!");
                    }
                });
            });

        } catch (err) {
            connection.release();
            return res.send("An error occured, please try again later!");
        }
    });
});

router.use (function(req, res, next){
    if(req.session.user !== undefined){
        next();
    }else{
        res.sendStatus(403);
    }
});

router.get ('/', function(req,res,next){
    res.send('Private information');
});

module.exports = router;
module.exports.loggedInUsers = loggedInUsers;
