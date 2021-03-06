import React, { useState } from "react";

// popup component
export default function Popup({
  handleClose,
  isEdit,
  updateUser,
  createUser,
  user,
}) {
  // states used for fields
  const [firstName, setFirstName] = useState(user ? user.first_name : "");
  const [lastName, setLastName] = useState(user ? user.last_name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [avatar, setAvatar] = useState(user ? user.avatar : "");

  // text for create new/edit existing
  let buttonText = "";
  let headerText = "";
  let setFields = false;
  if (isEdit) {
    setFields = true;
    headerText = "edit user";
    buttonText = "save";
  } else {
    setFields = false;
    headerText = "create new user";
    buttonText = "create";
  }

  // submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(
    //   'A form was submitted with First Name: "' +
    //     firstName +
    //     '" ,Last Name: "' +
    //     lastName +
    //     '" Email: "' +
    //     email +
    //     '"' +
    //     "Avatar: " +
    //     avatar
    // );

    if (isEdit) {
      const updatedUser = {
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        email: email,
        avatar: avatar,
      };

      console.log("updating user:", updatedUser);
      updateUser(updatedUser);
      handleClose();
    } else {
      const newUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        avatar: avatar,
      };

      console.log("creating user:", newUser);
      createUser(newUser);
      handleClose();
    }
  };

  // functions used in setting state on field change

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.value);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-header-title">{headerText}</div>
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <h3 className="modal-title-first">first name</h3>
          <input
            required
            type="text"
            name="first_name"
            value={firstName}
            className="modal-input"
            onChange={(e) => {
              handleFirstNameChange(e);
            }}
          />

          <h3 className="modal-title-last">last name</h3>
          <input
            required
            type="text"
            name="last_name"
            value={lastName}
            className="modal-input"
            onChange={(e) => {
              handleLastNameChange(e);
            }}
          />

          <h3 className="modal-title-email">email</h3>
          <input
            required
            type="text"
            name="email"
            value={email}
            className="modal-input"
            onChange={(e) => {
              handleEmailChange(e);
            }}
          />

          <h3 className="modal-title-avatar">avatar image url</h3>
          <input
            required
            type="text"
            name="avatar"
            value={avatar}
            className="modal-input"
            onChange={(e) => {
              handleAvatarChange(e);
            }}
          />
          <div className="modal-footer">
            <button className="cancel-btn" onClick={handleClose}>
              cancel
            </button>
            <button className="submit-btn" type="submit">
              {buttonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
