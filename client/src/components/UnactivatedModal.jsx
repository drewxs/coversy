import { useSelector } from 'react-redux';
import { Box, Typography, Modal, Button } from '@mui/material';
import { SetUnactivatedOpen } from 'redux/data/user';

export const UnactivatedModal = () => {
  const unactivatedOpen = useSelector((state) => state.user.unactivatedOpen);

  return (
    <Modal open={unactivatedOpen} onClose={() => SetUnactivatedOpen(false)}>
      <Box className='modal-container'>
        <Typography variant='h6'>Account Not Activated</Typography>
        <Typography variant='body2'>
          Please contact the site administrator for activation.
        </Typography>
        <Button
          variant='contained'
          sx={{ mt: '1rem' }}
          onClick={() => SetUnactivatedOpen(false)}
        >
          Okay
        </Button>
      </Box>
    </Modal>
  );
};
