import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Modal,
    Box,
    Typography,
    TextField,
} from '@mui/material';
import { GetUserPayrolls } from 'redux/payroll';

export const Payroll = () => {
    const payrolls = useSelector((state) => state.payroll.payrolls);
    const [openReport, setOpenReport] = useState(false);
    const [description, setDescription] = useState(null);

    useEffect(() => {
        GetUserPayrolls();
    }, []);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Period</TableCell>
                                <TableCell>Pay</TableCell>
                                <TableCell>Deductions</TableCell>
                                <TableCell>Net Pay</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Report Issue</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payrolls?.map((payroll, k) => (
                                <TableRow key={k}>
                                    <TableCell>{payroll.period}</TableCell>
                                    <TableCell>
                                        ${payroll.pay?.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        ${payroll.deductions?.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        ${payroll.netPay?.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='outlined'
                                            href={`/payroll/report/${payroll.period}`}
                                        >
                                            View
                                        </Button>
                                    </TableCell>

                                    {/* Report Button */}
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            onClick={() => setOpenReport(true)}
                                        >
                                            Report
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Modal - Report Payroll Issue */}
                    <Modal
                        open={openReport}
                        onClose={() => setOpenReport(false)}
                    >
                        <Box className='modal-container' sx={{ width: 400 }}>
                            <Typography variant='h5'>
                                Report Payroll Issue
                            </Typography>

                            <TextField
                                className='input-form'
                                variant='outlined'
                                label='Description'
                                multiline
                                rows={4}
                                fullWidth
                                sx={{ mt: '1rem' }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {/* Book and Cancel Buttons - Book Time Off Modal */}
                            <Button
                                variant='contained'
                                color='primary'
                                sx={{ mt: '1rem' }}
                                onClick={() => setOpenReport(false)}
                            >
                                Report
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                sx={{ mt: '1rem', ml: '1rem' }}
                                onClick={() => setOpenReport(false)}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Modal>
                </div>
            </section>
        </>
    );
};
