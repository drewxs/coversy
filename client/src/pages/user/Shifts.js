import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GetShifts } from 'redux/shift';
import {
    Box,
    Typography,
    Modal,
    Button,
    TextField,
    Select,
} from '@mui/material';
const localizer = momentLocalizer(moment);

const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
];

export const Shifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [description, setDescription] = useState('');
    const [openpost, setOpenPost] = useState(false);
    const [openview, setOpenView] = useState(false);
    const [openbook, setOpenBook] = useState(false);
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        GetShifts();
    }, []);

    return (
        <section className='dashboard-shifts'>
            <div className='container'>
                <div className='dash-container'>
                    {/* My Shift / Post Shift */}
                    <div className='left-container'>
                        <div className='option-container'>
                            <div className='shiftBox-container'>
                                <Button variant='variant' id='shift-box'>
                                    My Shifts
                                </Button>
                            </div>

                            {/* Posted Shifts */}
                            <div className='postBox-container'>
                                <Button
                                    className='btn btn-select'
                                    variant='text'
                                    id='post-box'
                                    onClick={() => setOpenPost(true)}
                                >
                                    Posted Shift
                                </Button>
                            </div>
                        </div>

                        {/* Book Time Off Button */}
                        <div className='displayText'>
                            <div className='btn-book-time'>
                                <Button
                                    sx={{ mb: 2 }}
                                    variant='contained'
                                    onClick={() => setOpenBook(true)}
                                >
                                    Book time off
                                </Button>
                            </div>

                            {/* My Shift Example */}
                            <div className='shift-container'>
                                <div className='shifts'>
                                    <div className='shift-data'>
                                        <p>Science - Jane</p>
                                        <p>12 PM - 1PM</p>
                                    </div>

                                    <div className='view-button'>
                                        <Button
                                            onClick={() => setOpenView(true)}
                                            variant='contained'
                                        >
                                            View
                                        </Button>
                                    </div>

                                    {/* Modal - View Shift */}
                                    {openview ? (
                                        <Modal
                                            open={openview}
                                            onClose={() => setOpenView(false)}
                                        >
                                            <Box
                                                sx={{
                                                    position: 'absolute',
                                                    top: '50%',
                                                    left: '50%',
                                                    transform:
                                                        'translate(-50%, -50%)',
                                                    width: 400,
                                                    bgcolor: 'background.paper',
                                                    boxShadow: 24,
                                                    p: 4,
                                                }}
                                            >
                                                <Typography
                                                    sx={{ mb: 3 }}
                                                    variant='h5'
                                                >
                                                    View Shift
                                                </Typography>
                                                <div className='shift-info'>
                                                    {'Date: Jan 25, 2022 '}
                                                    <br></br>

                                                    {
                                                        shifts[current]?.teacher
                                                            .firstName
                                                    }
                                                    {
                                                        shifts[current]?.teacher
                                                            .lastName
                                                    }
                                                    <br></br>
                                                    {'  Start time: '}
                                                    {
                                                        shifts[current]?.teacher
                                                            .startTime
                                                    }
                                                    <br></br>
                                                    {' End time: '}
                                                    {
                                                        shifts[current]?.teacher
                                                            .endTime
                                                    }

                                                    <br></br>
                                                    <TextField label='Description'></TextField>
                                                </div>
                                            </Box>
                                        </Modal>
                                    ) : null}
                                </div>
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

                    {/* Modal - Book Time Off */}
                    <Modal open={openbook} onClose={() => setOpenBook(false)}>
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
                            <Typography variant='h5'>Book Time Off</Typography>

                            {/* Select Shift for Time Off - Book Time Off Modal */}
                            <TextField>
                                className='input-form' variant='outlined'
                                label='Select Shift'
                            </TextField>

                            <TextField
                                className='input-form'
                                variant='outlined'
                                label='Description'
                                fullWidth
                                sx={{ mt: '0.5rem' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
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
                </div>
            </div>
        </section>
    );
};

// testing pull requets with new branch
