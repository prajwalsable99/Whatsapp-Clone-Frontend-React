import React, { useRef, useState } from 'react';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { uploadToCloudinary } from '../config/UploadToCloud';
import { updateUserAction } from '../redux/auth/AuthAction';

const ProfileComp = ({ goback }) => {

    const { requser } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");

    const [profilePic, setProfilePic] = useState(requser?.profile_picture);
    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // Get the first file selected by the user

        const reqdata = {

        }

        if (file != null) {

            const imgurl = await uploadToCloudinary(file);
            reqdata.profile_picture = imgurl;

            dispatch(updateUserAction({ token, data: reqdata }))
            setProfilePic(imgurl)
        }
    };

    const [name, setName] = useState(requser?.full_name);
    const [isEditing, setIsEditing] = useState(false);
    const inputRef = useRef(null);

    const handleIconClick = () => {
        setIsEditing(prevState => !prevState);
        if (!isEditing) {
            inputRef.current.focus();
        }
    };

    const handleDoneClick = () => {
        setIsEditing(!isEditing);
        // console.log(name.toUpperCase()); // Log name in uppercase

        const reqdata = {
            full_name: name
        }

        dispatch(updateUserAction({ token, data: reqdata }))

    };

    const handleChange = (event) => {
        setName(event.target.value);
    };

    return (
        <div className='left w-[30%] h-full bg-white border'>
            {/* header */}
            <div className='bg-[#008069] h-[15vh] flex flex-col justify-between py-2 px-6'>
                <div></div>
                <div className='flex text-white items-center text-xl space-x-7'>
                    <FaLongArrowAltLeft className='cursor-pointer' onClick={goback} />
                    <p>Profile</p>
                </div>
            </div>

            {/* profile photo */}
            <div className='w-full flex justify-center items-center  bg-gray-100  py-6 px-3'>
                <label htmlFor='inpimg'>
                    <img
                        className='w-40 h-40 rounded-full justify-center'
                        src={profilePic || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                        alt="Profile"
                    />
                </label>
                <input type="file" onChange={handleImageUpload} accept="image/*" className='hidden' name='inpimg' id='inpimg' />
            </div>

            {/* name */}
            <div className='bg-white  w-full mt-4'>
                <p className='px-3 text-xs text-blue-600' >Your Name</p>
                <div className='flex justify-between px-3 mt-2 w-full'>
                    <input
                        className={`outline-none px-3 w-[90%] ${isEditing ? 'text-lg border-b' : 'text-md'}`}
                        ref={inputRef}
                        type="text"
                        value={name}
                        onChange={handleChange}
                        readOnly={!isEditing}
                    />
                    {isEditing ? (
                        <MdDone onClick={handleDoneClick} />
                    ) : (
                        <FaPen onClick={handleIconClick} className='text-sm text-gray-600' />
                    )}
                </div>
            </div>

            {/* warning */}
            <div className='px-2 text-xs bg-gray-100 py-4 mt-2'>
                <p className=' flex justify-center w-[75%] mx-auto font-thin'>
                    This is not your username or pin. This name will be visible to your WhatsApp contacts.
                </p>
            </div>
        </div>
    );
};

export default ProfileComp;
