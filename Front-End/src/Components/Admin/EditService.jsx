import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import service from '../../Assets/application.jpg';
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../Auth';

function EditService() {
  useAuth();
  const [sname, setSName] = useState("");
  const [sdesc, setSDesc] = useState("");
  const [samount, setSAmount] = useState("");
  const [loading, setLoading] = useState(false); // New loading state for confirm button
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const _id = sessionStorage.getItem("changeser");

  useEffect(() => {
    try {
      fetch("https://service-app-1.onrender.com/fetchservice", {
        method: "POST",
        crossDomain: true,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, [_id]);

  const handleCancel = () => {
    sessionStorage.setItem("changeser", null);
    navigate(`../adminservice`);
  };

  // Validation
  const alpha = /^[A-Za-z ]+$/; // Only Alpha
  const alphanumeric = /^[0-9a-zA-Z ]+$/; // Validate Alpha Numeric

  const handleSubmit = () => {
    if (sname) data.sname = sname;
    if (sdesc) data.sdesc = sdesc;
    if (samount) data.samount = samount;

    if (alpha.test(data.sname)) {
      if (alphanumeric.test(data.samount)) {
        setLoading(true);
        try {
          fetch("https://service-app-1.onrender.com/updateservice", {
            method: "POST",
            crossDomain: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data }),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoading(false);
              if (data.status === "OK") {
                toast.success("Updated Successfully");
                setTimeout(() => navigate(`../adminservice`), 2000);
              }
            });
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        toast("Invalid Amount");
      }
    } else {
      toast("Invalid Service Name");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row p-8">
      <form className="flex-1 p-6 bg-white shadow-md rounded-lg mb-8 md:mb-0 md:mr-8">
        <h1 className="text-2xl font-bold mb-6">Edit Service</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            defaultValue={data.sname}
            onChange={(e) => setSName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Service Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows="4"
            defaultValue={data.sdesc}
            onChange={(e) => setSDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Amount</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            defaultValue={data.samount}
            onChange={(e) => setSAmount(e.target.value)}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Confirm'}
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
        <img src={service} alt="service" className="w-full h-auto " />
      </div>
      <ToastContainer
        position='bottom-center' 
        autoClose={2000}
        theme='dark'
      />
    </div>
  );
}

export default EditService;
