import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch,
} from '@mui/material';
// import { Box, Tab, TabContext, TabList, TabPanel } from '@mui/material';
import { FetchUsers, ToggleUserActivatedById } from 'redux/admin';

export const AdminUsers = () => {
    const users = useSelector((state) => state.admin.users);
    const admin = useSelector((state) => state.user.user);

    useEffect(() => {
        if (admin.site._id) FetchUsers(admin.site._id);
    }, [admin]);

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell> </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Activation</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((user, k) => (
                                <TableRow key={k}>
                                    <TableCell>{k + 1}</TableCell>
                                    <TableCell>
                                        {user.firstName} {user.lastName}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={user.activated}
                                            onClick={() =>
                                                ToggleUserActivatedById(
                                                    user._id,
                                                    admin.site._id
                                                )
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </>
    );
};
