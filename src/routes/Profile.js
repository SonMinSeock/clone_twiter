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
    <div className="container">
      <ProfileForm userObj={userObj} refreshUser={refreshUser} />
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
}

export default Profile;
