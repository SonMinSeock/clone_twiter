// 로그인 보야주는 페이지
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthForm from "components/AuthForm";
import SocialLoginForm from "components/SocialLoginForm";

function Auth() {
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <SocialLoginForm />
    </div>
  );
}

export default Auth;
