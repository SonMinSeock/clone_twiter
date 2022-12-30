// 프로필 페이지
import ProfileForm from "components/ProfileForm";
import { auth } from "fbase";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";

function Profile({ userObj, refreshUser }) {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  return (
    <>
      <ProfileForm userObj={userObj} refreshUser={refreshUser} />
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
