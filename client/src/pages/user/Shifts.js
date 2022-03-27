import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GetShifts } from 'redux/shift';
import PostedView from 'components/UserPostedShiftView';
import ShiftView from 'components/UserShiftView';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { Box, Typography, Modal, Button, TextField, Tab } from '@mui/material';
const localizer = momentLocalizer(moment);

// Figure out how to make events show in the calendar

const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
];

export const Shifts = () => {
    const [description, setDescription] = useState('');
    const [openbook, setOpenBook] = useState(false);
    const [value, setValue] = React.useState('1');

    const handleChange = (event1, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        GetShifts();
    }, []);

    return (
        <section className='dashboard shifts'>
            <div className='container'>
                <div className='shift-col card'>
                    <div className='tab-container'>
                        {/*{/* My Shift / Posted Shift Tabs */}
                        <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                                <Box
                                    sx={{
                                        borderBottom: 1,
                                        borderColor: 'divider',
                                    }}
                                >
                                    <TabList centered onChange={handleChange}>
                                        <Tab label='My Shifts' value='1' />
                                        <Tab label='Posted Shifts' value='2' />
                                    </TabList>
                                </Box>

                                <TabPanel className='shift-tab' value='1'>
                                    {/*The Shift View*/}
                                    {/* Book Time Off Button */}

                                    <div className='timeoff-button'>
                                        <Button
                                            sx={{
                                                mb: '1rem',
                                                ml: '1rem',
                                            }}
                                            variant='contained'
                                            onClick={() => setOpenBook(true)}
                                        >
                                            Book time off{' '}
                                        </Button>
                                    </div>
                                    <ShiftView />
                                </TabPanel>
                                <TabPanel value='2'>
                                    {/*The Posted Shift View*/}
                                    <PostedView />
                                </TabPanel>
                            </TabContext>
                        </Box>
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
                            <TextField
                                className='input-form'
                                variant='outlined'
                                label='Description'
                                fullWidth
                                sx={{ mt: '1rem' }}
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
                {/* Calendar View */}
                <div className='calendar card'>
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
