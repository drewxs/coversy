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
    const tickets = [];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleResovle = () => {
        //set ticket.status to resovled
        setOpen(false);
    };

    return (
        <section className='dashboard'>
            <div className='container'>
                <div className='shift_table'>
                    <h2>Ticket Management</h2>
                </div>
                <Table className='table'>
                    <TableHead className='head'>
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
                    <TableBody className='body'>
                        {tickets?.map((ticket, k) => (
                            <TableRow key={ticket.id}>
                                <TableCell>
                                    {ticket.firstName} {ticket.lastName}
                                </TableCell>
                                <TableCell>{ticket.email}</TableCell>
                                <TableCell>{ticket.Phone}</TableCell>
                                <TableCell>{ticket.Type}</TableCell>
                                <TableCell>{ticket.description}</TableCell>
                                <TableCell>
                                    <Button onClick={handleOpen}>View</Button>
                                </TableCell>
                                <TableCell>{ticket.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Modal open={open} onClose={() => setOpen(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2>View</h2>
                        //this.ticket.xxx
                        <p>Name:</p>
                        <p>Type:</p>
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
            </div>
        </section>
    );
};
