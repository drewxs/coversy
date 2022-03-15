import React from 'react';
import {
    Backdrop,
    Box,
    Modal,
    Fade,
    Button,
    Typography,
    TextField,
    IconButton,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    height: 350,
    display: 'flex',
    flexDirection: 'column',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: '0.5em',
    p: 4,
};

const style1 = {
    marginBottom: '1em',
};

export const EditUserDetailModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <IconButton
                sx={{
                    marginRight: '-4em',
                }}
                onClick={handleOpen}
            >
                <Edit color='primary' />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id='transition-modal-title'
                            sx={{ marginBottom: '0.5em' }}
                            variant='h6'
                            component='h2'
                        >
                            Edit User Profile
                        </Typography>
                        <Typography
                            id='transition-modal-description'
                            sx={{ mt: 2 }}
                        >
                            <form>
                                <div className='edit-info'>
                                    <TextField
                                        style={style1}
                                        id='outlined-textarea'
                                        label='First Name'
                                        placeholder='First Name'
                                        multiline
                                    />
                                    <TextField
                                        style={style1}
                                        id='outlined-textarea'
                                        label='Last Name'
                                        placeholder='Last Name'
                                        multiline
                                    />
                                </div>

                                <div
                                    className='edit-btn'
                                    style={{ marginTop: '1em' }}
                                >
                                    <Button
                                        onClick={handleClose}
                                        variant='contained'
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={handleClose}
                                        style={{ marginLeft: '1em' }}
                                        variant='outlined'
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Typography>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default EditUserDetailModal;
