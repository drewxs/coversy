import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetShifts } from 'redux/shift';
import { Errors } from 'components';
import {
    AddShift,
    EditShift,
    FetchUsers,
    SetOpenShiftUpload,
    SetOpenEditShift,
} from 'redux/admin';
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
    InputLabel,
    MenuItem,
} from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import { FileUploader } from 'react-drag-drop-files';
import Papa from 'papaparse';
import moment from 'moment';

export const AdminShifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const users = useSelector((state) => state.admin.users);
    const admin = useSelector((state) => state.user.user);
    const errors = useSelector((state) => state.admin.errors);

    const openEditShift = useSelector((state) => state.admin.openEditShift);
    const openShiftUpload = useSelector((state) => state.admin.openShiftUpload);

    const shiftCount = useSelector((state) => state.admin.shiftCount);
    const shiftErrorCount = useSelector((state) => state.admin.shiftErrorCount);

    const [file, setFile] = useState();

    const [shiftId, setShiftId] = useState('');
    const [subject, setSubject] = useState('');
    const [teacher, setTeacher] = useState('');
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const handleSave = (e) => {
        e.preventDefault();
        EditShift({ _id: shiftId, subject, teacher, startTime, endTime });
    };

    useEffect(() => {
        if (admin.site._id) FetchUsers(admin.site._id);
    }, [admin]);

    /**
     * Handles CSV file upload, parses CSV file, and adds all parsed shifts
     */
    const handleUpload = () => {
        if (!file) return;
        Papa.parse(file, {
            header: true,
            complete: (res) => {
                for (let i = 0; i < res.data.length - 1; i++) {
                    AddShift(res.data[i]);
                }
            },
        });
    };

    useEffect(() => {
        GetShifts();
    }, []);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Button
                        sx={{ mb: 2 }}
                        variant='contained'
                        onClick={() => SetOpenShiftUpload(true)}
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
                            {shifts?.map((shift) => (
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
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                setShiftId(shift._id);
                                                setSubject(shift.subject);
                                                setTeacher(shift.teacher._id);
                                                setStartTime(
                                                    new Date(shift.startTime)
                                                );
                                                setEndTime(
                                                    new Date(shift.endTime)
                                                );
                                                SetOpenEditShift(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Upload Schedule Modal */}
            <Modal
                open={openShiftUpload}
                onClose={() => SetOpenShiftUpload(false)}
            >
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography variant='h6' sx={{ mb: '1rem' }}>
                        Upload Schedule
                    </Typography>
                    <FileUploader
                        classes='file-uploader'
                        handleChange={(e) => setFile(e)}
                        name='file'
                        types={['CSV']}
                    />
                    {(shiftCount > 0 || shiftErrorCount > 0) && (
                        <Box sx={{ display: 'flex', mt: '1rem' }}>
                            <Typography
                                variant='body1'
                                sx={{ marginRight: '1rem' }}
                            >
                                {shiftCount} Successes
                            </Typography>
                            <Typography variant='body1' className='error'>
                                {shiftErrorCount} Failures
                            </Typography>
                        </Box>
                    )}
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ mt: '1.5rem' }}
                        onClick={() => handleUpload()}
                    >
                        Upload
                    </Button>
                </Box>
            </Modal>

            {/* Edit Shift Modal */}
            <Modal open={openEditShift} onClose={() => SetOpenEditShift(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography variant='h6' sx={{ mb: '1rem' }}>
                        Edit User Shifts
                    </Typography>
                    <Box sx={{ '& .MuiTextField-root': { mb: '1rem' } }}>
                        <form onSubmit={handleSave}>
                            {/* Subject Field */}
                            <TextField
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                label='Subject'
                                placeholder='Subject'
                                fullWidth
                            ></TextField>

                            {/* Teacher Field */}
                            <InputLabel>Teacher</InputLabel>
                            <Select
                                sx={{ mb: '1rem' }}
                                placeholder='Teacher'
                                fullWidth
                                value={teacher}
                                onChange={(e) => setTeacher(e.target.value)}
                            >
                                {users?.map((user, k) => (
                                    <MenuItem value={user._id} key={k}>
                                        {user.firstName} {user.lastName}
                                    </MenuItem>
                                ))}
                            </Select>

                            {/* Date Time Pickers */}
                            <InputLabel>Start Time</InputLabel>
                            <DateTimePicker
                                monthPlaceholder='mm'
                                dayPlaceholder='dd'
                                yearPlaceholder='yyyy'
                                hourPlaceholder='hh'
                                minutePlaceholder='mm'
                                value={startTime}
                                onChange={setStartTime}
                            />
                            <InputLabel sx={{ mt: '1rem' }}>
                                End Time
                            </InputLabel>
                            <DateTimePicker
                                monthPlaceholder='mm'
                                dayPlaceholder='dd'
                                yearPlaceholder='yyyy'
                                hourPlaceholder='hh'
                                minutePlaceholder='mm'
                                value={endTime}
                                onChange={setEndTime}
                            />
                            <Box sx={{ mb: '1rem' }} />
                            <Errors errors={errors} />

                            {/* Save/Cancel Buttons */}
                            <div>
                                <Button
                                    sx={{ mr: '1rem', mt: '1.5rem' }}
                                    variant='contained'
                                    type='submit'
                                >
                                    Save
                                </Button>
                                <Button
                                    sx={{ mt: '1.5rem' }}
                                    variant='outlined'
                                    onClick={() => SetOpenEditShift(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
