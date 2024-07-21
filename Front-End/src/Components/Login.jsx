import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import img from '../Assets/bike.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [uname, setUserName] = useState('');
  const [password, setPass] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!uname || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true); // Set loading to true when the request starts
    try {
      fetch("https://service-app-1.onrender.com/login", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uname, password }),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false); // Set loading to false when the request finishes
          if (result.status === "ok") {
            if (uname === "vibeeshnataraj1@gmail.com") {
              toast.success("Admin Login");
              sessionStorage.setItem("role", "admin");
              sessionStorage.setItem("token", result.token);
              setTimeout(() => navigate(`../adminhome`), 1000); 
            } else {
              toast.success("Customer Login");
              sessionStorage.setItem("Email", result.data.email);
              sessionStorage.setItem("Phone", result.data.phone);
              sessionStorage.setItem("token", result.token);
              sessionStorage.setItem("role", "user");
              setTimeout(() => navigate(`../customerhome`), 1000); 
            }
          } else {
            toast.error(result.error); 
          }
        });
    } catch (error) {
      setLoading(false); // Set loading to false in case of error
      console.log(error);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('../forgotpassword');
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
        <form className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center">Log in</h2>
          <input
            type="text"
            placeholder="Email"
            className="mb-4 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Logging in...' : 'Login'} 
          </button>
          <button
            onClick={handleCancel}
            className="text-blue-700 hover:underline p-4 w-full rounded-lg mt-4 transition duration-300"
          >
            Forgot Password
          </button>
          <p className="mt-6 text-center">
            Don't have an account?{' '}
            <span
              onClick={() => { navigate('/signup'); }}
              className="text-blue-700 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-0">
        <img src={img} alt="Bike" className="w-full h-auto lg:max-h-full lg:mr-10" />
      </div>
      <ToastContainer
        position='bottom-center' 
        autoClose={2000}
        theme='dark'
      />
    </div>
  );
}

export default Login;
