import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from "react-toastify";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig'
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // Used only for Sign Up
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Login") {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Successfully logged in!");
        navigate("/"); // Redirect to Home page
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
        navigate("/"); // Redirect to Home page
      }
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success("Successfully signed in with Google!");
      navigate("/"); // Redirect to Home page
    } catch (error) {
      handleAuthError(error);
    }
  };

  const handleAuthError = (error) => {
    switch (error.code) {
      case 'auth/email-already-in-use':
        toast.error("Email already in use!");
        break;
      case 'auth/invalid-email':
        toast.error("Invalid email address!");
        break;
      case 'auth/wrong-password':
        toast.error("Incorrect password!");
        break;
      case 'auth/user-not-found':
        toast.error("User not found!");
        break;
      default:
        toast.error("An error occurred!");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {currentState === "Sign Up" && (
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
        
          {currentState === "Login" ? (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Create Account
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login Here
            </p>
          )}
        </div>
        <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="bg-black text-white font-light px-5 py-2 mt-1"
        >
          Sign In with Google
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
