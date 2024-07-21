import React, { useState, useEffect } from 'react';
import Book from '../../Assets/application.jpg';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import useAuth from '../Auth';
import 'react-toastify/dist/ReactToastify.css';
import SimpleBackdrop from '../Backdrop';

function UpdateBooking() {
    useAuth();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [_id, setId] = useState(sessionStorage.getItem("UpdateBookingID"));
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        if (_id) {
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
                        setEmail(data.data.email);
                        setStatus(data.data.status); // Set the initial status
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, [_id]);

    const handleBack = () => {
        navigate("../admincustbooking");
    }

    const handleUpdate = () => {
        if (data.status === "Completed" && status === "Completed") {
            toast.success("Already the Service is Completed");
        } else {
            setUpdateLoading(true);
            try {
                fetch("https://service-app-1.onrender.com/updatebooking", {
                    method: "POST",
                    crossDomain: true,
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ _id, status, email }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.status === "ok") {
                            toast.success("Updated Successfully");
                        } else {
                            toast.error("Failed to update the service");
                        }
                        setUpdateLoading(false);
                        setTimeout(() => navigate("../admincustbooking"), 2000);
                    });
            } catch (error) {
                console.log(error);
                setUpdateLoading(false);
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            setDeleteLoading(true);
            fetch(`https://service-app-1.onrender.com/custdeletebooking/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'OK') {
                        toast.success("Booking canceled successfully");
                        setTimeout(() => navigate('../admincustbooking'), 2000);
                    } else {
                        toast.error("Error canceling booking");
                    }
                    setDeleteLoading(false);
                })
                .catch(error => {
                    console.error("Error:", error);
                    toast.error("Error canceling booking");
                    setDeleteLoading(false);
                });
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 lg:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">Update Booking</h1>
            {!loading ? (
                <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <form className="w-full md:w-2/3 p-4 md:p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {[
                                { id: 'date', label: 'Date', value: data.date },
                                { id: 'name', label: 'Name', value: data.name },
                                { id: 'email', label: 'Email', value: data.email },
                                { id: 'phone', label: 'Phone', value: data.phone },
                                { id: 'vname', label: 'Vehicle Name', value: data.vname },
                                { id: 'vmodel', label: 'Vehicle Model', value: data.vmodel },
                                { id: 'vno', label: 'Vehicle Number', value: data.vno },
                                { id: 'addr', label: 'Address', value: data.address },
                            ].map(({ id, label, value }) => (
                                <div key={id} className="mb-4">
                                    <label htmlFor={id} className="block text-gray-600 font-semibold mb-2">{label}</label>
                                    <input
                                        type="text"
                                        id={id}
                                        className="w-full p-3 border rounded-lg bg-gray-100"
                                        value={value}
                                        readOnly
                                    />
                                </div>
                            ))}
                            <div className="mb-4 col-span-2">
                                <label htmlFor="service" className="block text-gray-600 font-semibold mb-2">Service</label>
                                <textarea
                                    id="service"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={data.service?.join(", ")}
                                    readOnly
                                />
                            </div>
                            <div className="mb-4 col-span-2">
                                <label htmlFor="status" className="block text-gray-600 font-semibold mb-2">Status</label>
                                <select
                                    id="status"
                                    className="w-full p-3 border rounded-lg bg-gray-100"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Ready">Ready</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-6">
                            <button
                                type="button"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                onClick={handleBack}
                                disabled={updateLoading || deleteLoading}
                            >
                                Back
                            </button>
                            <button
                                type="button"
                                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                onClick={handleUpdate}
                                disabled={updateLoading}
                            >
                                {updateLoading ? 'Updating...' : 'Update Service'}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </form>
                    <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
                        <img src={Book} alt="book" className="w-full h-auto object-cover" />
                    </div>
                </div>
            ) : (
                <SimpleBackdrop />
            )}
            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                theme='dark'
            />
        </div>
    );
}

export default UpdateBooking;
