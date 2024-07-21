import React from 'react';
import BikeRepair from '../../Assets/bike.webp';
import { useNavigate } from "react-router-dom";
import useAuth from '../Auth';

function Home() {
  useAuth();
  const navigate = useNavigate();

  const navigatebook = () => {
    navigate(`../customerbooking`);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="container max-w-md text-center">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Welcome <p className='text-red-600'>Motokid</p>
          </h1>
          <br />
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
            Looking for a Service?
          </h1>
          <br />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg"
            onClick={navigatebook}
          >
            Book Now!
          </button>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-0">
        <img src={BikeRepair} alt="Bike Repair" className="max-w-full h-auto lg:max-h-full" />
      </div>
    </div>
  );
}

export default Home;
