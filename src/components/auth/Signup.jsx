import React, { useState } from 'react';
import {  FaWhatsapp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { sigupAction } from '../../redux/auth/AuthAction';

import MyToast  from '../toasts/MyToast';
function Signup() {
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  // const {auth}=useSelector(store=>store);
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const navi=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Here you can handle form submission, e.g., send data to backend
      // console.log(formData);

      const response = await dispatch(sigupAction(formData));

      if (response && response.auth !== null) {
        setShowSnackbar(true);
        setFormData({
          full_name: '',
          email: '',
          password: ''
        });
        // setTimeout(() => {
        //   navi("/signin");
        // }, 1000); // 2000 milliseconds = 2 seconds

      } else {
        alert("Email already exists.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle error, show error message, etc.
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green">


      <form onSubmit={handleSubmit} className="w-full max-w-sm m-2 p-8  bg-white rounded-lg">
        <div className='mb-2 bg-[#008069] h-[15vh] flex  w-full items-center justify-center py-2 px-6 space-x-2'>

          <FaWhatsapp className='text-white text-3xl' />
          <p className='text-white text-2xl'>Sign up</p>

        </div>
        <div className="mb-4">
          <label htmlFor="full_name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className='p-4'>
          <button type="submit" className="text-center bg-[#008069] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded rounded-full focus:outline-none focus:shadow-outline">Sign Up</button>
        </div>
        <hr className='mb-1' />
        <div className='text-center flex items-center'>
        Already Signed up,<Link to={"/signin"} className='text-blue-600' > Login</Link>
        
        </div>
      </form>
      <MyToast open={showSnackbar} onClose={setShowSnackbar} message="User Created" severity="success" autoHideDuration={6000} position={{ vertical: 'top', horizontal: 'center' }} />
            

            
      
      
            
    </div>
  );
}

export default Signup;
