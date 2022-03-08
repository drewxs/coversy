import React from 'react';
import { useSelector } from 'react-redux';
import { Avatar, IconButton } from '@mui/material';
import { Edit, LocationOn, Phone, Email } from '@mui/icons-material';
import { AdminProfile } from 'components';

export const Profile = () => {
    const user = useSelector((state) => state.userSlice.user);

    return (
        <section className='profile'>
            <div className='card container'>
                <div className='col left'>
                    <Avatar
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{
                            fontSize: '4em',
                            width: '2.5em',
                            height: '2.5em',
                        }}
                    >
                        {user.firstName?.charAt(0)} {user.lastName?.charAt(0)}
                    </Avatar>
                    <div className='block name'>
                        <h3>
                            {user?.firstName} {user?.lastName}
                        </h3>
                        <IconButton
                            sx={{
                                marginRight: '-1.5em',
                            }}
                        >
                            <Edit color='primary' />
                        </IconButton>
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
                    {user.type === 1 ? <AdminProfile /> : <></>}
                </div>
            </div>
        </section>
    );
};
