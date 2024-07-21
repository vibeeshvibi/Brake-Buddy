import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


export default function SimpleBackdrop() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div>
      {/* <Button onClick={handleOpen}>Show backdrop</Button> */}
      <Backdrop
        sx={{ color: '#f5f5f5', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        onClick={handleClose}
      >
        <CircularProgress style={{ color: '#f5f5f5' }} />
      </Backdrop>
    </div>
  );
}
