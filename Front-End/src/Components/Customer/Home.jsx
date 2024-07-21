import React from 'react';
import BikeRepair from '../../Assets/bike.webp';
import { useNavigate } from "react-router-dom";
import useAuth from '../Auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect } from 'react';

function Home() {
  useAuth();
  const navigate = useNavigate();
 
  const navigatebook = () => {
    navigate(`../customerbooking`);
  };

  return (
    <div className="flex">
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="container max-w-md text-center">
          <h1 className="text-6xl font-bold leading-tight">Welcome <p className='text-red-600'>Motokid</p></h1><br />
          <h1 className="text-4xl font-bold  leading-tight">Looking for a Service ?</h1><br></br>
          {/* <h3 className="text-3xl text-red-600 font-semibold  mb-6 leading-tight">Book a Service Asap!</h3> */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg"
            onClick={navigatebook}
          >
            Book Now!
          </button>
        </div>
      </div>

      <div className="w-1/2">
        <div className="flex justify-center items-center h-screen">
          <img src={BikeRepair} alt="Bike Repair" className="max-h-full" />
        </div>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default Home;
