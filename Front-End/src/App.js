import './App.css';
import {Routes, Route} from 'react-router-dom';
import AddService from './Components/Admin/AddService';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/Signup';
import CustomerHome from './Components/Customer/Home';
import CustomerHistory from './Components/Customer/History';
import CustomerBooking from './Components/Customer/Booking';
import CustomerBook from './Components/Customer/Booked';
import ViewBooking from './Components/Customer/ViewBooking';
import ForgotPassword from './Components/ForgotPassword';
import Home from './Components/Home';
import Services from './Components/Customer/Service'
import CustBooking from './Components/Admin/CustBooking'; //admin
import UpdateBooking  from './Components/Admin/UpdateBooking'; //admin
import EditService from './Components/Admin/EditService';//admin
import AdminService from './Components/Admin/Service';//admin
import AdminHome from './Components/Admin/Home';//admin

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className='App_main_pagecontent'>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/addservice" element={<AddService />}></Route>
            <Route path="/adminservice" element={<AdminService />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/viewbooking" element={<ViewBooking />}></Route>
            <Route path="/admincustbooking" element={<CustBooking />}></Route>
            <Route path="/updatebooking" element={<UpdateBooking />}></Route>
            <Route path="/editservice" element={<EditService />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route path="/adminhome" element={<AdminHome />}></Route>
            <Route path="/customerhome" element={<CustomerHome />}></Route>
            <Route path="/customerhistory" element={<CustomerHistory />}></Route>
            <Route path="/customerbooking" element={<CustomerBooking />}></Route>
            <Route path="/customerbooked" element={<CustomerBook />}></Route>
            <Route path="/customerservice" element={<Services />}></Route>
          </Routes>
      </div>
    </div>
  );
}
export default App;
