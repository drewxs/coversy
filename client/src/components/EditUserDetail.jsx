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

export const EditUserDetailModal = () => {
    const user = useSelector((state) => state.user.user);

    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [open, setOpen] = useState(false);

    return (
        <>
            <IconButton
                sx={{
                    '& .MuiTextField-root': {
                        m: '1rem',
                        width: '100%',
                    },
                }}
                onClick={() => {
                    setFirstname(user.firstName);
                    setLastname(user.lastName);
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
                                    value={firstname}
                                    onChange={(e) =>
                                        setFirstname(e.target.value)
                                    }
                                    fullWidth
                                    label='First Name'
                                    placeholder='First Name'
                                    sx={{ mb: '1rem' }}
                                />
                                <TextField
                                    value={lastname}
                                    onChange={(e) =>
                                        setLastname(e.target.value)
                                    }
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
        </>
    );
};
