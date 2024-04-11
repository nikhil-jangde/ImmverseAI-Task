import React, { useState } from "react";
import axios from "axios";
import VisibilityIcon from '@mui/icons-material/Visibility';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';

function Auth() {
  const [signup, setSignup] = useState(false);
  const [loading,setloading]=useState(false)
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
console.log(signInData);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignInSubmit = async (e) => {
    setloading(true)
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        username: signInData.username,
        password: signInData.password
      });
      const { token } = response.data; 
      localStorage.setItem("token", token);
      setloading(false)
      alert("Signed In ")
      window.location.reload()
      
    } catch (error) {
      console.error("Error signing in:", error);
     
    }
  };
  
  
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/signup", {
        username: signUpData.username,
        password: signUpData.password,
      });
      const { message } = response.data; 
  
      if (response.status === 200) {
        setSignup(false);
        alert(message);
      
      } else if (response.status === 201) { 
        alert(message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200 ">
      {signup === false ? (
        <form onSubmit={handleSignInSubmit} className=" w-[20%] p-10 bg-emerald-500 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Sign In</h2>
          <label>Username</label>
          <input
          required
            type="text"
            name="username"
            value={signInData.email}
            onChange={handleSignInChange}
            placeholder="Username"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <label>Password</label>
          <div className="relative">
            <input
            required
              type="password"
              name="password"
              value={signInData.password}
              onChange={handleSignInChange}
              placeholder="Password"
              className="block w-full mb-4 p-2 border border-gray-300 rounded"
            />
           
            <button
              type="button"
              className="absolute top-0 right-0 h-full px-3 flex items-center"
              onClick={() => {
                const passwordInput = document.querySelector("input[name='password']");
                if (passwordInput.type === "password") {
                  passwordInput.type = "text";
                } else {
                  passwordInput.type = "password";
                }
              }}
            >
              <VisibilityIcon />
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In {loading && <HourglassTopIcon/>}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Not a User?{" "}
            <span
              onClick={() => setSignup(true)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Sign Up
            </span>
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignUpSubmit} className="bg-emerald-500 w-[20%] p-10 rounded-lg">
          <h2 className="text-lg font-bold mb-4">Sign Up</h2>
          <label>Email</label>
          <input
          required
            type="text"
            name="username"
            value={signUpData.email}
            onChange={handleSignUpChange}
            placeholder="Email"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <label>Password</label>
          <input
          required
            type="password"
            name="password"
            value={signUpData.password}
            onChange={handleSignUpChange}
            placeholder="Password"
            className="block w-full mb-2 p-2 border border-gray-300 rounded"
          />
          <label>Confirm Password</label>
          <input
          required
            type="password"
            name="confirmPassword"
            value={signUpData.confirmPassword}
            onChange={handleSignUpChange}
            placeholder="Confirm Password"
            className="block w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up {loading &&<HourglassTopIcon/>}
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Already a User?{" "}
            <span
              onClick={() => setSignup(false)}
              className="cursor-pointer text-blue-600 hover:underline"
            >
              Sign In
            </span>
          </p>
        </form>
      )}
    </div>
  );
}

export default Auth;
