import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Switch,
    Button,
    Box,
    Typography,
    Modal,
    TextField,
} from '@mui/material';
// import { Box, Tab, TabContext, TabList, TabPanel } from '@mui/material';
import { FetchUsers, ToggleUserActivatedById } from 'redux/admin';

export const AdminUsers = () => {
    const users = useSelector((state) => state.admin.users);
    const admin = useSelector((state) => state.user.user);
    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [hourlyrate, setHourlyrate] = useState(null);
    const [taxrate, setTaxrate] = useState(null);

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
                                <TableCell>Hourly Rate</TableCell>
                                <TableCell>Tax Rate (%)</TableCell>
                                <TableCell>Activation</TableCell>
                                <TableCell>Edit User</TableCell>
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
                                    <TableCell>{user.hourlyRate}</TableCell>
                                    <TableCell>{user.taxRate}</TableCell>
                                    <TableCell>
                                        <Switch
                                            checked={user.activated}
                                            onClick={() =>
                                                ToggleUserActivatedById(
                                                    user._id
                                                )
                                            }
                                        />
                                    </TableCell>
                                    {/*Edit Button For Edit User*/}
                                    <TableCell>
                                        <Button
                                            variant='outlined'
                                            onClick={() => {
                                                setFirstname(user.firstName);
                                                setLastname(user.lastName);
                                                setHourlyrate(user.hourlyRate);
                                                setTaxrate(user.taxRate);
                                                setOpen(true);
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        {/*Edit Users For Admin Modal*/}
                        <Modal open={open} onClose={() => setOpen(false)}>
                            <Box
                                className='modal-container'
                                sx={{ width: 400 }}
                            >
                                <Typography variant='h5'>
                                    Edit User Details
                                </Typography>
                                <Typography sx={{ mt: '1rem' }}>
                                    <Box
                                        sx={{
                                            '& .MuiTextField-root': {
                                                mb: '1rem',
                                            },
                                        }}
                                    >
                                        <TextField
                                            value={firstname}
                                            onChange={(e) =>
                                                setFirstname(e.target.value)
                                            }
                                            fullWidth
                                            label='First Name'
                                            placeholder='First Name'
                                        />
                                        <TextField
                                            value={lastname}
                                            onChange={(e) =>
                                                setLastname(e.target.value)
                                            }
                                            fullWidth
                                            label='Last Name'
                                            placeholder='Last Name'
                                        />
                                        <div
                                            style={{
                                                display: 'flex',
                                            }}
                                        >
                                            <TextField
                                                sx={{ mr: '0.9rem' }}
                                                value={hourlyrate}
                                                onChange={(e) =>
                                                    setHourlyrate(
                                                        e.target.value
                                                    )
                                                }
                                                fullWidth
                                                label=' Hourly Rate'
                                                placeholder='Hourly Rate'
                                            />
                                            <TextField
                                                value={taxrate}
                                                onChange={(e) =>
                                                    setTaxrate(e.target.value)
                                                }
                                                fullWidth
                                                label='Tax Rate'
                                                placeholder='Tax Rate'
                                            />
                                        </div>

                                        <div id='btn-edit-user'>
                                            <Button
                                                sx={{
                                                    mr: '1rem',
                                                }}
                                                variant='contained'
                                                onClick={() => setOpen(false)}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                onClick={() => setOpen(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </Box>
                                </Typography>
                            </Box>
                        </Modal>
                    </Table>
                </div>
            </section>
        </>
    );
};
