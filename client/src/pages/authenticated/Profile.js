import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { LocationOn, Phone, Email } from '@mui/icons-material';
import EditUserDetailModal from 'components/EditUserDetail';
import EditAdminDetailModal from 'components/EditAdminDetail';
import axios from 'axios';

export const Profile = () => {
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading);

    const [image, setImage] = useState(null);

    useEffect(() => {
        if (image && user) {
            const formData = new FormData();
            formData.append('avatar', image);
            axios
                .put(
                    `http://localhost:5000/api/user/${user._id}/updatepicture`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'auth-token': localStorage.getItem('auth-token'),
                        },
                    }
                )
                .then((res) => {
                    console.log(res.data);
                });
        }
    }, [image, user]);

    return (
        <section className='profile'>
            <div className='card container'>
                <div className='col left'>
                    <div className='avatar-upload'>
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
                        <div className='overlay'></div>
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
                            <EditAdminDetailModal />
                        ) : (
                            <EditUserDetailModal />
                        )}
                    </div>
                    <div className='divider'></div>
                    <div className='block detail'>
                        <LocationOn color='primary' />
                        <p>{user?.site?.name}</p>
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
                <div className='col right'>
                    {user.type === 1 ? <></> : <></>}
                </div>
            </div>
        </section>
    );
};

export default Profile;
