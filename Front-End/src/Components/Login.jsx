import { useState } from 'react';
import validator from 'validator';
import { useNavigate } from "react-router-dom";
import img from '../Assets/bike.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCPass] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.isEmail(email) && email !== '') {
      if (phone.length === 10) {
        if (pass === cpass && pass !== '' && cpass !== '') {
          if (validator.isStrongPassword(pass, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            setLoading(true); // Set loading to true when the request starts
            try {
              fetch("https://service-app-1.onrender.com/signup", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone, pass }),
              })
                .then((res) => res.json())
                .then((data) => {
                  setLoading(false); // Set loading to false when the request finishes
                  if (data.status === "ok") {
                    toast.success("Register Successfully");
                    setTimeout(() => navigate('../login'), 2000);
                  } else {
                    toast.error("User Email or Phone Number Already Exist");
                  }
                });
            } catch (error) {
              setLoading(false); // Set loading to false in case of error
              console.log(error);
            }
          } else {
            toast('Password is not strong enough. It should contain at least one lowercase, uppercase, number, symbol, and be at least 8 characters long.');
          }
        } else {
          toast.error('Password Mismatch');
        }
      } else {
        toast("Enter a valid phone number");
      }
    } else {
      toast('Enter a valid email!');
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-10">
        <form className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-bold mb-6 text-center">Sign up</h2>
          <input
            type="text"
            placeholder="Email"
            className="mb-4 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone"
            className="mb-4 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setPass(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="mb-4 p-4 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setCPass(e.target.value)}
          />
          <button
            type="submit"
            className={`bg-blue-500 text-white p-4 w-full rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading} // Disable the button when loading
          >
            {loading ? 'Signing up...' : 'Sign up'} {/* Conditionally render button text */}
          </button>
          <p className="mt-6 text-center">
            Already have an account?{' '}
            <span
              onClick={() => { navigate('/login'); }}
              className="text-blue-700 cursor-pointer hover:underline"
            >
              Sign in
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

export default Signup;
