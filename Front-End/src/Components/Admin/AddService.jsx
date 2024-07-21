import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import service from '../../Assets/application.jpg';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../Auth';

function AddService() {
  useAuth();
  const [sname, setSName] = useState("");
  const [sdesc, setSDesc] = useState("");
  const [samount, setSAmount] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(`../adminservice`);
  };

  const alpha = /^[A-Za-z ]+$/; 
  const alphanumeric = /^[0-9a-zA-Z ]+$/; 

  const handleSubmit = () => {
    if (sname && alpha.test(sname)) {
      if (sdesc) {
        if (samount && samount > 0 && alphanumeric.test(samount)) {
          setLoading(true); // Set loading to true
          try {
            fetch("https://service-app-1.onrender.com/addservices", {
              method: "POST",
              crossDomain: true,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ sname, sdesc, samount }),
            })
              .then((res) => res.json())
              .then((data) => {
                setLoading(false); // Set loading to false
                if (data.status === "ok") {
                  toast.success("Added Successfully");
                  setTimeout(() => navigate(`../adminservice`), 2000);
                } else {
                  toast.error("Service Already Exists");
                }
              });
          } catch (error) {
            setLoading(false); // Set loading to false
            console.log(error);
          }
        } else {
          toast("Invalid Service Amount");
        }
      } else {
        toast("Invalid Service Description");
      }
    } else {
      toast("Invalid Service Name");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-8  ">
      <form className="flex-1 p-6 bg-white shadow-md rounded-lg mb-8 md:mb-0 md:mr-8">
        <h1 className="text-2xl font-bold mb-6">Add Service</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setSName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            onChange={(e) => setSDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setSAmount(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleSubmit}
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Adding...' : 'Confirm'} {/* Change button text when loading */}
          </button>
          <button
            type="button"
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
      <div className="flex-1 flex justify-center items-center">
        <img src={service} alt="service" className="w-full h-auto rounded-lg " />
      </div>
      <ToastContainer
        position='bottom-center' 
        autoClose={1000}
        theme='dark'
      />
    </div>
  );
}

export default AddService;
