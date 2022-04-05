import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetShifts, AddShift } from 'redux/shift';
import { FetchUsers } from 'redux/admin';
import {
    Box,
    Typography,
    Modal,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import Papa from 'papaparse';
import moment from 'moment';
import MobileDateTimePicker from '@mui/lab';

export const AdminShifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);

    const [open, setOpen] = useState(false);
    const [openadd, setOpenadd] = useState(false);
    const [file, setFile] = useState();
    // const [date, setDate] = useState(new Date());

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

    const handleAddShift = () => {};

    const [user, setUser] = useState('');
    const [subject, setSubject] = useState(null);
    const [shiftstartTime, setshiftstartTime] = useState(null);
    const [shiftendTime, setshiftendTime] = useState(null);

    const users = useSelector((state) => state.admin.users);
    const admin = useSelector((state) => state.user.user);

    useEffect(() => {
        GetShifts();
    }, []);

    useEffect(() => {
        if (admin.site._id) FetchUsers(admin.site._id);
    }, [admin]);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Button
                        sx={{ mb: 2 }}
                        variant='contained'
                        onClick={() => setOpen(true)}
                    >
                        Upload Schedule
                    </Button>
                    <Button
                        sx={{ mb: 2 }}
                        variant='contained'
                        onClick={() => setOpenadd(true)}
                    >
                        ADD
                    </Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject</TableCell>
                                <TableCell>Teacher</TableCell>
                                <TableCell>Shift Date</TableCell>
                                <TableCell>Shift Time</TableCell>
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
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
            {/* Upload Schedule Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
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
                    <Typography variant='h6'>Upload Schedule</Typography>
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
            // ADD Shift Modal
            <Modal open={openadd} onClose={() => setOpenadd(false)}>
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
                    <Typography variant='h6'>Add a shift</Typography>
                    <form>
                        <FormControl fullWidth>
                            <InputLabel>User</InputLabel>
                            <Select
                                className='input'
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            >
                                {users?.map((user, k) => (
                                    <MenuItem value={user._id} key={k}>
                                        {user.Firstname}
                                        {user.LastName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            fullWidth
                            label='Subject'
                            placeholder='Subject'
                        />
                        <MobileDateTimePicker
                            label='Start Time'
                            value={shiftstartTime}
                            onChange={(e) => setshiftstartTime(e.target.value)}
                        />
                        <MobileDateTimePicker
                            label='End Time'
                            value={shiftendTime}
                            onChange={(e) => setshiftendTime(e.target.value)}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{ mt: '1rem' }}
                            onClick={() => handleAddShift()}
                        >
                            Add
                        </Button>
                        <Button
                            sx={{ mt: '1rem' }}
                            variant='outlined'
                            onClick={() => setOpenadd(false)}
                        >
                            Cancel
                        </Button>
                    </form>
                </Box>
            </Modal>
        </>
    );
};
