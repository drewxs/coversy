import React from 'react';
import moment from 'moment';
import { PostShift } from 'redux/shift';
import { Button } from '@mui/material';

export const UserShift = ({ shift, setCurrent, setOpenView, btnText }) => {
    return (
        <div className='shift-data card'>
            <div className='shift-info'>
                <h3>
                    {shift.subject} - {shift.teacher.firstName}
                </h3>
                <p>
                    {moment(shift.startTime).format('MMM D')}
                    {'\u00a0\u00a0\u00a0'}
                    {moment(shift.startTime).format('h:mm')}
                    {' - '}
                    {moment(shift.endTime).format('h:mm A')}
                </p>
            </div>

            {/* View Button */}
            <div className='view-button'>
                <Button
                    size='small'
                    onClick={() => {
                        setCurrent(shift);
                        setOpenView(true);
                    }}
                    variant='contained'
                    sx={{ mb: '0.5rem' }}
                >
                    View
                </Button>
                <Button
                    size='small'
                    onClick={() => PostShift(shift._id)}
                    variant='contained'
                >
                    {btnText}
                </Button>
            </div>
        </div>
    );
};
