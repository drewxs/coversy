import React from 'react';

import { Box, Typography, Modal, Button } from '@mui/material';

export const ConfirmationModal = ({
    title,
    description,
    btnText,
    openConfirm,
    close,
    setOpenConfirm,
}) => {
    close = () => openConfirm(false);
    setOpenConfirm = () => openConfirm(true);

    return (
        <Modal>
            <Box
                open={openConfirm}
                onClose={close}
                className='modal-container'
                sx={{ width: 350 }}
            >
                <Typography variant='h6'>{title}</Typography>
                <p>{description}</p>
                <Button
                    variant='contained'
                    sx={{ mr: '1rem', mt: '1rem' }}
                    onClick={close}
                >
                    {btnText}
                </Button>
                <Button variant='outlined' sx={{ mt: '1rem' }} onClick={close}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};
