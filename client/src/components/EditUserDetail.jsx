import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Modal,
    Button,
    Typography,
    TextField,
    IconButton,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const EditUserDetailModal = () => {
    const users = useSelector((state) => state.admin.users);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [open, setOpen] = useState(false);

    return (
        <div>
            <IconButton
                sx={{
                    '& .MuiTextField-root': {
                        m: '1rem',
                        width: '45ch',
                    },
                }}
                onClick={() => {
                    setFirstname(users.firstName);
                    setLastname(users.lastName);
                    setOpen(true);
                }}
            >
                <Edit color='primary' />
            </IconButton>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography sx={{ mb: '0.5em' }} variant='h6'>
                        Edit User Profile
                    </Typography>
                    <Typography sx={{ mt: '1rem' }}>
                        <form>
                            <div className='edit-info'>
                                <TextField
                                    fullWidth
                                    label='First Name'
                                    placeholder='First Name'
                                    sx={{ mb: '1rem' }}
                                />
                                <TextField
                                    sx={{ mb: '1rem' }}
                                    fullWidth
                                    label='Last Name'
                                    placeholder='Last Name'
                                />
                            </div>

                            <div className='edit-btn'>
                                <Button
                                    sx={{ mr: '1rem' }}
                                    onClick={() => setOpen(false)}
                                    variant='contained'
                                >
                                    Submit
                                </Button>
                                <Button
                                    onClick={() => setOpen(false)}
                                    variant='outlined'
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default EditUserDetailModal;
