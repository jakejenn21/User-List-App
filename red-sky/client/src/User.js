import React from "react";
import "./App.css";
import Popup from "./Popup";

// user compoenet
export default function User({ deleteUser, updateUser, user }) {

  // popup state
  const [showPopupUser, setShowPopupUser] = React.useState(false);

  // toggle popup handler
  const togglePopup = () => {
    setShowPopupUser(!showPopupUser);
  };

  return (
    <>
      {showPopupUser && (
        <Popup
          handleClose={togglePopup}
          isEdit={true}
          user={user}
          updateUser={updateUser}
        />
      )}
      <div className="user">
        <img className="avatar" src={user.avatar} alt="User Avatar" />
        <div className="first-name">{user.first_name}</div>
        <div className="last-name">{user.last_name}</div>
        <div className="email">{user.email}</div>
        <button className="button-edit" onClick={togglePopup}>
          edit
        </button>
        <button className="button-delete" onClick={deleteUser}>
          delete
        </button>
      </div>
    </>
  );
}
