import React, { useState, useEffect } from 'react';
import ServiceImg from '../../Assets/service.jpg';
import useAuth from '../Auth';
import 'react-toastify/dist/ReactToastify.css';
import SimpleBackdrop from '../Backdrop';
import { useNavigate } from 'react-router-dom';

function Services() {
  useAuth();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(true)

  function handleBook() {
    navigate('/customerbooking');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://service-app-1.onrender.com/service", {
          method: "POST",
          crossDomain: true,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(),
        });
        const result = await response.json();
        setData(result.data);
        console.log("Hii");
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-5xl font-bold  text-center text-gray-800">Available Services</h1>
      {!loading?
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {data.map((item) => (
          <div key={item._id} className="bg-white shadow-lg hover:shadow-2xl border rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{item.sname}</h1>
              <img src={ServiceImg} alt="Service" className="object-cover h-64 mb-4" />
              <p className="text-gray-700 mb-4">{item.sdesc}</p>
              <p className="text-lg font-semibold mb-4">Rs : {item.samount}</p>
              <div className="flex justify-between">
                <button
                  onClick={handleBook}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>:<SimpleBackdrop />
    }
    </div>
  );
}

export default Services;
