import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import { GetSitePayrolls } from 'redux/payroll';

export const AdminPayroll = () => {
    const payrolls = useSelector((state) => state.payroll.payrolls);

    useEffect(() => {
        GetSitePayrolls();
    }, []);

    const [open, setOpen] = React.useState(false);
    const [current, setCurrent] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCurrent(null);
        setOpen(false);
    };

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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {payrolls?.map((payroll, k) => (
                                <TableRow key={k}>
                                    <TableCell>{payroll.period}</TableCell>
                                    <TableCell>{payroll.pay}</TableCell>
                                    <TableCell>{payroll.deductions}</TableCell>
                                    <TableCell>{payroll.netPay}</TableCell>
                                    <TableCell>
                                        <Button>View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
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
                </Box>
            </Modal>
        </>
    );
};
