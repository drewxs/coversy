import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { GetShifts } from 'redux/shift';
import { useSelector } from 'react-redux';
import { UserShift } from 'components';
import {
    Box,
    Typography,
    Modal,
    Button,
    TextField,
    Tabs,
    Tab,
} from '@mui/material';
const localizer = momentLocalizer(moment);

export const Shifts = () => {
    const user = useSelector((state) => state.user.user);
    const shifts = useSelector((state) => state.shift.shifts);

    const [description, setDescription] = useState('');
    const [openbook, setOpenBook] = useState(false);
    const [openview, setOpenView] = useState(false);
    const [current, setCurrent] = useState(null);
    const [tab, setTab] = useState(0);

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
                            <Box
                                sx={{
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                }}
                            >
                                <Tabs
                                    value={tab}
                                    onChange={(e, v) => setTab(v)}
                                    textColor='primary'
                                    indicatorColor='primary'
                                >
                                    <Tab value={0} label='My Shifts' />
                                    <Tab value={1} label='Posted Shifts' />
                                </Tabs>
                            </Box>

                            {/* Tab - My Shifts */}
                            {tab === 0 && (
                                <>
                                    {/* Book Time Off Button */}
                                    <div className='timeoff-button'>
                                        <Button
                                            sx={{
                                                marginLeft: '1rem',
                                                marginTop: '1rem',
                                            }}
                                            variant='contained'
                                            onClick={() => setOpenBook(true)}
                                        >
                                            Book time off{' '}
                                        </Button>
                                    </div>
                                    <div className='shift-container'>
                                        {shifts
                                            ?.filter(
                                                (shift) =>
                                                    shift.teacher._id ===
                                                    user._id
                                            )
                                            .map((shift, k) => (
                                                <UserShift
                                                    key={k}
                                                    shift={shift}
                                                    setCurrent={setCurrent}
                                                    setOpenView={setOpenView}
                                                />
                                            ))}
                                    </div>
                                </>
                            )}

                            {/* Tab - Posted Shifts */}
                            {tab === 1 && (
                                <div className='shift-container'>
                                    {shifts
                                        ?.filter(
                                            (shift) =>
                                                shift.teacher._id ===
                                                    user._id && shift.posted
                                        )
                                        .map((shift, k) => (
                                            <UserShift
                                                key={k}
                                                shift={shift}
                                                setCurrent={setCurrent}
                                                setOpenView={setOpenView}
                                            />
                                        ))}
                                </div>
                            )}

                            {/* Modal - View Shift */}
                            {openview && (
                                <Modal
                                    open={openview}
                                    onClose={() => setOpenView(false)}
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
                                        <Typography
                                            sx={{ mb: '1rem' }}
                                            variant='h5'
                                        >
                                            View Shift
                                        </Typography>

                                        {/* Shift Info */}
                                        <div className='shift-info'>
                                            <p>
                                                <strong>Name: </strong>
                                                {current.teacher.firstName}
                                            </p>

                                            <p>
                                                <strong>Class: </strong>
                                                {current.subject}
                                            </p>

                                            <p>
                                                <strong>Date: </strong>
                                                {moment(
                                                    current.startTime
                                                ).format('MMMM DD, YYYY')}
                                            </p>

                                            <p>
                                                <strong>Start time: </strong>
                                                {moment(
                                                    current.startTime
                                                ).format('h:mm a')}
                                            </p>

                                            <p>
                                                <strong>End time: </strong>
                                                {moment(current.endTime).format(
                                                    'h:mm a'
                                                )}
                                            </p>

                                            <p className='shift-description'>
                                                {current.details}
                                            </p>
                                        </div>
                                    </Box>
                                </Modal>
                            )}
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
                            <Typography variant='h5'>Book Time Off</Typography>

                            {/* Select Shift for Time Off - Book Time Off Modal */}
                            {/* Description Box - Book Time Off Modal */}
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
                        events={shifts}
                        titleAccessor='subject'
                        startAccessor='startTime'
                        endAccessor='endTime'
                        views={['month', 'agenda']}
                        onSelectEvent={(event) => {
                            setCurrent(event);
                            setOpenView(true);
                        }}
                        style={{ height: 500, width: 850 }}
                    />
                </div>
            </div>
        </section>
    );
};
