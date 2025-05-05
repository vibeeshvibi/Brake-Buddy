import React, { useState, useEffect } from 'react';
import Book from '../../Assets/application.jpg';
import { useNavigate } from "react-router-dom";
import { Select, MenuItem } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../Auth';

function Booking() {
    useAuth();
    const [name, setOName] = useState("");
    const [vname, setVName] = useState("");
    const [vno, setVNo] = useState("");
    const [vmodel, setVModel] = useState("");
    const [address, setVAddress] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = (currDate.getMonth() + 1).toString().padStart(2, '0');
    const currDay = currDate.getDate().toString().padStart(2, '0');
    const sdate = `${currYear}-${currMonth}-${currDay}`;
    const edate = `${currYear + 1}-${currMonth}-${currDay}`;

    const alpha = /^[A-Za-z ]+$/;
    const VNO = /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/;
    const alphanumeric = /^[0-9a-zA-Z ]+$/;

    useEffect(() => {
        try {
            fetch("https://brake-buddy-2.onrender.com/service", {
                method: "POST",
                crossDomain: true,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(),
            })
                .then((res) => res.json())
                .then((data) => {
                    setData(data.data);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setService(typeof value === 'string' ? value.split(',') : value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = sessionStorage.getItem("Email");
        const phone = sessionStorage.getItem("Phone");
        if (date !== "") {
            if (name !== "" && alpha.test(name)) {
                if (vname !== "" && alphanumeric.test(vname)) {
                    if (vno !== "" && VNO.test(vno)) {
                        if (vmodel !== "" && alphanumeric.test(vmodel)) {
                            if (address !== "") {
                                if (service.length > 0) {
                                    try {
                                        const res = await fetch("https://brake-buddy-2.onrender.com/addbooking", {
                                            method: "POST",
                                            crossDomain: true,
                                            headers: { "Content-Type": "application/json" },
                                            body: JSON.stringify({ date, name, email, phone, vname, vno, vmodel, address, service }),
                                        });

                                        setLoading(false);

                                        if (res.status === 200) {
                                            toast.success("Added Successfully");
                                            setTimeout(() => navigate('/customerbooked'), 1000);
                                        } else if (res.status === "NotCompleted") {
                                            toast.error("Not Completed");
                                        } else {
                                            toast.error("Unknown Error Occured!");
                                        }
                                    } catch (error) {
                                        setLoading(false);
                                        console.log(error);
                                    }
                                } else {
                                    setLoading(false);
                                    toast("Choose at least one Service");
                                }
                            } else {
                                setLoading(false);
                                toast.error("Invalid Address");
                            }
                        } else {
                            setLoading(false);
                            toast.error("Invalid Vehicle Model");
                        }
                    } else {
                        setLoading(false);
                        toast.error("Invalid Registration Number");
                    }
                } else {
                    setLoading(false);
                    toast.error("Invalid Vehicle Name");
                }
            } else {
                setLoading(false);
                toast.error("Invalid Name");
            }
        } else {
            setLoading(false);
            toast("Pick a Date");
        }
    };

    const handleCancel = () => {
        navigate("/customerhome");
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white">
            <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
                <form className="container max-w-md mx-auto">
                    <h1 className="text-4xl lg:text-5xl font-bold mb-4">Book a Service</h1>
                    <label htmlFor="date" className="block mb-2">Date</label>
                    <input
                        type="date"
                        id="date"
                        className="border-2 h-12 p-4 rounded mb-4 w-full"
                        min={sdate}
                        max={edate}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <label htmlFor="name" className="block mb-2">Owner Name</label>
                    <input
                        id="name"
                        className="mb-4 w-full h-12 p-4 border-2 rounded-md"
                        placeholder='Enter Your Name'
                        onChange={(e) => setOName(e.target.value)}
                    />
                    <label htmlFor="vname" className="block mb-2">Vehicle Name</label>
                    <input
                        id="vname"
                        placeholder='Enter Your Vehicle Name'
                        className="mb-4 w-full h-12 p-4 border-2 rounded-md"
                        onChange={(e) => setVName(e.target.value)}
                    />
                    <label htmlFor="vno" className="block mb-2">Registration Number (TN56S2428)</label>
                    <input
                        id="vno"
                        className="mb-4 w-full h-12 p-4 border-2 rounded-md"
                        placeholder='Enter Your Reg No'
                        onChange={(e) => setVNo(e.target.value)}
                    />
                    <label htmlFor="vmodel" className="block mb-2">Vehicle Year</label>
                    <input
                        id="vmodel"
                        placeholder='Enter Your Vehicle Manufacture Year'
                        className="mb-4 w-full h-12 p-4 border-2 rounded-md"
                        onChange={(e) => setVModel(e.target.value)}
                    />
                    <label htmlFor="addr" className="block mb-2">Address</label>
                    <input
                        id="addr"
                        className="mb-4 w-full h-12 p-4 border-2 rounded-md"
                        onChange={(e) => setVAddress(e.target.value)}
                    />
                    <label htmlFor="service" className="block mb-2">Pick a Service</label>
                    <Select
                        id="service"
                        multiple
                        value={service}
                        onChange={handleChange}
                        className="w-full h-12"
                    >
                        {data.map((item) => (
                            <MenuItem key={item.sname} value={item.sname}>
                                {item.sname}
                            </MenuItem>
                        ))}
                    </Select>
                    <div className="mt-8 space-x-4">
                        <button
                            variant="contained"
                            onClick={handleSubmit}
                            className={`bg-green-500 w-28 h-12 text-white font-bold rounded-md text-lg ${loading ? 'cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Booking...' : 'Book'}
                        </button>
                        <button
                            variant="contained"
                            onClick={handleCancel}
                            className='bg-red-500 w-28 h-12 text-white font-bold rounded-md text-lg'
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-center p-4 lg:p-0">
                <img src={Book} alt="book" className="max-w-full h-auto lg:max-h-full" />
            </div>
            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                theme='dark'
            />
        </div>
    );
}

export default Booking;
