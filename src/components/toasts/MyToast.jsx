import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MyToast = ({ open, onClose, message, severity, autoHideDuration,position }) => {
    const handleSnackbarClose = () => {
        onClose(false);
    };

    return (
        <Snackbar anchorOrigin={position} open={open} autoHideDuration={autoHideDuration} onClose={handleSnackbarClose} >
            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={severity}>
                {message}
            </MuiAlert>
        </Snackbar>
    );
};

export default MyToast;
