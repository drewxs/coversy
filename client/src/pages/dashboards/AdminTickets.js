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
    const [current, setCurrent] = useState({});
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
                                                            setOpen(true);
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
                                                            setOpen(true);
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
                <Box className='modal-container' sx={{ width: 400 }}>
                    <h3>Type: {current.type === 1 && 'Payroll Issue'}</h3>
                    <p>{current.type === 2 && 'Time-off Issue'}</p>
                    <p>{current.message}</p>
                    <br />
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={() => {
                            handleResolve(current);
                            setOpen(false);
                        }}
                        sx={{ marginRight: '1rem' }}
                    >
                        {current.resolved ? <p>Unresolve</p> : <p>Resolve</p>}
                    </Button>
                    <Button
                        onClick={() => setOpen(false)}
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
