import AppRouter from "components/Router";
import { auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [changeName, setChangeName] = useState(false);

  //console.log("App 컴포넌트!");
  useEffect(() => {
    console.log("firebase auth data...");
    onAuthStateChanged(auth, (user) => {
      //console.log("onAuthStateChanged!!");
      if (user) {
        setUserObj(user);
      } else {
        setUserObj(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    setChangeName((prev) => !prev);
  };

  return (
    <>
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        "initializing..."
      )}
    </>
  );
}

export default App;
