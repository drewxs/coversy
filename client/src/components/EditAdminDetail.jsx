import { useState } from 'react';
import {
    Backdrop,
    Box,
    Modal,
    Fade,
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

const EditAdminDetailModal = () => {
    const [open, setOpen] = useState(false);
    const [province, setProvince] = useState('');
    const handleChange = (event) => {
        setProvince(event.target.value);
    };

    return (
        <div>
            <IconButton
                sx={{
                    marginRight: '-4em',
                }}
                onClick={() => setOpen(true)}
            >
                <Edit color='primary' />
            </IconButton>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ width: 400 }}>
                    <Typography
                        sx={{ marginBottom: '0.5em' }}
                        variant='h6'
                        component='h2'
                    >
                        Edit Admin Profile
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <form>
                            <div className='edit-info'>
                                <TextField
                                    fullWidth
                                    label='Street'
                                    placeholder='Street'
                                />
                                <TextField
                                    fullWidth
                                    label='Zip Code'
                                    placeholder='Zip Code'
                                    multiline
                                />
                                <TextField
                                    fullWidth
                                    label='City'
                                    placeholder='City'
                                />
                                <FormControl fullWidth>
                                    <InputLabel label='Province'>
                                        Province
                                    </InputLabel>
                                    <Select
                                        fullWidth
                                        value={province}
                                        label='Province'
                                        onChange={handleChange}
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

                                        <MenuItem value={'QC'}>Quebec</MenuItem>

                                        <MenuItem value={'SK'}>
                                            Saskatchewan
                                        </MenuItem>

                                        <MenuItem value={'YT'}>Yukon</MenuItem>
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
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default EditAdminDetailModal;
