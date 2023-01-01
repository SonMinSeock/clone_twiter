import { auth } from "fbase";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SocialLoginForm() {
  const onSocialClick = async (event) => {
    let provider;

    const {
      target: { name },
    } = event;

    if (name === "google") {
      provider = new GoogleAuthProvider();
      //console.log("provide : ", provider);
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(auth, provider);
    //console.log("소셜로그인 : ", data);
  };
  return (
    <div className="authBtns">
      <button name="google" onClick={onSocialClick} className="authBtn">
        Continue with Google <FontAwesomeIcon icon={faGoogle} />
      </button>
      <button name="github" onClick={onSocialClick} className="authBtn">
        Continue with Github <FontAwesomeIcon icon={faGithub} />
      </button>
    </div>
  );
}

export default SocialLoginForm;
