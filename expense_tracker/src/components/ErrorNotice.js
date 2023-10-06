import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

function ErrorNotice({value}) {
    const [open, setOpen] = React.useState(true);
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
        navigate('/userDash/home')
    };
  return (
    <div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Restricted!.."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <Typography variant='h4'>
                Sorry.....!!!
           </Typography>
            {value}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} autoFocus color='secondary'>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ErrorNotice