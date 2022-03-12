import React from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

export const AdminTickets = () => {
    const tickets = [];

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
                                <TableCell>{ticket.description}</TableCell>
                                <TableCell>
                                    <Button>View</Button>
                                </TableCell>
                                <TableCell>{ticket.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};
