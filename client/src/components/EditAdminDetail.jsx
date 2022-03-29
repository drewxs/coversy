import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Modal,
    Button,
    Typography,
    TextField,
    IconButton,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

export const EditAdminDetailModal = () => {
    const admin = useSelector((state) => state.user.user);
    const [open, setOpen] = useState(false);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState(null);
    const [zip, setZip] = useState(null);
    const [province, setProvince] = useState(null);

    return (
        <div>
            <IconButton
                sx={{
                    marginRight: '-4em',
                }}
                onClick={() => {
                    setStreet(admin.street);
                    setCity(admin.city);
                    setZip(admin.zip);
                    setProvince(admin.province);
                    setOpen(true);
                }}
            >
                <Edit color='primary' />
            </IconButton>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography sx={{ marginBottom: '0.5em' }} variant='h6'>
                        Edit Admin Profile
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <Box
                            sx={{
                                '& .MuiTextField-root': {
                                    mb: '1rem',
                                    width: '45ch',
                                },
                            }}
                        >
                            <form>
                                <div className='edit-info'>
                                    <TextField
                                        value={street}
                                        onChange={(e) =>
                                            setStreet(e.target.value)
                                        }
                                        fullWidth
                                        label='Street'
                                        placeholder='Street'
                                    />
                                    <TextField
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        fullWidth
                                        label='Zip Code'
                                        placeholder='Zip Code'
                                    />
                                    <TextField
                                        value={city}
                                        onChange={(e) =>
                                            setCity(e.target.value)
                                        }
                                        fullWidth
                                        label='City'
                                        placeholder='City'
                                    />
                                    <FormControl fullWidth>
                                        <InputLabel label='Province'>
                                            Province
                                        </InputLabel>
                                        <Select
                                            onChange={(e) =>
                                                setProvince(e.target.value)
                                            }
                                            value={province}
                                            label='Province'
                                        >
                                            <MenuItem value={'AB'}>
                                                Alberta
                                            </MenuItem>

                                            <MenuItem value={'BC'}>
                                                British Columbia
                                            </MenuItem>

                                            <MenuItem value={'MB'}>
                                                Manitoba
                                            </MenuItem>

                                            <MenuItem value={'NB'}>
                                                New Brunswick
                                            </MenuItem>

                                            <MenuItem value={'NL'}>
                                                Newfoundland and Labrador
                                            </MenuItem>

                                            <MenuItem value={'NS'}>
                                                Nova Scotia
                                            </MenuItem>

                                            <MenuItem value={'NT'}>
                                                Northwest Territories
                                            </MenuItem>

                                            <MenuItem value={'NU'}>
                                                Nunavut
                                            </MenuItem>

                                            <MenuItem value={'ON'}>
                                                Ontario
                                            </MenuItem>

                                            <MenuItem value={'PE'}>
                                                Prince Edward Island
                                            </MenuItem>

                                            <MenuItem value={'QC'}>
                                                Quebec
                                            </MenuItem>

                                            <MenuItem value={'SK'}>
                                                Saskatchewan
                                            </MenuItem>

                                            <MenuItem value={'YT'}>
                                                Yukon
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>

                                <div
                                    className='edit-btn'
                                    style={{ marginTop: '1.5em' }}
                                >
                                    <Button
                                        onClick={() => setOpen(false)}
                                        variant='contained'
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={() => setOpen(false)}
                                        style={{ marginLeft: '1.5em' }}
                                        variant='outlined'
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </Box>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};
