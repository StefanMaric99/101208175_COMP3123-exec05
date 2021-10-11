const express = require('express');
const app = express();
const router = express.Router();
const path = require("path");
const bodyParser = require('body-parser');
const users = require("./user.json");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  res.json(users);
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
//http://localhost:8081/login?username=john&password=john123
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  const isValid = false;
  if (username == users.username && password == users.password) {
    return res.json({
      status: true,
      message: "User Is valid"
    })
  }

  if (username != users.username) {
    return res.json({
      status: false,
      message: "User Name is invalid"
    })
  }

  if (password != users.password) {
    return res.json({
      status: false,
      message: "Password is invalid"
    })
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout', (req, res) => {
  const {username} = req.body
  res.send(`<b>${username} successfully logout.<b>`)
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port ' + (process.env.port || 8081));