import flipopayLogo from "../../assets/flipopay-logo.png";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form
      onSubmit={onLogin}
      className="m-8 h-2/3 lg:w-1/3 w-[80%] flex justify-center items-center flex-col gap-4 p-4 rounded-lg shadow-lg bg-white shadow-gray-400 z-10 space-y-5 "
    >
      <img src={flipopayLogo} alt="flipopay-logo-image" className="h-8 " />
      <div className="flex flex-col justify-center gap-3">
        <h2 className="text-2xl text-center text-sky-500">Login</h2>
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
      </div>
      <Button type="submit" className="border">
        Log In
      </Button>
    </form>
  );
};

export default Login;
