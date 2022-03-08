import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Calendar } from 'react-calendar';
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

// Update to use date objects
const createData = (name, startTime, endTime, classname) => {
    return { name, startTime, endTime, classname };
};
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
// Update to use date objects
const rows = [
    createData('John doe', new Date(), new Date(), 'Gym'),
    createData('Jane Doe', new Date(), new Date(), 'Math'),
];

export const DashboardAdmin = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = useState(new Date());
    const [file, setFile] = useState();

    useEffect(() => {
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (res) => {
                    console.log(res.data);
                },
            });
        }
    }, [file]);

    return (
        <section className='dashboard'>
            <div className='container'>
                <div className='col left'>
                    <Calendar onChange={setValue} value={value} />
                    <div className='upload_btn'>
                        <Button
                            variant='contained'
                            className='btnFullWidth'
                            onClick={handleOpen}
                        >
                            Upload Schedule
                        </Button>
                    </div>
                    <Modal open={open} onClose={handleClose}>
                        <Box sx={style}>
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
                                <TableCell>Name</TableCell>
                                <TableCell align='right'>Shift Date</TableCell>
                                <TableCell align='right'>Shift Time</TableCell>
                                <TableCell align='right'>Class</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className='table__body'>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell scope='row'>
                                        {row.name}
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Time
                                            value={row.startTime}
                                            format='M d, Y'
                                        />
                                    </TableCell>
                                    <TableCell align='right'>
                                        <Time
                                            value={row.endTime}
                                            format='M d, Y'
                                        />
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.classname}
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
