import React from 'react';
import { useNavigate } from "react-router-dom";
import BikeRepair from '../../Assets/owner.webp';
import useAuth from '../Auth';

function Home() {
  const navigate = useNavigate();

  const navigateBooking = () => {
    navigate("../admincustbooking");
  };
  useAuth();

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-8">
      <div className="AdminHomeDetails flex-1 md:mr-8 flex justify-center items-center md:items-start">
        <div className="container mx-auto text-center md:text-left px-3">
          <h1 className="text-8xl font-bold mb-4 pt-20">Welcome Admin</h1>
          <h3 className="text-4xl pt-5 text-red-700 font-bold mb-4">Here are the Bookings!</h3>
          <div className='pt-5'>
          <button
            className="bg-red-700  text-white py-2 px-4 rounded shadow hover:bg-red-300"
            onClick={navigateBooking}
          >
            View Booking
          </button>
          </div>
        </div>
      </div>
      <div className="AdminHomeImage flex-1 flex justify-center items-center">
        <img src={BikeRepair} alt="Bike Repair" className="w-full h-auto " />
      </div>
    </div>
  );
}

export default Home;
