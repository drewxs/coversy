import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    Divider,
    LinearProgress,
    Modal,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';

import {
    GetUnresolvedTickets,
    GetResolvedTickets,
    ResolveTicket,
    UnresolveTicket,
} from 'redux/ticket';

export const AdminTickets = () => {
    const tickets = useSelector((state) => state.ticket.tickets);
    const loading = useSelector((state) => state.ticket.loading);
    const resolvedTickets = useSelector(
        (state) => state.ticket.resolvedTickets
    );
    const loadingResolved = useSelector(
        (state) => state.ticket.loadingResolved
    );

    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const [tab, setTab] = useState(0);

    const handleResolve = (ticket) => {
        ticket.resolved
            ? UnresolveTicket(ticket._id)
            : ResolveTicket(ticket._id);
    };

    useEffect(() => {
        GetUnresolvedTickets();
    }, []);

    useEffect(() => {
        if (tab === 1) GetResolvedTickets();
    }, [tab]);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tab} onChange={(__e, v) => setTab(v)}>
                            <Tab label='Unresolved' value={0} />
                            <Tab label='Resolved' value={1} />
                        </Tabs>
                    </Box>
                    {tab === 0 && (
                        <>
                            {loading ? (
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            ) : (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>View</TableCell>
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
                                                        'Time-off Request'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant='contained'
                                                        onClick={() => {
                                                            setOpen(true);
                                                            setCurrent(k);
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
                    {tab === 1 && (
                        <>
                            {loadingResolved ? (
                                <Box sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            ) : (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>View</TableCell>
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
                                                        'Time-off Request'}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant='contained'
                                                        onClick={() => {
                                                            setOpen(true);
                                                            setCurrent(k);
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
                <Box className='modal-container' sx={{ width: 400 }}>
                    {tab === 0 && (
                        <>
                            <Typography sx={{ mb: '1rem' }} variant='h6'>
                                Review Issue
                            </Typography>
                            <p>
                                <strong>Name:</strong>{' '}
                                {tickets[current]?.user.firstName}{' '}
                                {tickets[current]?.user.lastName}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                {tickets[current]?.user.email}
                            </p>
                            <p>
                                <strong>Phone:</strong>{' '}
                                {tickets[current]?.user.phone}
                            </p>
                            <p>
                                <strong>Type:</strong>{' '}
                                {tickets[current]?.type === 1 &&
                                    'Payroll Issue'}
                                {tickets[current]?.type === 2 &&
                                    'Time-off Request'}
                            </p>
                            <Divider
                                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                            ></Divider>
                            <p>
                                <strong>Description:</strong>
                            </p>
                            <p>{tickets[current]?.message}</p>
                            <br />
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    handleResolve(tickets[current]);
                                    setOpen(false);
                                }}
                                sx={{ marginRight: '1rem' }}
                            >
                                Resolve
                            </Button>
                            <Button
                                onClick={() => setOpen(false)}
                                variant='outlined'
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                    {tab === 1 && (
                        <>
                            <Typography variant='h6'>Review</Typography>
                            <p>
                                <strong>Name:</strong>{' '}
                                {resolvedTickets[current]?.user.firstName}{' '}
                                {resolvedTickets[current]?.user.lastName}
                            </p>
                            <p>
                                <strong>Email:</strong>{' '}
                                {resolvedTickets[current]?.user.email}
                            </p>
                            <p>
                                <strong>Phone:</strong>{' '}
                                {resolvedTickets[current]?.user.phone}
                            </p>
                            <p>
                                <strong>Type:</strong>{' '}
                                {resolvedTickets[current]?.type === 1 &&
                                    'Payroll Issue'}
                                {resolvedTickets[current]?.type === 2 &&
                                    'Time-off Request'}
                            </p>
                            <Divider
                                sx={{ marginTop: '1rem', marginBottom: '1rem' }}
                            ></Divider>
                            <p>
                                <strong>Description:</strong>
                            </p>
                            <p>{resolvedTickets[current]?.message}</p>
                            <br />
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={() => {
                                    handleResolve(resolvedTickets[current]);
                                    setOpen(false);
                                }}
                                sx={{ marginRight: '1rem' }}
                            >
                                Unresolve
                            </Button>
                            <Button
                                onClick={() => setOpen(false)}
                                variant='outlined'
                                sx={{ ml: '1rem' }}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};
