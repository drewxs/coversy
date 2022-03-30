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
    const user = useSelector((state) => state.user.user);

    const [open, setOpen] = useState(false);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState('');
    const [zip, setZip] = useState(null);
    const [province, setProvince] = useState(null);

    const provinces = [
        { code: 'AB', name: 'Alberta' },
        { code: 'BC', name: 'British Columbia' },
        { code: 'MB', name: 'Manitoba' },
        { code: 'NB', name: 'New Brunswick' },
        { code: 'NL', name: 'Newfoundland and Labrador' },
        { code: 'NS', name: 'Nova Scotia' },
        { code: 'NT', name: 'Northwest Territories' },
        { code: 'NU', name: 'Nunavut' },
        { code: 'ON', name: 'Ontario' },
        { code: 'PE', name: 'Prince Edward Island' },
        { code: 'QC', name: 'Quebec' },
        { code: 'SK', name: 'Saskatchewan' },
        { code: 'YT', name: 'Yukon' },
    ];

    return (
        <>
            <IconButton
                onClick={() => {
                    setStreet(user?.site?.address?.street);
                    setCity(user?.site?.address.city);
                    setZip(user?.site?.address?.zip);
                    setProvince(user?.site?.address?.province);
                }}
                style={{ borderRadius: '50%' }}
            >
                <Edit
                    syle={{ padding: '0.5em' }}
                    color='primary'
                    onClick={() => {
                        setOpen(true);
                    }}
                />
            </IconButton>

            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography sx={{ marginBottom: '0.5em' }} variant='h6'>
                        Edit Site Details
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <Box sx={{ '& .MuiTextField-root': { mb: '1rem' } }}>
                            <form>
                                <div className='edit-info'>
                                    <TextField
                                        value={street}
                                        onChange={(e) =>
                                            setStreet(e.target.value)
                                        }
                                        label='Address'
                                        placeholder='Address'
                                        fullWidth
                                    />
                                    <div style={{ display: 'flex' }}>
                                        <TextField
                                            sx={{ mr: '0.9rem' }}
                                            value={zip}
                                            onChange={(e) =>
                                                setZip(e.target.value)
                                            }
                                            fullWidth
                                            label='Postal Code'
                                            placeholder='Postal Code'
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
                                    </div>

                                    <FormControl fullWidth>
                                        <InputLabel>Province</InputLabel>
                                        <Select
                                            className='input'
                                            value={province}
                                            label='Province'
                                            onChange={(e) =>
                                                setProvince(e.target.value)
                                            }
                                        >
                                            {provinces.map((province) => (
                                                <MenuItem
                                                    value={province.code}
                                                    key={province.code}
                                                >
                                                    {province.name}
                                                </MenuItem>
                                            ))}
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
        </>
    );
};
