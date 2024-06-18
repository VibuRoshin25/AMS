import flipopayLogo from "../../assets/flipopay-logo.png";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <form
        onSubmit={onLogin}
        className="m-8 lg:w-1/3 flex justify-center items-center flex-col gap-4 p-4 rounded-lg shadow-lg shadow-gray-400"
      >
        <img src={flipopayLogo} alt="flipopay-logo-image" className="h-8" />
        <h2 className="text-2xl text-center text-sky-500">Login</h2>
        <div className="flex flex-col justify-center gap-3">
          <label className="text-lg text-sky-500">Email</label>
          <input
            className="px-2 py-1 border-b border-sky-500 focus:outline-none text-sky-500"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-lg text-sky-500">Password</label>
          <input
            className="px-2 py-1 border-b border-sky-500 focus:outline-none text-sky-500"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="border">
            Log In
          </button>
        </div>
      </form>
      <div>
        <div className="hidden lg:w-1/3 lg:bg-sky-500 lg:rotate-45">hello</div>
      </div>
    </div>
  );
};

export default Login;
