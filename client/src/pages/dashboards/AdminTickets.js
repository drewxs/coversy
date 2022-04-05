import { useEffect, useState } from 'react';
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
    Divider,
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
        ticket.resolved ? UnresolveTicket(ticket) : ResolveTicket(ticket);
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
                                <CircularProgress />
                            ) : (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Issue Type</TableCell>
                                            <TableCell>View Issue</TableCell>
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
                                <CircularProgress />
                            ) : (
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Phone</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>View Issue</TableCell>
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
                            <p>
                                Name: {tickets[current]?.user.firstName}{' '}
                                {tickets[current]?.user.lastName}
                            </p>
                            <p>Email: {tickets[current]?.user.email}</p>
                            <p>Phone: {tickets[current]?.user.phone}</p>
                            <p>
                                Type:{' '}
                                {tickets[current]?.type === 1 &&
                                    'Payroll Issue'}
                                {tickets[current]?.type === 2 &&
                                    'Time-off Issue'}
                            </p>
                            <Divider></Divider>
                            <br />
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
                                sx={{ ml: '1rem' }}
                            >
                                Cancel
                            </Button>
                        </>
                    )}
                    {tab === 1 && (
                        <>
                            <p>
                                Name: {resolvedTickets[current]?.user.firstName}{' '}
                                {resolvedTickets[current]?.user.lastName}
                            </p>
                            <p>Email: {resolvedTickets[current]?.user.email}</p>
                            <p>Phone: {resolvedTickets[current]?.user.phone}</p>
                            <p>
                                Type:{' '}
                                {resolvedTickets[current]?.type === 1 &&
                                    'Payroll Issue'}
                                {resolvedTickets[current]?.type === 2 &&
                                    'Time-off Issue'}
                            </p>
                            <Divider></Divider>
                            <br />
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
