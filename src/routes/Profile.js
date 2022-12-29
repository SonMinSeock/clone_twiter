// 프로필 페이지
import { auth, dbService } from "fbase";
import { signOut } from "firebase/auth";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function Profile({ userObj }) {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  useEffect(async () => {
    const q = await query(
      collection(dbService, "tweet"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "asc")
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => console.log("profile query : ", doc.data()));
  }, []);

  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}

export default Profile;
