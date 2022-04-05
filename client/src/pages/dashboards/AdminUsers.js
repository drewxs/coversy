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
import {
    FetchUsers,
    ToggleUserActivatedById,
    UpdateUserAsAdmin,
} from 'redux/admin';

export const AdminUsers = () => {
    const users = useSelector((state) => state.admin.users);
    const admin = useSelector((state) => state.user.user);

    const [open, setOpen] = useState(false);
    const [firstname, setFirstname] = useState(null);
    const [lastname, setLastname] = useState(null);
    const [hourlyRate, setHourlyRate] = useState(null);
    const [taxRate, setTaxRate] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (admin.site._id) FetchUsers(admin.site._id);
    }, [admin]);

    const handleSave = () => {
        UpdateUserAsAdmin(userId, {
            firstname,
            lastname,
            hourlyRate,
            taxRate,
        });
        setOpen(false);
    };

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
                                                setHourlyRate(user.hourlyRate);
                                                setTaxRate(user.taxRate);
                                                setUserId(user._id);
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
                                <Box
                                    sx={{
                                        mt: '1.5rem',
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
                                        label='First Name'
                                        placeholder='First Name'
                                        fullWidth
                                    />
                                    <TextField
                                        value={lastname}
                                        onChange={(e) =>
                                            setLastname(e.target.value)
                                        }
                                        label='Last Name'
                                        placeholder='Last Name'
                                        fullWidth
                                    />
                                    <TextField
                                        value={hourlyRate}
                                        onChange={(e) =>
                                            setHourlyRate(e.target.value)
                                        }
                                        label=' Hourly Rate'
                                        placeholder='Hourly Rate'
                                        fullWidth
                                    />
                                    <TextField
                                        value={taxRate}
                                        onChange={(e) =>
                                            setTaxRate(e.target.value)
                                        }
                                        label='Tax Rate'
                                        placeholder='Tax Rate'
                                        fullWidth
                                    />
                                    <Button
                                        sx={{
                                            mt: '1rem',
                                            mr: '1rem',
                                        }}
                                        variant='contained'
                                        onClick={() => {
                                            handleSave();
                                            setOpen(false);
                                        }}
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        sx={{ mt: '1rem' }}
                                        variant='outlined'
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Table>
                </div>
            </section>
        </>
    );
};
