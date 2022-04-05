import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetShifts, AddShift } from 'redux/shift';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Box,
    Typography,
    Modal,
    TextField,
} from '@mui/material';
import Papa from 'papaparse';
import moment from 'moment';

export const AdminShifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [open1, setOpen1] = useState(false);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [subject, setSubject] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    /**
     * Handles CSV file upload, parses CSV file, and adds all parsed shifts
     */
    const handleUpload = () => {
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (res) => {
                    for (let i = 0; i < res.data.length - 1; i++) {
                        AddShift(res.data[i]);
                    }

                    setOpen(false);
                },
            });
        }
    };

    useEffect(() => {
        GetShifts();
    }, []);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    {/* Upload Schedule Modal */}
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box
                            className='modal-container'
                            sx={{
                                width: 400,
                            }}
                        >
                            <Typography variant='h6'>
                                Upload Schedule
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <input
                                    type='file'
                                    accept='.csv'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Typography>
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ mt: 3 }}
                                onClick={() => handleUpload()}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Modal>

                    <Button
                        sx={{ mb: 2 }}
                        variant='contained'
                        onClick={() => setOpen(true)}
                    >
                        Upload Schedule
                    </Button>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell>Shift Date</TableCell>
                                <TableCell>Shift Time</TableCell>
                                <TableCell>Edit Shift</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shifts.map((shift) => (
                                <TableRow key={shift._id}>
                                    <TableCell>{shift.subject}</TableCell>
                                    <TableCell>
                                        {shift.teacher.firstName}{' '}
                                        {shift.teacher.lastName}
                                    </TableCell>
                                    <TableCell>
                                        {moment(shift.startTime).format(
                                            'MMM D, Y'
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {moment(shift.startTime).format('h:mm')}
                                        {' - '}
                                        {moment(shift.endTime).format('h:mm A')}
                                    </TableCell>
                                    <TableCell>
                                        {/* Edit Shift Modal */}
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                setSubject(shift.subject);
                                                setTeacher(
                                                    shift.teacher.firstName
                                                );
                                                setStartTime(shift.startTime);
                                                setOpen1(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {/* Edit Shift Modal */}
                        <Modal open={open1} onClose={() => setOpen1(false)}>
                            <Box
                                className='modal-container'
                                sx={{ width: 400 }}
                            >
                                <Typography variant='h6' sx={{ mb: '1rem' }}>
                                    Edit User Shifts
                                </Typography>
                                <Box
                                    sx={{
                                        '& .MuiTextField-root': {
                                            mb: '1rem',
                                        },
                                    }}
                                >
                                    <TextField
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                        label='Subject'
                                        placeholder='Subject'
                                        fullWidth
                                    ></TextField>
                                    <TextField
                                        value={teacher}
                                        onChange={(e) =>
                                            setTeacher(e.target.value)
                                        }
                                        label='Teacher'
                                        placeholder='Teacher'
                                        fullWidth
                                    ></TextField>
                                    <TextField
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(
                                                moment(e.target.value).format(
                                                    'MMMM d, YYYY'
                                                )
                                            )
                                        }
                                        label='Shift Date'
                                        placeholder='Shift Date'
                                        fullWidth
                                    ></TextField>
                                    <TextField
                                        value={startTime}
                                        onChange={(e) => {
                                            moment(
                                                setStartTime(
                                                    moment(
                                                        shifts?.startTime
                                                    ).format('MMM D, Y')
                                                )
                                            );
                                        }}
                                        label='Shift Time'
                                        placeholder='Shift Time'
                                        fullWidth
                                    ></TextField>
                                    <Button
                                        sx={{ mr: '1rem' }}
                                        variant='contained'
                                        onClick={() => setOpen1(false)}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant='outlined'
                                        onClick={() => setOpen1(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Table>
                </div>
            </section>
        </>
    );
};
