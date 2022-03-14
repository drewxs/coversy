import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetShifts, AddShift } from 'redux/shift';
import Time from 'react-pure-time';
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
} from '@mui/material';
import Papa from 'papaparse';

export const AdminShifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const user = useSelector((state) => state.user.user);

    const [open, setOpen] = useState(false);
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
                        onClick={() => setOpen(true)}
                    >
                        Upload Schedule
                    </Button>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Teacher</TableCell>
                                <TableCell>Shift Date</TableCell>
                                <TableCell>Shift Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {shifts.map((shift) => (
                                <TableRow key={shift._id}>
                                    <TableCell>
                                        {shift.teacher.firstName}{' '}
                                        {shift.teacher.lastName}
                                    </TableCell>
                                    <TableCell>
                                        <Time
                                            value={shift.startTime}
                                            format='M d, Y'
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Time
                                            value={shift.endTime}
                                            format='M d, Y'
                                        />
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
        </>
    );
};
