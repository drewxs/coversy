import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetShifts, AddShift } from 'redux/shift';
// import { Calendar } from 'react-calendar';
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

export const DashboardAdmin = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState();

    /**
     * @description Handles CSV file upload, parses CSV file, and adds all parsed shifts
     */
    const handleUpload = () => {
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        AddShift(res.data[i], res.data[i].siteId);
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
        <section className='dashboard'>
            <div className='container'>
                <div className='col left'>
                    {/* <Calendar onChange={setValue} value={value} /> */}
                    <div className='upload_btn'>
                        <Button
                            variant='contained'
                            onClick={() => setOpen(true)}
                        >
                            Upload Schedule
                        </Button>
                    </div>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                border: '2px solid #000',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <Typography variant='h6' component='h2'>
                                Upload Schedule
                            </Typography>
                            <Typography sx={{ mt: 2 }}>
                                <input
                                    type='file'
                                    accept='.csv'
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </Typography>
                            <br />
                            <Button
                                variant='outlined'
                                color='primary'
                                onClick={() => handleUpload()}
                            >
                                Upload
                            </Button>
                        </Box>
                    </Modal>
                </div>
                <div className='col right'>
                    <div className='shift_table'>
                        <h2>Shift</h2>
                    </div>
                    <Table className='table'>
                        <TableHead className='table__head'>
                            <TableRow>
                                <TableCell>Teacher</TableCell>
                                <TableCell align='right'>Shift Date</TableCell>
                                <TableCell align='right'>Shift Time</TableCell>
                                <TableCell align='right'>Site</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table__body'>
                            {shifts.map((shift) => (
                                <TableRow key={shift._id}>
                                    <TableCell scope='row'>
                                        {shift.teacher}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Time
                                            value={shift.startTime}
                                            format='M d, Y'
                                        />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Time
                                            value={shift.endTime}
                                            format='M d, Y'
                                        />
                                    </TableCell>
                                    <TableCell align='right'>
                                        {shift.site}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
};
