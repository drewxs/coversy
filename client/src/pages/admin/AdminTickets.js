import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Table,
    Modal,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
    GetUnresolvedTickets,
    GetResolvedTickets,
    AddTicket,
    ResolveTicket,
    UnresolveTicket,
} from 'redux/ticket';

// test

export const AdminTickets = () => {
    const tickets = useSelector((state) => state.ticket.tickets);
    const [open, setOpen] = React.useState(false);
    const [current, setCurrent] = React.useState(null);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCurrent(null);
        setOpen(false);
    };

    const handleResovle = () => {
        //set ticket.status to resovled
        setOpen(false);
    };

    useEffect(() => {
        GetUnresolvedTickets();
    }, []);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>View</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket, k) => (
                                <TableRow key={k}>
                                    <TableCell>
                                        {ticket.user.firstName}{' '}
                                        {ticket.user.lastName}
                                    </TableCell>
                                    <TableCell>{ticket.user.email}</TableCell>
                                    <TableCell>{ticket.user.phone}</TableCell>
                                    <TableCell>
                                        {ticket.type === 1 && 'Payroll Issue'}
                                        {ticket.type === 2 && 'Time-off Issue'}
                                    </TableCell>
                                    <TableCell>{ticket.message}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                handleOpen();
                                                setCurrent(k);
                                            }}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        {ticket.resolved
                                            ? 'Resolved'
                                            : 'Unresolved'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>

            {/* Ticket Modal */}
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 25,
                        p: 4,
                    }}
                >
                    <h2>View</h2>

                    <p>
                        <strong>Name: </strong>
                    </p>
                    <p>
                        <strong>Type: </strong>
                        {tickets[current]?.type === 1 && 'Payroll Issue'}
                        {tickets[current]?.type === 2 && 'Time-off Issue'}
                    </p>
                    <p>
                        <strong>Description: </strong>
                    </p>
                    <br />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => handleResovle()}
                    >
                        Resovle
                    </Button>
                    <Button
                        onClick={() => handleClose()}
                        variant='outlined'
                        sx={{ ml: '1rem' }}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
