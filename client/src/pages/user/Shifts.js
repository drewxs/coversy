import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { GetShifts, TakeShift } from 'redux/shift';
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

    const [description, setDescription] = useState(null);
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
                        <Tabs
                            value={tab}
                            onChange={(e, v) => setTab(v)}
                            textColor='primary'
                            indicatorColor='primary'
                            className='tab-header'
                        >
                            <Tab value={0} label='My Shifts' />
                            <Tab value={1} label='Posted Shifts' />
                        </Tabs>

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
                                        onClick={() => {
                                            setDescription(user.description);
                                            setOpenBook(true);
                                        }}
                                    >
                                        Book time off{' '}
                                    </Button>
                                </div>
                                <div className='shift-container'>
                                    {shifts
                                        .slice()
                                        ?.filter(
                                            (shift) =>
                                                shift.teacher._id ===
                                                    user._id && !shift.posted
                                        )
                                        .map((shift, k) => (
                                            <UserShift
                                                key={k}
                                                shift={shift}
                                                setCurrent={setCurrent}
                                                setOpenView={setOpenView}
                                                btnText={'Post'}
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
                                            shift.teacher._id === user._id &&
                                            shift.posted
                                    )
                                    .map((shift, k) => (
                                        <UserShift
                                            shift={shift}
                                            key={k}
                                            setCurrent={setCurrent}
                                            setOpenView={setOpenView}
                                            btnText={'Unpost'}
                                        />
                                    ))}
                            </div>
                        )}
                    </div>

                    {/* Modal - View Shift */}
                    {openview && (
                        <Modal
                            open={openview}
                            onClose={() => setOpenView(false)}
                        >
                            <Box
                                className='modal-container'
                                sx={{ width: 400 }}
                            >
                                <Typography sx={{ mb: '1rem' }} variant='h5'>
                                    {current.subject}
                                </Typography>

                                {/* Shift Info */}
                                <div className='shift-info'>
                                    <p>
                                        <strong>Date: </strong>
                                        {moment(current.startTime).format(
                                            'MMMM DD, YYYY'
                                        )}
                                    </p>

                                    <p>
                                        <strong>Time: </strong>
                                        {moment(current.startTime).format(
                                            'h:mm a'
                                        )}{' '}
                                        -{' '}
                                        {moment(current.endTime).format(
                                            'h:mm a'
                                        )}
                                    </p>
                                    <p className='shift-description'>
                                        {current.details}
                                    </p>
                                    <br></br>
                                    {/* Upload Docments*/}
                                    <p>
                                        <strong>Add Documents</strong>
                                    </p>
                                    <input type='file' accept='.docx' />
                                    {current.teacher._id !== user._id && (
                                        <Button
                                            sx={{ marginTop: '1rem' }}
                                            variant='contained'
                                            onClick={() => {
                                                TakeShift(current._id);
                                                setOpenView(false);
                                            }}
                                        >
                                            Take Shift
                                        </Button>
                                    )}
                                </div>
                            </Box>
                        </Modal>
                    )}

                    {/* Modal - Book Time Off */}
                    <Modal open={openbook} onClose={() => setOpenBook(false)}>
                        <Box className='modal-container' sx={{ width: 400 }}>
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
                                onClick={() => setOpenBook(false)}
                            >
                                Book
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                sx={{ mt: '1rem', ml: '1rem' }}
                                onClick={() => setOpenBook(false)}
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
                            setDescription(user.description);
                            setOpenView(true);
                        }}
                        style={{ height: '100%', width: '100%' }}
                    />
                </div>
            </div>
        </section>
    );
};
