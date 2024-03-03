import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { siginAction } from '../../redux/auth/AuthAction';
import { useDispatch } from 'react-redux';
import MyToast from '../toasts/MyToast';

function Signin() {

  const navi=useNavigate();
  const [signinData, setsigninData] = useState({
    email: '',
    password: ''
  });

  const token=localStorage.getItem("token");
  
  useEffect(() => {
    // Check if token is absent, then redirect to signin page
    if (token) {
        navi('/');
    }else{

    }
}, [navi, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setsigninData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [showSnackbar, setShowSnackbar] = useState(false);
  const dispatch=useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you can handle form submission, e.g., send data to backend
      // console.log(formData);

      const response = await dispatch(siginAction(signinData));

      if (response && response.auth !== null) {
        setShowSnackbar(true);
        setsigninData({
          email: '',
          password: ''
        }

        )

        setTimeout(() => {
          navi("/");
        }, 1000); // 2000 milliseconds = 2 seconds

      } else {
        alert("invalid credentials");
      }
    } catch (error) {
      console.error("Error during signin:", error);
      // Handle error, show error message, etc.
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green">


      <form onSubmit={handleSubmit} className="w-full max-w-sm m-2 p-8  bg-white rounded-lg">
        <div className='mb-2 bg-[#008069] h-[15vh] flex  w-full items-center justify-center py-2 px-6 space-x-2'>

          <FaWhatsapp className='text-white text-3xl' />
          <p className='text-white text-2xl'>Sign in</p>

        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={signinData.email}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={signinData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className='p-4'>
          <button type="submit" className="text-center bg-[#008069] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-full focus:outline-none focus:shadow-outline">Sign in</button>
        </div>
        <hr className='mb-1' />
        <div className='text-center flex items-center'>
          Not Registered yet?,<Link to={"/signup"} className='text-blue-600' > register</Link>

        </div>
      </form>

      <MyToast open={showSnackbar} onClose={setShowSnackbar} message="User logged in" severity="success" autoHideDuration={6000} position={{ vertical: 'top', horizontal: 'center' }} />
          
    </div>
  );
}

export default Signin;
