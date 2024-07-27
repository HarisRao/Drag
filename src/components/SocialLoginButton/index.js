import React from "react";
import { auth } from "../../utils/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import classes from "./SocialLoginButton.module.css";

const SocialLoginButton = () => {
  const googleLogin = async () => {
    let provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    const result = await signInWithPopup(auth, provider);
    console.log(result, "google result");
  };

  //   const facebookLogin = async () => {
  //     let provider = new FacebookAuthProvider();
  //     provider.setCustomParameters({ auth_type: 'reauthenticate' });
  //     provider.setCustomParameters({ auth_type: 'rerequest' });
  //     const result = await signInWithPopup(auth, provider);
  //     console.log(result, "facebook result");
  //   };
  return (
    <div>
      <h1>SocialLoginButton</h1>
      <div className={classes.socialBtn} onClick={googleLogin}>
        G+
      </div>
      {/* <div className={classes.socialBtn} onClick={facebookLogin}>
        Facebook
      </div> */}
    </div>
  );
};

export default SocialLoginButton;
