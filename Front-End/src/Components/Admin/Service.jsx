import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceImg from '../../Assets/service.jpg';
import useAuth from '../Auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SimpleBackdrop from '../Backdrop';

function Service() {
  useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [deletingService, setDeletingService] = useState(null); // State for tracking deleting service

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    try {
      fetch("https://service-app-1.onrender.com/service", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const updateservice = (_id) => {
    sessionStorage.setItem("changeser", _id);
    navigate(`../editservice`);
  };

  const AddServ = () => {
    sessionStorage.setItem("changeser", null);
  };

  const deleteservice = (_id) => {
    console.log(`Deleting service with id: ${_id}`);
    setDeletingService(_id); // Set the currently deleting service ID
    try {
      fetch("https://service-app-1.onrender.com/deleteservice", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then((data) => {
          console.log(`Response from server:`, data);
          setDeletingService(null); // Reset the deleting service ID
          if (data.status === "OK") {
            toast.error("Deleted Successfully");
            setData(prevData => prevData.filter(service => service._id !== _id));
          } else {
            toast.error(`Failed to delete the service: ${data.error}`);
            console.error(`Error: ${data.error}`);
          }
        })
        .catch((error) => {
          setDeletingService(null); // Reset the deleting service ID
          toast.error(`An error occurred: ${error.message}`);
          console.error('There was a problem with the fetch operation:', error);
        });
    } catch (error) {
      setDeletingService(null); // Reset the deleting service ID
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800">List of Services</h1>
      <div className="flex justify-start mt-5 mb-6">
        <button className="bg-blue-500 text-white py-2 px-4 rounded shadow hover:bg-blue-600">
          <Link to="../addservice" onClick={AddServ} className="text-white no-underline">
            Add New Service
          </Link>
        </button>
      </div>
      {!loading ?
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((row) => (
            <div key={row._id} className="bg-white shadow-lg hover:shadow-2xl border rounded-lg overflow-hidden">
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{row.sname}</h1>
                <img src={ServiceImg} alt="img" className="object-cover h-64" />
                <p className="text-gray-700 mb-4">{row.sdesc}</p>
                <p className="text-lg font-semibold mb-4">Rs : {row.samount}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => updateservice(row._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteservice(row._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    disabled={deletingService === row._id} // Disable button when deleting
                  >
                    {deletingService === row._id ? 'Deleting...' : 'Delete'} {/* Show loading text */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        : <SimpleBackdrop />}
      <ToastContainer
        position='bottom-center'
        autoClose={2000}
        theme='dark'
      />
    </div>
  );
}

export default Service;
