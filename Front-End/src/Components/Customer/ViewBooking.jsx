import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Book from '../../Assets/application.jpg';
import useAuth from '../Auth';
import SimpleBackdrop from '../Backdrop';

function ViewBooking() {
    useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cancelLoading, setCancelLoading] = useState(false);
    const _id = sessionStorage.getItem("BookingID");

    useEffect(() => {
        try {
            fetch("https://service-app-1.onrender.com/viewbooking", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id }),
            })
            .then((res) => res.json())
            .then((data) => {
                setData(data.data);
                setLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }, [_id]);

    const handleConfirm = () => {
        navigate("../customerhome");
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to cancel this booking?")) {
            setCancelLoading(true);
            fetch(`https://service-app-1.onrender.com/custdeletebooking/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                setCancelLoading(false);
                if (data.status === 'OK') {
                    alert("Booking canceled successfully");
                    navigate("../customerhome");
                } else {
                    alert("Error canceling booking");
                }
            })
            .catch(error => {
                setCancelLoading(false);
                console.error("Error:", error);
            });
        }
    };

    return (
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Booking Details</h1>
            {!loading ? (
                <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
                    <form className="md:w-2/3 w-full p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-gray-600 font-semibold mb-2">Date</label>
                                <input
                                    type="text"
                                    id="date"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.date}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-600 font-semibold mb-2">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.name}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.email}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-600 font-semibold mb-2">Phone</label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.phone}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vname" className="block text-gray-600 font-semibold mb-2">Vehicle Name</label>
                                <input
                                    type="text"
                                    id="vname"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.vname}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vmodel" className="block text-gray-600 font-semibold mb-2">Vehicle Model</label>
                                <input
                                    type="text"
                                    id="vmodel"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.vmodel}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vno" className="block text-gray-600 font-semibold mb-2">Vehicle Number</label>
                                <input
                                    type="text"
                                    id="vno"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.vno}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="addr" className="block text-gray-600 font-semibold mb-2">Address</label>
                                <input
                                    type="text"
                                    id="addr"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.address}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4 md:col-span-2">
                                <label htmlFor="service" className="block text-gray-600 font-semibold mb-2">Service</label>
                                <textarea
                                    id="service"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.service?.join(", ")}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4 md:col-span-2">
                                <label htmlFor="status" className="block text-gray-600 font-semibold mb-2">Status</label>
                                <input
                                    type="text"
                                    id="status"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.status}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="flex justify-center md:justify-start mt-6 space-x-4">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                onClick={handleConfirm}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                onClick={handleCancel}
                                disabled={cancelLoading}
                            >
                                {cancelLoading ? 'Cancelling...' : 'Cancel Booking'}
                            </button>
                        </div>
                    </form>
                    <div className="md:w-1/2 w-full flex justify-center items-center p-8">
                        <img src={Book} alt="book" className="max-h-full w-full object-contain" />
                    </div>
                </div>
            ) : (
                <SimpleBackdrop />
            )}
        </div>
    );
}

export default ViewBooking;
