import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [cpass, setCPass] = useState('');
  const [state, setState] = useState(false);
  const [otp, setOTP] = useState('');
  const [uOTP, setUOTP] = useState('');
  const navigate = useNavigate();

  // generate OTP
  const generateOTP = () => {
    let generatedOTP = '';
    const digits = '0123456789';
    for (let i = 0; i < 6; i++) {
      generatedOTP += digits[Math.floor(Math.random() * 10)];
    }
    return generatedOTP;
  };

  //Handle OTP request
  const handleOTPUpdate = (e) => {
    e.preventDefault();
    if (!state) {
      const generatedOTP = generateOTP();
      setUOTP(generatedOTP);
      if (validator.isEmail(email) && email !== '') {
        if (pass === cpass && pass !== '' && cpass !== '') {
          if (
            validator.isStrongPassword(pass, {
              minLength: 8,
              minLowercase: 1,
              minUppercase: 1,
              minNumbers: 1,
              minSymbols: 1,
            })
          ) {
            try {
              fetch('https://service-app-1.onrender.com/forgotpasswordotp', {
                method: 'POST',
                crossDomain: true,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp: generatedOTP }),
              })
                .then((res) => res.json())
                .then((result) => {
                  if (result.status === 'ok') {
                    alert('OTP Sent');
                    if (!state) {
                      setState(!state);
                    }
                  } else {
                    toast.error('No Such Email Exist');
                  }
                });
            } catch (error) {
              console.log(error);
            }
          } else {
            toast.error(
              'Weak Password. Password should have at least one lowercase, uppercase, number, symbol, and length of at least 8 characters.'
            );
          }
        } else {
          toast.error('Passwords do not match');
        }
      } else {
        toast.error('Invalid Email');
      }
    } else {
      toast.error('Pending');
    }
  };

  //Handle OTP verification
  const handleOTPVerification = () => {
    if (uOTP === otp) {
      try {
        fetch('https://service-app-1.onrender.com/forgotpasswordupdate', {
          method: 'POST',
          crossDomain: true,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, pass }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result.status === 'ok') {
              toast.success('Password Updated Successfully!!');
              setTimeout(()=>navigate(`../login`),1000);
            } else {
              toast.error('Enter valid OTP');
            }
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleOTPUpdate}>
          <input
            type="email"
            placeholder="Email"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
            value={cpass}
            onChange={(e) => setCPass(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleOTPUpdate}
          >
            Submit
          </button>
        </form>
        {state && (
          <div className="mt-4">
            <input
              type="number"
              placeholder="OTP"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md py-2 px-3"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
            <button
              onClick={handleOTPVerification}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
        )}
      </div>
      <ToastContainer
                position='bottom-center' 
                autoClose={2000}
                theme='dark'
            />
    </div>
  );
}

export default ForgotPassword;
