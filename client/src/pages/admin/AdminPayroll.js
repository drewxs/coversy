import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Table,
    Modal,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    withStyles,
} from '@mui/material';

export const AdminPayroll = () => {
    const report = [
        {
            name: 'John Doe',
            payAmt: '2500',
            hours: '50',
            payPeriod: 'Feb 12 - Mar 12 (2022)',
            payDate: 'Mar 12, 2022',
            taxRate: '3.5%',
        },
        {
            name: 'John Doe',
            payAmt: '1800',
            hours: '40',
            payPeriod: 'Feb 12 - Mar 12 (2022)',
            payDate: 'Mar 12, 2022',
            taxRate: '3.5%',
        },
    ];

    const [open, setOpen] = React.useState(false);
    const [current, setCurrent] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCurrent(null);
        setOpen(false);
    };

    const handleResovle = () => {
        setOpen(false);
    };

    return (
        <section className='dashboard payroll'>
            <div className='container'>
                {/* Main title and Report button */}
                <div className='mainDash-container'>
                    <div className='title-container'>
                        <h1>Payroll Management</h1>
                        <button>View Report</button>
                    </div>

                    {/* column payroll report */}
                    <div className='body-container'>
                        {/* title */}
                        <div className='title-body'>
                            <h2>Payroll Report</h2>
                        </div>
                        {/* column */}
                        <div className='column-report'>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Pay Amt</TableCell>
                                        <TableCell>Hours</TableCell>
                                        <TableCell>Pay Period</TableCell>
                                        <TableCell>Pay Date</TableCell>
                                        <TableCell>Tax Rate</TableCell>
                                        <TableCell>Edit</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {report?.map((row, r) => (
                                        <TableRow key={r}>
                                            <TableCell>{row.name}</TableCell>
                                            <TableCell>{row.payAmt}</TableCell>
                                            <TableCell>{row.hours}</TableCell>
                                            <TableCell>
                                                {row.payPeriod}
                                            </TableCell>
                                            <TableCell>{row.payDate}</TableCell>
                                            <TableCell>{row.taxRate}</TableCell>
                                            <TableCell>
                                                <button
                                                    onClick={() => {
                                                        handleOpen();
                                                        setCurrent(r);
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                    <Modal open={open} onClose={() => setOpen(false)}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '40%',
                                left: '40%',
                                width: 300,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <h2>Edit Payroll</h2>
                            <p>Hours </p>
                            <TextField placeholder='50'></TextField>
                            <br />
                            <Button onClick={() => handleResovle()}>
                                Save
                            </Button>
                            <Button onClick={() => handleClose()}>
                                Cancel
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </div>
        </section>
    );
};
