import flipopayLogo from "../../assets/flipopay-logo.png";
import Button from "../Button.jsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig.js";
import { toast } from "react-toastify";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(userCredential);
      toast.success(" Login successfully!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      console.log(user);
      const q = query(collection(db, "employees"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          const userType = doc.data().type;
          console.log("User type:", userType);

          navigate("/");
        });
      } else {
        console.error("No such document!");
        toast.error("User document not found.", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      toast.error("Invalid Credentials.", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
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
