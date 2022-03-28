import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Table,
    Modal,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tab,
    Tabs,
    CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
import {
    GetUnresolvedTickets,
    GetResolvedTickets,
    ResolveTicket,
    UnresolveTicket,
} from 'redux/ticket';

// test

export const AdminTickets = () => {
    const tickets = useSelector((state) => state.ticket.tickets);
    const resolvedTickets = useSelector(
        (state) => state.ticket.resolvedTickets
    );
    const loading = useSelector((state) => state.ticket.loading);
    const loadingResolved = useSelector(
        (state) => state.ticket.loadingResolved
    );

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState({});
    const handleOpen = () => setOpen(true);
    const handleResolve = (ticket) => {
        if (ticket.resolved) {
            UnresolveTicket(ticket);
        } else {
            ResolveTicket(ticket);
        }
    };

    const [tabValue, setTabValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(() => {
        GetUnresolvedTickets();
    }, []);

    useEffect(() => {
        if (tabValue === 1) GetResolvedTickets();
    }, [tabValue]);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleChange}>
                            <Tab label='Unresolved' value={0} />
                            <Tab label='Resolved' value={1} />
                        </Tabs>
                    </Box>
                    {tabValue === 0 && (
                        <>
                            {loading ? (
                                <CircularProgress />
                            ) : (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tickets.map((ticket, k) => (
                                            <TableRow key={k}>
                                                <TableCell>
                                                    {ticket.user.firstName}{' '}
                                                    {ticket.user.lastName}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.user.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.type === 1 &&
                                                        'Payroll Issue'}
                                                    {ticket.type === 2 &&
                                                        'Time-off Issue'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => {
                                                            handleOpen();
                                                            setCurrent(ticket);
                                                        }}
                                                    >
                                                        Review
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
                    {tabValue === 1 && (
                        <>
                            {loadingResolved ? (
                                <CircularProgress />
                            ) : (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {resolvedTickets.map((ticket, k) => (
                                            <TableRow key={k}>
                                                <TableCell>
                                                    {ticket.user.firstName}{' '}
                                                    {ticket.user.lastName}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.user.email}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.user.phone}
                                                </TableCell>
                                                <TableCell>
                                                    {ticket.type === 1 &&
                                                        'Payroll Issue'}
                                                    {ticket.type === 2 &&
                                                        'Time-off Issue'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => {
                                                            handleOpen();
                                                            setCurrent(ticket);
                                                        }}
                                                    >
                                                        Review
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </>
                    )}
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
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2>View</h2>

                    <p>
                        Type: {current.type === 1 && 'Payroll Issue'}
                        {current.type === 2 && 'Time-off Issue'}
                    </p>
                    <p> {current.message} </p>
                    <br />
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => {
                            handleResolve(current);
                            setOpen(false)();
                        }}
                    >
                        {current.resolved ? (
                            <p>Set Unresolved</p>
                        ) : (
                            <p>Set Resolved</p>
                        )}
                    </Button>
                    <Button onClick={() => setOpen(false)()}>Cancel</Button>
                </Box>
            </Modal>
        </>
    );
};
