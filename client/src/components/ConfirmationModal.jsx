import { Box, Typography, Modal, Button } from '@mui/material';

export const ConfirmationModal = ({
    title,
    description,
    btnText,
    setOpenConfirm,
    openConfirm,
    modalFunction,
}) => {
    return (
        <Modal open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <Box className='modal-container' sx={{ width: 350 }}>
                <Typography variant='h6'>{title}</Typography>
                <p>{description}</p>
                <Button
                    variant='contained'
                    sx={{ mr: '1rem', mt: '1rem' }}
                    onClick={() => {
                        modalFunction();
                        setOpenConfirm(false);
                    }}
                >
                    {btnText}
                </Button>
                <Button
                    variant='outlined'
                    sx={{ mt: '1rem' }}
                    onClick={() => setOpenConfirm(false)}
                >
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};
