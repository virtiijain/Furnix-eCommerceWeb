import React from "react";

const UserProfile = ({ user }) => (
  <div>
    <span>Hello, {user.name}</span>
    <img src="https://via.placeholder.com/30" alt="user" style={{ borderRadius: "50%", marginLeft: "10px" }} />
  </div>
);

export default UserProfile;
