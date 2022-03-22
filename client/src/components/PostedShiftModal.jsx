import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Modal, Button, TextField } from '@mui/material';
import { GetShifts } from 'redux/shift';

const PostedModal = () => {
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
                                <Typography sx={{ mb: 3 }} variant='h5'>
                                    View Shift
                                </Typography>
                                <div className='posted-info'>
                                    {'Date: Jan 25, 2022 '}
                                    <br></br>
                                    {shifts[current]?.teacher.firstName}{' '}
                                    {shifts[current]?.teacher.lastName}
                                    <br></br>
                                    {/* {'  Start time: '}
                                                        {
                                                            shifts[current]
                                                                ?.teacher
                                                                .startTime
                                                        }
                                                        <br></br>
                                                        {' End time: '}
                                                        {
                                                            shifts[current]
                                                                ?.teacher
                                                                .endTime
                                                        } */}
                                    <br></br>
                                    <TextField
                                        sx={{ mt: '1em' }}
                                        label='Description'
                                    ></TextField>
                                </div>
                            </Box>
                        </Modal>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PostedModal;
