import React from "react";
import "./App.css";
import Header from "./Header";
import Popup from "./Popup";
import User from "./User";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  // fetch initial list of users from endpoint
  React.useEffect(() => {
    fetch("/users")
      .then((res) => res.json())
      .then((users) => setUsers(users));
  }, []);

  toast.configure();


  const [users, setUsers] = React.useState([]);
  const [showPopup, setShowPopup] = React.useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // delete user from node js memory using endpoint
  const deleteUser = (id) => {
    console.log("entering delete user");
    console.log(id);
    fetch(`/users/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((users) => setUsers(users));

    toast(`Deleted user id: ${id}`);
  };

  // update user in node js memory by id and new info using endpoint
  const updateUser = (updatedUser) => {
    console.log("entering update user");
    console.log("user: ", updatedUser);
    console.log(updatedUser.id);
    fetch(`/users/update/${updatedUser.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((users) => setUsers(users));

    toast(`Updated user: ${updatedUser.first_name} ${updatedUser.last_name}`);
  };

  // create new user in node js memory by adding new user to array using endpoint
  const createUser = (newUser) => {
    console.log("entering update user");
    console.log("user: ", newUser);
    console.log(newUser.id);
    fetch(`/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((users) => setUsers(users));

    toast(`Created user: ${newUser.first_name} ${newUser.last_name}`);
  };

  return (
    <>
      <div className="container">

        {/* header component */}
        <Header />
        {/* create new user button */}
        <button onClick={togglePopup} className="create-new-user-btn">
          create new user
        </button>

        {/* popup modal */}
        {showPopup && (
          <Popup
            handleClose={togglePopup}
            createUser={createUser.bind(this)}
            isEdit={false}
            users={users}
          />
        )}

        {/* user list header */}
        <div className="user-list-container">
          <h2 className="user-list-title">USER LIST</h2>
          <div className="user-list-fields">
            <h3 className="avatar-header">avatar</h3>
            <h3 className="first-name-header">first name</h3>
            <h3 className="last-name-header">last name</h3>
            <h3 className="email-header">email address</h3>
          </div>
          {/* user list */}
          {users.map((user, index) => {
            return (
              //user component
              <User
                key={user.id}
                updateUser={updateUser.bind(this)}
                deleteUser={deleteUser.bind(this, user.id)}
                user={user}
                users={users}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
