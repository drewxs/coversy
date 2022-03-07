import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import 'react-calendar/dist/Calendar.css';
import { LogoutUser } from 'redux/user';
import { Calendar } from 'react-calendar';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import Papa from 'papaparse';

// Update to use date objects
const createData = (name, startTime, endTime) => {
    return { name, startTime, endTime };
};

// Update to use date objects
const rows = [
    createData('John doe', new Date(), new Date()),
    createData('Jane Doe', new Date(), new Date()),
];

export const DashboardAdmin = () => {
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
            <section className='nav'>
                <div className='container'>
                    <h2>Coversy</h2>
                    <div className='button-cont'>
                        <Button
                            variant='outlined'
                            className='button logout-btn'
                            onClick={() => {
                                <Navigate to='/login' />;
                                LogoutUser();
                            }}
                        >
                            Logout
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            href='/DashboardAdmin'
                            className='button'
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant='outlined'
                            className='button logout-btn'
                            onClick={() => {
                                <Navigate to='/PayrollAdmin' />;
                            }}
                        >
                            Payroll
                        </Button>
                    </div>
                </div>
            </section>
            <div className='container'>
                <div className='col left'>
                    <Calendar onChange={setValue} value={value} />
                    <div className='upload_btn'>
                        <Button variant='contained'>Upload Schedule</Button>
                    </div>
                    <>
                        <input
                            type='file'
                            accept='.csv'
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </>
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
                                        {row.shiftdate}
                                    </TableCell>
                                    <TableCell align='right'>
                                        {row.shifttime}
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
