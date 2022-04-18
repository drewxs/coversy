import React, { useState } from 'react';
import moment from 'moment';
import { PostShift, UnpostShift, TakeShift } from 'redux/shift';
import { Button } from '@mui/material';
import { ConfirmationModal } from 'components';

export const UserShift = ({ idx, shift, setCurrent, setOpenView, btnText }) => {
    const [openConfirm, setOpenConfirm] = useState(false);

    return (
        <div className='shift-data card'>
            <div className='shift-info'>
                <h3>{shift?.subject}</h3>
                <p>
                    {moment(shift?.startTime).format('MMM D')}
                    {'\u00a0\u00a0\u00a0'}
                    {moment(shift?.startTime).format('h:mm')}
                    {' - '}
                    {moment(shift?.endTime).format('h:mm A')}
                </p>
            </div>

            {/* View Button */}
            <div className='view-button'>
                <Button
                    size='small'
                    onClick={() => {
                        setCurrent(idx);
                        setOpenView(true);
                    }}
                    variant='contained'
                    sx={{ mb: '0.5rem' }}
                >
                    View
                </Button>
                {/* Post, Unpost, Take Button*/}
                <Button
                    size='small'
                    onClick={() => {
                        setOpenConfirm(true);
                    }}
                    variant='contained'
                >
                    {btnText}
                </Button>

                {/* Confirmation Modal for Post Shift */}
                {btnText === 'Post' && (
                    <ConfirmationModal
                        modalFunction={() => PostShift(shift._id)}
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        title='Post Shift'
                        description='Are you sure you want to post this shift?'
                        btnText='Post'
                    ></ConfirmationModal>
                )}

                {/* Confirmation Modal for Unpost Shift */}
                {btnText === 'Unpost' && (
                    <ConfirmationModal
                        modalFunction={() => UnpostShift(shift._id)}
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        title='Unpost Shift'
                        description='Are you sure you want to unpost this shift?'
                        btnText='Unpost'
                    ></ConfirmationModal>
                )}

                {/* Confirmation Modal for Take Shift */}
                {btnText === 'Take' && (
                    <ConfirmationModal
                        modalFunction={() => TakeShift(shift._id)}
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                        title='Take Shift'
                        description='Are you sure you want to take this shift?'
                        btnText='Take'
                    ></ConfirmationModal>
                )}
            </div>
        </div>
    );
};
