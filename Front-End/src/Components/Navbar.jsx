import React, {  useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';



const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const role = sessionStorage.getItem("role");

  const logout = () => {
    toast.error("Logged out");
    // setTimeout(()=>navigate(`/`),2000);
    sessionStorage.clear();
  }


  
  

  const Home = () => {
    if (role == null) {
      navigate(`../`);
    } else if (role === "user") {
      navigate(`../customerhome`);
    } else {
      navigate(`../adminhome`);
    }
  }

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white p-4 shadow-md sticky top-0 w-full  ">
      <div className="flex items-center flex-shrink-0 text-red-500 mr-6 cursor-pointer" onClick={Home}>
        <span className="font-bold text-3xl tracking-tight">Brake</span>
        <span className="ml-1 text-black text-2xl">Buddy</span>
      </div>
      <div className="block lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <button className="flex items-center px-2 ml-24 py-2 border rounded text-gray-600 border-gray-400 hover:text-gray-800 hover:border-gray-800">
          {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>
      <div className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="text-lg lg:flex-grow lg:flex lg:justify-end">
          {role == null ? (
            <>
              <NavLink to="/login" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
               Login
              </NavLink>
              <NavLink to="/signup" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500">
                SignUp
              </NavLink>
            </>
          ) : (
            role === "user" ? (
              <>
                <NavLink to="/customerhome" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                  Home
                </NavLink>
                <NavLink to="/customerbooking" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                   Book
                </NavLink>
                <NavLink to="/customerservice" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                   Services
                </NavLink>
                <NavLink to="/customerhistory" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                 History
                </NavLink>
                <NavLink to="/customerbooked" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                  Status
                </NavLink>
                <NavLink to="/" onClick={logout} className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/adminhome" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                 Home
                </NavLink>
                <NavLink to="/adminservice" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                  Service
                </NavLink>
                <NavLink to="/admincustbooking" className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500 mr-4">
                  Booking
                </NavLink>
                <NavLink to="/" onClick={logout} className="flex items-center mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-red-500">
                 Logout
                </NavLink>
              </>
            )
          )}
        </div>
      </div>
      <ToastContainer
        position='bottom-center' 
        autoClose={2000}
        theme='dark'
      />
    </nav>
  );
}

export default Navbar;
