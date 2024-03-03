import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
import { BsThreeDotsVertical } from 'react-icons/bs';
import CreateGroup from '../Group/CreateGroup';
import { useDispatch } from 'react-redux';
import { LogoutAction } from '../../redux/auth/AuthAction';
import { useNavigate } from 'react-router-dom';
import MyToast from '../toasts/MyToast';
const MenuComp = () => {

  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navi=useNavigate();

  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleLogout = () => {
    // Add logout logic here
    handleClose();
    dispatch(LogoutAction())
    setShowSnackbar(true);
    setTimeout(() => {
      navi("/signin")
    }, 1000); // 2000 milliseconds = 2 seconds
    
    
  };

  const [GroupModalisOpen,setGroupModalisOpen]=useState(false);

  const openGroupModal=()=>{
    setGroupModalisOpen(true);
  }
  const closeGroupModal=()=>{
    setGroupModalisOpen(false);
  }



  const handleNewGroup = () => {
    // Add logic to create a new grou
    
    handleClose();
    openGroupModal()
  };

  const handleSettings = () => {
    // Add logic to open settings
    handleClose();
  };

  return (
    <div>
      
        <BsThreeDotsVertical onClick={handleClick} className='cursor-pointer ' />
     
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleNewGroup}>New Group</MenuItem>
        <MenuItem onClick={handleSettings}>Settings</MenuItem>
      </Menu>

      <CreateGroup isOpen={GroupModalisOpen} closeGroupModal={closeGroupModal}/>
      
      <MyToast open={showSnackbar} onClose={setShowSnackbar} message="User logged out" severity="success" autoHideDuration={6000} position={{ vertical: 'top', horizontal: 'center' }} />
          
    </div>
  );
};

export default MenuComp;
