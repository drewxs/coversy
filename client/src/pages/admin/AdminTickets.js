import React from 'react';
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

export const AdminTickets = () => {
    const tickets = [
        {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
            Phone: '000000000',
            type: 1,
            message: 'this is a test',
            resolved: false,
        },
        {
            firstName: 'test',
            lastName: 'test',
            email: 'test@test.com',
            Phone: '000000000',
            type: 2,
            message: 'this is a test',
            resolved: true,
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
        //set ticket.status to resovled
        setOpen(false);
    };

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Table>
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
                            {tickets?.map((ticket, k) => (
                                <TableRow key={k}>
                                    <TableCell>
                                        {ticket.firstName} {ticket.lastName}
                                    </TableCell>
                                    <TableCell>{ticket.email}</TableCell>
                                    <TableCell>{ticket.Phone}</TableCell>
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
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <h2>View</h2>
                    <p>Name: </p>
                    <p>
                        Type: {tickets[current]?.type === 1 && 'Payroll Issue'}
                        {tickets[current]?.type === 2 && 'Time-off Issue'}
                    </p>
                    <p>Description</p>
                    <br />
                    <Button
                        variant='outlined'
                        color='primary'
                        onClick={() => handleResovle()}
                    >
                        Resovle
                    </Button>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                </Box>
            </Modal>
        </>
    );
};
