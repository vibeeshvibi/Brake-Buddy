import Bike from '../Assets/bike.webp';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate(`../login`);
  };


  return (
    <div className="flex">
      {/* Left Side Content */}
      <div className="w-1/2 flex flex-col justify-center items-center p-8">
        <div className="container max-w-md text-center">
          <h1 className="text-7xl font-bold mb-4 leading-tight ">Looking for a Service!</h1>
          <h3  className="text-5xl text-red-600 font-semibold mb-6 leading-tight">We are Here</h3>
          <button
            className="bg-blue-800 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg"
            onClick={navigateLogin}
          >
            Login Now
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="w-1/2">
        <div className="flex justify-center items-center h-screen">
          <img src={Bike} alt="bike" className="max-h-full mr-10  " />
        </div>
      </div>
    </div>
  );
}

export default Home;
