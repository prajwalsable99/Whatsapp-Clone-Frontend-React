import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import SearchedUser from './SearchedUser';
import UserChip from './UserChip';
import { MdArrowRightAlt } from "react-icons/md";
import { FaCamera } from 'react-icons/fa';
import MyToast from '../toasts/MyToast';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from '../../redux/auth/AuthAction';
// import { upload } from '@testing-library/user-event/dist/upload';
import { createGroupAction } from '../../redux/chat/ChatAction';
import { uploadToCloudinary } from '../../config/UploadToCloud';
const CreateGroup = ({ isOpen, closeGroupModal }) => {

    const [query, setQuery] = useState("");


    const [groupmembers, setGroupmembers] = useState([]);

    const [part1, setPart1] = useState(false);
    const token = localStorage.getItem("token");

    const dispatch = useDispatch();

    const { searchedusers,requser } = useSelector(store => store.auth);


    const addMember = (user) => {
        if (groupmembers.find(member => member.id === user.id)) {
            alert("User already added to the group");
        } else {
            setGroupmembers(prevMembers => [...prevMembers, user]);
        }
        // console.log(groupmembers)
    };

    const removeMember = (userId) => {
        setGroupmembers(prevMembers => prevMembers.filter(member => member.id !== userId));
        // console.log(groupmembers)
    };

   

    const handleQUery = (e) => {
        setQuery(e.target.value);
        if (token && e.target.value !== "") {
            dispatch(searchUserAction({ query: e.target.value, token }))
        }
    }

    const  onPart1Done=()=>{
        const isUserAlreadyAdded = groupmembers.find(member => member.id === requser.id);
        if (!isUserAlreadyAdded) {
            
        
            
            setGroupmembers(prevMembers => {
                const updatedMembers = [...prevMembers, requser];
                
                // console.log(updatedMembers);
                return updatedMembers;
            });
        }else{
            // console.log(groupmembers)
        }
        setPart1(true);
    }
   

    // part 2

    const [groupDp, setGroupDp] = useState(null);
    const [groupName, setGroupName] = useState("");

    const handleDpUpload = (event) => {
        const file = event.target.files[0]; // Get the first file selected by the user
        setGroupDp(file);
    };
    const handleNameUpload = (e) => {
        setGroupName(e.target.value);
    }
    const refreshInp = () => {
        setPart1(false)
        setGroupmembers([]);
        setQuery("");
        setGroupDp(null);
        setGroupName("");
    }


    const [showSnackbar, setShowSnackbar] = useState(false);
    const handleformsubmit =async (e) => {
        e.preventDefault();
        const Ids = groupmembers.map(member => member.id);
        const groupdata={

        }

        if(groupDp){
            
            const imgurl = await uploadToCloudinary(groupDp);
            groupdata.chat_image = imgurl;
       
        }

        if(groupName){
            groupdata.chat_name=groupName
        }
        groupdata.userIds=Ids

        const redata={
            token,
            data:groupdata
        }
        // console.log(redata)

        dispatch(createGroupAction(redata))
        closeGroupModalPLusRef()
        setShowSnackbar(true)

    }

    const closeGroupModalPLusRef = () => {
        refreshInp()
        closeGroupModal()
    }

    return (
        <div>
            <Modal open={isOpen} onClose={closeGroupModalPLusRef} className="flex items-center justify-center">


                {
                    part1 === false ?
                        // part1
                        <div className="bg-white w-1/4 p-4">

                            <div className='bg-[#008069] h-[8vh] flex flex-col justify-between py-2 px-6'>
                                <div></div>
                                <div className='flex text-white items-center text-xl space-x-7'>
                                    <p>Add Group Members</p>
                                </div>
                            </div>
                            {/* member added shown here */}
                            <div className='h-[12vh] overflow-y-auto p-2 grid grid-cols-2 gap-2'>
                                {groupmembers.map(item => (
                                    <UserChip key={item.id} item={item} removeMember={removeMember} />
                                ))}
                            </div>

                            {/* query input */}
                            <div>
                                <input
                                    value={query}
                                    onChange={handleQUery}
                                    type="text"
                                    name=""
                                    id=""
                                    className="border-b outline-none rounded px-3 py-2 w-full mb-4"

                                    placeholder="Search users..."
                                />
                            </div>

                            <div className='bg-white  flex flex-col justify-between py-2 pl-3'>

                                <div className='text-xs flex text-green-600 items-center text-xl '>
                                    #
                                </div>
                                <div className='border-b ml-4' ></div>
                            </div>
                            {/* serached users */}
                            <div className='h-[40vh] overflow-y-auto'>
                                {query === "" ?
                                    null :
                                    searchedusers.map((item) => (
                                        <div key={item?.id} onClick={() => { addMember(item) }} >
                                            <SearchedUser item={item} />
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='flex justify-center'>

                                <div className='bg-green-300 border border-rounded rounded-full mt-3'>
                                    {groupmembers.length !== 0 ?

                                        <div className='text-5xl text-white bg-[#008069] p-2 border border-rounded rounded-full'>
                                            <MdArrowRightAlt onClick={ onPart1Done } ></MdArrowRightAlt>
                                        </div>
                                        :
                                        <div className='text-5xl text-white bg-gray-300 p-2 border border-rounded rounded-full'>
                                            <MdArrowRightAlt ></MdArrowRightAlt>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        :
                        // part2
                        <div className='bg-white w-1/4 p-4 h-[85vh]'>

                            <form onSubmit={handleformsubmit}>
                                <div className='w-full flex justify-center items-center bg-white py-6 px-3'>
                                    <label htmlFor='inpimg'>
                                        <div className='relative'>
                                            <img
                                                className='w-40 h-40 rounded-full justify-center'
                                                src={groupDp ? URL.createObjectURL(groupDp) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                                                alt="Profile"
                                            />
                                            <input type="file" onChange={handleDpUpload} accept="image/*" className='absolute inset-0 w-full h-full opacity-0 cursor-pointer' name='inpimg' id='inpimg' />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                {!groupDp && <FaCamera className="text-white text-xl" />}
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                {/* group name */}
                                <input
                                    className={`outline-none px-3 w-[90%] text-lg border-b mt-10`}
                                    placeholder='group subject '
                                    type="text"
                                    value={groupName}
                                    onChange={handleNameUpload}

                                />

                                {/*submit button  */}
                                <div className='mt-10 flex justify-center'>

                                    <div className='bg-green-300 border border-rounded rounded-full mt-3'>


                                        <div className='text-5xl text-white bg-[#008069] p-2 border border-rounded rounded-full'>
                                            <MdArrowRightAlt onClick={handleformsubmit} ></MdArrowRightAlt>
                                        </div>


                                    </div>
                                </div>



                            </form>

                        </div>

                }

            </Modal>

            <MyToast open={showSnackbar} onClose={setShowSnackbar} message="Group Created" severity="success" autoHideDuration={6000} position={{ vertical: 'top', horizontal: 'center' }} />

        </div>
    );
};

export default CreateGroup;
