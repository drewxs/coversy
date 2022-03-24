import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GetShifts } from 'redux/shift';
import PostedModal from 'components/UserPostedShiftModal';
import ShiftModal from 'components/UserShiftModal';

import {
    Box,
    Typography,
    Modal,
    Button,
    TextField,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
} from '@mui/material';
const localizer = momentLocalizer(moment);

const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
];

export const Shifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [description, setDescription] = useState('');
    const [openPost, setOpenPost] = useState(false);
    const [openShift, setOpenShift] = useState(false);
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
            <div className='container'>
                <div className='dash-container'>
                    {/* My Shift / Post Shift */}
                    <div className='left-container'>
                        <div className='option-container'>
                            <div className='shiftBox-container'>
                                <Button
                                    variant='variant'
                                    onClick={() => shiftView()}
                                    id='shift-box'
                                >
                                    My Shifts
                                </Button>
                            </div>

                            {/* Posted Shifts */}
                            <div className='postBox-container'>
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

                                        <FormControl fullWidth>
                                            <InputLabel id='demo-simple-select-label'>
                                                Select Shift
                                            </InputLabel>
                                            <Select label='Select Shift'>
                                                <MenuItem value={1}>A</MenuItem>
                                                <MenuItem value={1}>B</MenuItem>
                                                <MenuItem value={1}>C</MenuItem>
                                                <MenuItem value={1}>D</MenuItem>
                                            </Select>
                                        </FormControl>

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
                                <div>{openShift && <ShiftModal />}</div>{' '}
                                {/* My Shift View */}
                                <div>{openPost && <PostedModal />}</div>{' '}
                                {/* My Posted Shift View */}
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
            </div>
        </section>
    );
};
