import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import logo from '../assets/Logo.png';
import {
    Box,
    Typography,
    Modal,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

const myticket = [{}];

export const DashboardTicket = () => {
    return (
        <section className='dashboard'>
            <div className='container'>
                <div className='shift_table'>
                    <h2>Ticket Management</h2>
                </div>
                <Table className='table'>
                    <TableHead className='table_head'>
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
                    <TableBody className='table_body'>
                        {users?.map((user, k) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.Phone}</TableCell>
                                <TableCell>{user.description}</TableCell>
                                <TableCell>
                                    <Button>View</Button>
                                </TableCell>
                                <TableCell>{user.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>
    );
};
