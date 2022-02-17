import React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
} from "@mui/material";
import { Box, Tab, TabContext, TabList, TabPanel } from "@mui/material";

export const AdminProfile = () => {
    const users = [
        {
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@gmail.com",
            activated: false,
        },
        {
            firstName: "Bob",
            lastName: "Doe",
            email: "bobdoe@gmail.com",
            activated: false,
        },
        {
            firstName: "Robert",
            lastName: "Doe",
            email: "robdoe@gmail.com",
            activated: false,
        },
        {
            firstName: "Foo",
            lastName: "Bar",
            email: "foobar@gmail.com",
            activated: true,
        },
        {
            firstName: "Bar",
            lastName: "Foo",
            email: "barfoo@gmail.com",
            activated: false,
        },
        {
            firstName: "Foo",
            lastName: "Foo",
            email: "foofoo@gmail.com",
            activated: true,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
        {
            firstName: "Bar",
            lastName: "Bar",
            email: "bar@gmail.com",
            activated: false,
        },
    ];
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className="admin-profile">
            User Activation
            <h2>Users</h2>
            <div className="table-cont">
                <Table className="table" stickyHeader>
                    <TableHead className="tablehead">
                        <TableRow>
                            <TableCell> </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Activation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user, k) => (
                            <TableRow key={k}>
                                <TableCell>{k + 1}</TableCell>
                                <TableCell>
                                    {user.firstName} {user.lastName}
                                </TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Switch checked={user.activated} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
