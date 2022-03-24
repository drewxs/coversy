import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Modal, Button, TextField } from '@mui/material';
import { GetShifts } from 'redux/shift';
import moment from 'moment';

const PostedView = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [current, setCurrent] = useState(0);
    const [openview, setOpenView] = useState(false);
    const [openposted, setOpenPosted] = useState(false);
    useEffect(() => {
        GetShifts();
    }, []);
    return (
        <div className='shift-data'>
            {/* My Posted Shift Example */}
            <div className='posted-container'>
                <div className='posted'>
                    <div className='posted-data'>
                        <p>Math - {shifts[current]?.teacher.firstName}</p>
                        <p>
                            {moment(shifts[current].startTime).format('h:mm a')}
                            {' - '}

                            {moment(shifts[current].endTime).format('h:mm a')}
                        </p>
                    </div>

                    <div className='view-button'>
                        <Button
                            onClick={() => setOpenView(true)}
                            variant='contained'
                        >
                            View
                        </Button>
                    </div>

                    {/* Modal - Posted Shift */}
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
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4,
                                }}
                            >
                                <Typography sx={{ mb: '1rem' }} variant='h5'>
                                    View Shift
                                </Typography>

                                {/* Shift Info */}
                                <div className='shift-info'>
                                    <p>
                                        <strong>Name: </strong>
                                        {shifts[current].teacher.firstName}
                                    </p>

                                    <p>
                                        <strong>Class: </strong>
                                        Science
                                    </p>

                                    <p>
                                        <strong>Date: </strong>
                                        {moment(
                                            shifts[current].startTime
                                        ).format('MMMM DD, YYYY')}
                                    </p>

                                    <p>
                                        <strong>Start time: </strong>
                                        {moment(
                                            shifts[current].startTime
                                        ).format('h:mm a')}
                                    </p>

                                    <p>
                                        <strong>End time: </strong>
                                        {moment(shifts[current].endTime).format(
                                            'h:mm a'
                                        )}
                                    </p>

                                    <p className='shift-description'>
                                        This is the description.
                                    </p>
                                </div>
                            </Box>
                        </Modal>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PostedView;
