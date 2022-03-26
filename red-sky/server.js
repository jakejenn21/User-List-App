const express = require('express');
const api_helper = require('./API')
const app = express();
const port = process.env.PORT || 4700;

const uuid = require("uuid");

app.use(express.json())

let users = [];
let id = 12;
// //get users
app.get("/users", (req, res) => {
    console.log("entered get users")

    api_helper.make_API_call('https://reqres.in/api/users?page=2')
    .then(response => {
        users = response.data;
        console.log("users: ", users)
        res.json(response.data);

    })
    .catch(error => {
        console.log("error:", error)
        res.send(error);
    })


  });


//delete user
app.delete('/users/delete/:id', (req, res) => {
  console.log("entered user delete endpoint")
  console.log("id: ", req.params.id)
  const found = users.some((user) => user.id === parseInt(req.params.id));
  console.log("found", found);
  if (found) {
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    console.log("filtered users:", users)
    res.json(users);

  } else {
    res.sendStatus(400);
  }
});

//update user
app.post("/users/update/:id", (req, res) => {
  console.log("entered update user endpoint")
  console.log("id: ", req.params.id)
  const found = users.some((user) => user.id === parseInt(req.params.id));
  const updateUser = req.body;

  console.log("request body:", req.body);

  console.log("found user to update: ", found, "user:", updateUser)

  if (found) {
    users.forEach((user) => {
      if (user.id === parseInt(req.params.id)) {
        user.avatar = updateUser.avatar ? updateUser.avatar : user.avatar;

        user.first_name = updateUser.first_name
          ? updateUser.first_name
          : user.first_name;

        user.last_name = updateUser.last_name
          ? updateUser.last_name
          : user.last_name;

        user.email = updateUser.email ? updateUser.email : user.email;

        res.json(users);
      }
    });
  } else {
    res.sendStatus(400);
  }
});

//create new user
app.post("/users/create", (req, res) => {
  id = id + 1
  const newUser = {
    id: id,

    avatar: req.body.avatar,

    first_name: req.body.first_name,

    last_name: req.body.last_name,

    email: req.body.email,
  };

  if (
    !newUser.avatar ||
    !newUser.first_name ||
    !newUser.last_name ||
    !newUser.email
  ) {
    return res.sendStatus(400);
  }

  users.push(newUser);
  res.json(users);
});

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));


