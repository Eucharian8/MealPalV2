import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Google from "../assets/google.svg";
import Facebook from "../assets/facebook.svg";
import Apple from "../assets/apple.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
// import showPass from "../assets/Icon.png";
// import hidePass from "../assets/eye-slash.png";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     try {
  //       const userCredential = await createUserWithEmailAndPassword(
  //         auth,
  //         email,
  //         password
  //       );
  //       console.log(userCredential);
  //       const user = userCredential.user;
  //       localStorage.setItem("token", user.accessToken);
  //       localStorage.setItem("user", JSON.stringify(user));
  //       navigate("/mealplan");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  const handleSignUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/mealplan");
      })
      .catch((err) => {
        console.log(err, "err");
        toast.error(err.message);
        setErrorMessage(err.message);
      });
  };

  const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user.email);
        navigate("/mealplan");
      })
      .catch((err) => {
        const error = err.code;
        const errorMessage = err.message;
      });
  };

  function onSubmit(data) {
    const { email, password } = data;
    // setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate("/mealplan");
      })
      .catch((err) => {
        console.log(err, "err");
        console.log(err.code);
        let customErrorMessage = "An error occurred";
        if (err.code === "auth/email-already-in-use") {
          customErrorMessage =
            "Existing user. Please login with your email address.";
        }
        setErrorMessage(customErrorMessage);
        // toast(errorMessage);
      });
    //   .finally(() => mounted.current && setIsLoading(false));
    reset();
  }
  function onError(errors) {
    console.log(errors);
  }

  function handleClick(e) {
    e.preventDefault();
    reset(); //this resets the form fields on toggle between the current page and login page
    navigate("/login");
  }

  return (
    <div className="flex flex-col gap-y-5 justify-center min-h-screen mx-lg-20 mx-6">
      <ToastContainer />
      <h2 className="font-extrabold text-3xl mb-3">Create your account</h2>
      <form action="" onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex flex-col mb-4">
          <label htmlFor="fullname" className="text-neutral-500">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter full name"
            id="fullname"
            value={fullName}
            className="placeholder:text-black outline-none border-solid border-2 p-4 focus:border-blue-500 rounded-lg lg:w-3/6 md:w-3/6 mt-2"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="email-address" className="text-neutral-500">
            Email Address
          </label>
          <input
            type="email"
            name="email-address"
            placeholder="Enter email address"
            id="email-address"
            // value={email}
            className="placeholder:text-black outline-none border-solid border-2 p-4 focus:border-blue-500 rounded-lg lg:w-3/6 md:w-3/6 mt-2"
            // required
            // onChange={(e) => setEmail(e.target.value)}
            {...register("email", {
              required: "Required Field",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          <span className="text-red-500 text-sm">
            {errors?.email && errors?.email?.message}
          </span>
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="password" className="text-neutral-500">
            Input Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            id="password"
            // value={password}
            className="placeholder:text-black outline-none border-solid border-2 p-4 focus:border-blue-500 rounded-lg lg:w-3/6 md:w-3/6 mt-2"
            // required
            // onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: "Required Field",
              pattern: {
                value:
                  /^(?=.*[A-Za-z\d])(?=.*[!@#$%^&*.,><*])[A-Za-z\d!@#$%^&*,.><*]{8,}$/,
                message:
                  "Password must be at least 8 characters and must include at least one letter, one digit, and one special character.",
              },
            })}
          />
          {/* <span className="" onClick={togglePasswordVisibility}>
            {showPassword ? <img src={showPass} /> : <img src={hidePass} />}
          </span> */}
          <span className="text-red-500 text-sm">
            {errors?.password && errors?.password?.message}
          </span>
        </div>
        <div className="  text-center">
          <button
            className="text-center bg-[rgb(66,104,251)] text-white text-lg font-semibold py-4 px-4 rounded-lg w-full my-3 lg:w-3/6"
            onClick={handleSignUp}
          >
            Sign In
          </button>
          <p>
            By using this app, you agree to our{" "}
            <a href="" className="text-blue-500 font-bold">
              Terms of use and Conditions
            </a>
          </p>
        </div>
      </form>

      <div className="mt-5 flex flex-col lg:items-center">
        <button className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full lg:w-3/6 md:w-3/6 mt-2">
          <div
            className="flex justify-center items-center gap-3 "
            onClick={googleSignIn}
          >
            <img src={Google} alt="google" className="w-6" />
            <p>Sign up with Google</p>
          </div>
        </button>
        <button className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full lg:w-3/6 md:w-3/6 mt-2">
          <div className="flex justify-center items-center gap-3 ">
            <img src={Facebook} alt="facebook" className="w-6" />
            <p>Sign up with Facebook</p>
          </div>
        </button>
        <button className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full lg:w-3/6 md:w-3/6 mt-2">
          <div className="flex justify-center items-center gap-3 ">
            <img src={Apple} alt="apple" className="w-8 p-0" />
            <p>Sign up with Apple</p>
          </div>
        </button>
        <div className="my-4 text-center">
          <p>
            Already have an account?{" "}
            <span className="text-blue-500 font-semibold" onClick={handleClick}>
              Sign in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
