import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GetShifts } from 'redux/shift';
import PostedView from 'components/UserPostedShiftView';
import ShiftView from 'components/UserShiftView';

import { Box, Typography, Modal, Button, TextField } from '@mui/material';
const localizer = momentLocalizer(moment);

const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
];

export const Shifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [description, setDescription] = useState('');
    const [openPost, setOpenPost] = useState(false);
    const [openShift, setOpenShift] = useState(true);
    const [openview, setOpenView] = useState(false);
    const [openbook, setOpenBook] = useState(false);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        GetShifts();
    }, []);

    const postedView = () => {
        setOpenPost(true);
        setOpenShift(false);
    };

    const shiftView = () => {
        setOpenPost(false);
        setOpenShift(true);
    };

    return (
        <section className='dashboard shifts'>
            <div className='container dash-container'>
                {/* My Shift / Post Shift */}
                <div className='left-container'>
                    <div className='option-container'>
                        <div className='shift-tab-container'>
                            <Button
                                variant='contained'
                                onClick={() => shiftView()}
                                id='shift-box'
                            >
                                My Shifts
                            </Button>
                        </div>

                        {/* Posted Shifts */}
                        <div className='post-tab-container'>
                            <Button
                                className='btn btn-select'
                                variant='text'
                                id='post-box'
                                onClick={() => postedView()}
                            >
                                Posted Shift
                            </Button>
                        </div>
                    </div>

                    {/* Book Time Off Button */}
                    <div className='displayText'>
                        <div className='shift-data'>
                            <div className='btn-book-time'>
                                <Button
                                    sx={{ mb: '0.5rem' }}
                                    variant='contained'
                                    onClick={() => setOpenBook(true)}
                                >
                                    Book time off
                                </Button>
                            </div>
                            {/* Modal - Book Time Off */}
                            <Modal
                                open={openbook}
                                onClose={() => setOpenBook(false)}
                            >
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        width: 400,
                                        bgcolor: 'background.paper',
                                        boxShadow: 24,
                                        p: 4,
                                    }}
                                >
                                    {/* Description Box - Book Time Off Modal */}
                                    <Typography variant='h5'>
                                        Book Time Off
                                    </Typography>

                                    {/* Select Shift for Time Off - Book Time Off Modal */}
                                    <TextField
                                        className='input-form'
                                        variant='outlined'
                                        label='Description'
                                        fullWidth
                                        sx={{ mt: '1rem' }}
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                    {/* Book and Cancel Buttons - Book Time Off Modal */}
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        sx={{ mt: '1rem' }}
                                        onClick={(e) => setOpenBook(false)}
                                    >
                                        Book
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        color='primary'
                                        sx={{ mt: '1rem', ml: '1rem' }}
                                        onClick={(e) => setOpenBook(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Modal>
                            <div>{openShift && <ShiftView />}</div>{' '}
                            {/* My Shift View */}
                            <div>{openPost && <PostedView />}</div>{' '}
                            {/* My Posted Shift View */}{' '}
                        </div>
                    </div>
                </div>
                {/* Calendar View */}
                <div className='calendar'>
                    <Calendar
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor='startTime'
                        endAccessor='endTime'
                        onSelectEvent={(event) =>
                            alert(event.title, event.description)
                        }
                        style={{ height: 500, width: 850 }}
                    />
                </div>
            </div>
        </section>
    );
};
