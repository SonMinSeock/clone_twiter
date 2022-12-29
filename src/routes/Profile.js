// 프로필 페이지
import { async } from "@firebase/util";
import { auth } from "fbase";
import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

function Profile({ userObj, refreshUser }) {
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);
  const navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, { displayName: newDisplayName });
    }
    refreshUser();
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setDisplayName(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
