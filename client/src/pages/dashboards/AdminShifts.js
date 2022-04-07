import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
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
    Select,
    MenuItem,
} from '@mui/material';
import Papa from 'papaparse';
import moment from 'moment';

export const AdminShifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const subjects = useSelector((state) => state.subject);
    const [openShiftEdit, setOpenShiftEdit] = useState(false);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState();
    const [subject, setSubject] = useState(null);
    const [teacher, setTeacher] = useState(null);
    const [startTime, setStartTime] = useState(new Date());

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
                                        {/* Edit Shift Modal Button */}
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                setSubject(shift.subject);
                                                setTeacher(
                                                    shift.teacher.firstName
                                                );

                                                setOpenShiftEdit(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {/* Edit Shift Details Modal */}
                        <Modal
                            open={openShiftEdit}
                            onClose={() => setOpenShiftEdit(false)}
                        >
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
                                    <Select
                                        sx={{ mb: '1rem' }}
                                        label='Subject'
                                        placeholder='Subject'
                                        fullWidth
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                    >
                                        {shifts.map((shift) => (
                                            <MenuItem
                                                value={subjects}
                                                key={shift._id}
                                            ></MenuItem>
                                        ))}
                                    </Select>
                                    <TextField
                                        value={teacher}
                                        onChange={(e) =>
                                            setTeacher(e.target.value)
                                        }
                                        label='Teacher'
                                        placeholder='Teacher'
                                        fullWidth
                                    ></TextField>
                                    <div
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                        }}
                                    >
                                        <DatePicker
                                            calendarAriaLabel='Toggle calendar'
                                            clearAriaLabel='Clear value'
                                            dayAriaLabel='Day'
                                            monthAriaLabel='Month'
                                            nativeInputAriaLabel='Date'
                                            onChange={(e) =>
                                                setStartTime(e.target.value)
                                            }
                                            value={startTime}
                                            yearAriaLabel='Year'
                                        />
                                        <TimePicker
                                            amPmAriaLabel='Select AM/PM'
                                            clearAriaLabel='Clear value'
                                            clockAriaLabel='Toggle clock'
                                            hourAriaLabel='Hour'
                                            maxDetail='second'
                                            minuteAriaLabel='Minute'
                                            nativeInputAriaLabel='Time'
                                            onChange={(e) =>
                                                setStartTime(e.target.value)
                                            }
                                            secondAriaLabel='Second'
                                            value={shifts.startTime}
                                        />
                                    </div>
                                    <Button
                                        sx={{ mr: '1rem', mt: '1rem' }}
                                        variant='contained'
                                        onClick={() => setOpenShiftEdit(false)}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        sx={{ mt: '1rem' }}
                                        variant='outlined'
                                        onClick={() => setOpenShiftEdit(false)}
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
