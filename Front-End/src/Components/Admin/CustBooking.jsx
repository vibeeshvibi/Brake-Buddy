import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import useAuth from '../Auth';
import SimpleBackdrop from '../Backdrop';

function CustBooking() {
    useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false); // State for button loading

    const fetchData = (status) => {
        setButtonLoading(true);
        setLoading(true);
        try {
            fetch("https://service-app-1.onrender.com/custbooking", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            }).then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                    setLoading(false);
                    setButtonLoading(false);
                });
        } catch (error) {
            console.log(error);
            setButtonLoading(false);
        }
    };

    useEffect(() => {
        fetchData(status);
    }, [status]);

    const updateservice = (_id) => {
        sessionStorage.setItem("UpdateBookingID", _id);
        navigate(`../updatebooking`);
    }

    return (
        <div className="min-h-screen p-8 ">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Status Checking</h1>
            <div className="flex justify-between gap-2 mb-6">
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={() => setStatus(null)}
                    disabled={buttonLoading}
                >
                    {buttonLoading && status === null ? 'Loading...' : 'All'}
                </button>
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={() => setStatus("Pending")}
                    disabled={buttonLoading}
                >
                    {buttonLoading && status === "Pending" ? 'Loading...' : 'Pending'}
                </button>
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={() => setStatus("Ready")}
                    disabled={buttonLoading}
                >
                    {buttonLoading && status === "Ready" ? 'Loading...' : 'Ready'}
                </button>
                <button
                    className="bg-blue-500 w-28 text-white py-2 px-4 rounded shadow hover:bg-blue-600"
                    onClick={() => setStatus("Completed")}
                    disabled={buttonLoading}
                >
                    {buttonLoading && status === "Completed" ? 'Loading...' : 'Completed'}
                </button>
            </div>
            {!loading ?
                <div className="overflow-x-auto">
                    <div className="min-w-full bg-white shadow-md rounded-lg overflow-wrap">
                        <table className="min-w-full bg-white">
                            <thead className="bg-gray-300">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Vehicle NO</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Service</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((row) => (
                                    <tr key={row._id} className="hover:bg-gray-100">
                                        <td className="px-4 py-4 whitespace-nowrap">{row.vno}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{row.date}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{row.name}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{row.service.join(", ")}</td>
                                        <td className="px-4 py-4 whitespace-nowrap">{row.status}</td>
                                        <td className="px-4 py-4 whitespace-nowrap ">
                                            <button
                                                className="bg-blue-500 w-18 text-white py-2 px-6 rounded shadow hover:bg-blue-600"
                                                onClick={() => updateservice(row._id)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div> : <SimpleBackdrop />
            }
        </div>
    );
}

export default CustBooking;
