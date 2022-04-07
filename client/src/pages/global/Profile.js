import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import { UpdateUser, UpdateProfilePicture, SetEditOpen } from 'redux/user';
import { UpdateSite } from 'redux/admin';

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

export const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);
    const open = useSelector((state) => state.user.editOpen);
    const errors = useSelector((state) => state.user.editErrors);

    const [siteName, setSiteName] = useState(null);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState('');
    const [zip, setZip] = useState(null);
    const [province, setProvince] = useState(null);

    const [firstName, setFirstname] = useState(null);
    const [lastName, setLastname] = useState(null);

    const [image, setImage] = useState(null);

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

    const handleSubmitUser = (e) => {
        e.preventDefault();
        UpdateUser({ firstName, lastName });
    };

    const handleSubmitAdmin = (e) => {
        e.preventDefault();
        UpdateSite({
            name: siteName,
            address: { street, city, zip, province },
        });
    };

    useEffect(() => {
        if (image) UpdateProfilePicture(image);
    }, [image]);

    return (
        <>
            <section className='profile'>
                <div className='card container'>
                    <div className='col left'>
                        <div className='avatar-upload'>
                            {' '}
                            <Avatar
                                src={
                                    loading
                                        ? 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
                                        : `${process.env.REACT_APP_API_URL}/${user.avatar}`
                                }
                                alt={`${user.firstName} ${user.lastName}`}
                                sx={{
                                    fontSize: '4em',
                                    width: '2.5em',
                                    height: '2.5em',
                                }}
                            >
                                {user.firstName?.charAt(0)}{' '}
                                {user.lastName?.charAt(0)}
                            </Avatar>
                            <div className='overlay'>Change image</div>
                            <input
                                type='file'
                                className='upload-avatar'
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        <div className='block name'>
                            <h3>
                                {user?.firstName} {user?.lastName}
                            </h3>
                            {user.type === 1 ? (
                                <>
                                    {/* Edit Icon */}
                                    <IconButton
                                        onClick={() => {
                                            setSiteName(user?.site?.name);
                                            setStreet(
                                                user?.site?.address?.street
                                            );
                                            setCity(user?.site?.address.city);
                                            setZip(user?.site?.address?.zip);
                                            setProvince(
                                                user?.site?.address?.province
                                            );
                                            SetEditOpen(true);
                                        }}
                                        style={{ borderRadius: '50%' }}
                                    >
                                        <Edit
                                            syle={{ padding: '0.5em' }}
                                            color='primary'
                                        />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    {/* Edit Icon */}
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
                                            SetEditOpen(true);
                                        }}
                                    >
                                        <Edit color='primary' />
                                    </IconButton>
                                </>
                            )}
                        </div>
                        <div className='divider'></div>
                        <div className='block detail'>
                            <LocationOn color='primary' sx={{ mr: '1rem' }} />
                            <div style={{ display: 'flex' }}>
                                {user?.site?.name}
                                <br />
                                {user?.site?.address?.street}
                                <br />
                                {user?.site?.address?.city}
                                {', '}
                                {user?.site?.address.province}
                                {', '}
                                {user?.site?.address?.zip}
                            </div>
                        </div>
                        {user?.phone && (
                            <div className='block detail'>
                                <Phone color='primary' />
                                <p>{user.phone}</p>
                            </div>
                        )}
                        <div className='block detail'>
                            <Email color='primary' />
                            <p>{user?.email}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edit User Profile Modal */}
            <Modal open={open} onClose={() => SetEditOpen(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography sx={{ mb: '1.5rem' }} variant='h6'>
                        Edit User Profile
                    </Typography>
                    <form onSubmit={handleSubmitUser}>
                        <div className='edit-info'>
                            <TextField
                                value={firstName}
                                onChange={(e) => setFirstname(e.target.value)}
                                fullWidth
                                label='First Name'
                                placeholder='First Name'
                                sx={{ mb: '1rem' }}
                            />
                            <TextField
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
                                sx={{ mb: '1rem' }}
                                fullWidth
                                label='Last Name'
                                placeholder='Last Name'
                            />
                        </div>
                        {errors && <p className='error'>{errors}</p>}
                        <div>
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{ mr: '1rem' }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={() => SetEditOpen(false)}
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </Box>
            </Modal>

            {/* Edit Admin Site Details Modal */}
            <Modal open={open} onClose={() => SetEditOpen(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <form onSubmit={handleSubmitAdmin}>
                        <Typography sx={{ marginBottom: '0.5em' }} variant='h6'>
                            Edit Site Details
                        </Typography>
                        <Box
                            sx={{
                                '& .MuiTextField-root': {
                                    mb: '1rem',
                                },
                            }}
                        >
                            <div className='edit-info'>
                                <TextField
                                    value={siteName}
                                    onChange={(e) =>
                                        setSiteName(e.target.value)
                                    }
                                    label='Site Name'
                                    placeholder='Site Name'
                                    fullWidth
                                />
                                <TextField
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                    label='Street Address'
                                    placeholder='Street Address'
                                    fullWidth
                                />
                                <div
                                    style={{
                                        display: 'flex',
                                    }}
                                >
                                    <TextField
                                        sx={{
                                            mr: '0.9rem',
                                        }}
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
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
                                        placeholder='Province'
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
                            {errors && <p className='error'>{errors}</p>}
                            <div
                                className='edit-btn'
                                style={{
                                    marginTop: '1.5em',
                                }}
                            >
                                <Button type='submit' variant='contained'>
                                    Save
                                </Button>
                                <Button
                                    onClick={() => {
                                        SetEditOpen(false);
                                    }}
                                    style={{
                                        marginLeft: '1.5em',
                                    }}
                                    variant='outlined'
                                >
                                    Cancel
                                </Button>
                            </div>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

export default Profile;
