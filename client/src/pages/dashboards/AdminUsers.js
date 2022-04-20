import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Box,
    Button,
    LinearProgress,
    Modal,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import {
    FetchUsers,
    ToggleUserActivatedById,
    UpdateUserAsAdmin,
    SetOpenEditUser,
} from 'redux/data/admin';
import { Errors } from 'components';

export const AdminUsers = () => {
    const users = useSelector((state) => state.admin.users);
    const errors = useSelector((state) => state.admin.errors);
    const open = useSelector((state) => state.admin.openEditUser);
    const admin = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loadingUsers);

    const [firstName, setFirstname] = useState(null);
    const [lastName, setLastname] = useState(null);
    const [hourlyRate, setHourlyRate] = useState(null);
    const [taxRate, setTaxRate] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (admin.site._id) FetchUsers(admin.site._id);
    }, [admin]);

    const handleSave = (e) => {
        e.preventDefault();

        UpdateUserAsAdmin(userId, {
            firstName,
            lastName,
            hourlyRate,
            taxRate,
        });
    };

    return (
        <>
            <section className='dashboard'>
                <div className='container'>
                    {loading ? (
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    ) : (
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
                                                variant='contained'
                                                onClick={() => {
                                                    setFirstname(
                                                        user.firstName
                                                    );
                                                    setLastname(user.lastName);
                                                    setHourlyRate(
                                                        user.hourlyRate
                                                    );
                                                    setTaxRate(user.taxRate);
                                                    setUserId(user._id);
                                                    SetOpenEditUser(true);
                                                }}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </section>

            {/*Edit Users For Admin Modal*/}
            <Modal open={open} onClose={() => SetOpenEditUser(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography variant='h5'>Edit User Details</Typography>
                    <Box
                        sx={{
                            mt: '1.5rem',
                            '& .MuiTextField-root': {
                                mb: '1rem',
                            },
                        }}
                    >
                        <form onSubmit={handleSave}>
                            <TextField
                                value={firstName}
                                onChange={(e) => setFirstname(e.target.value)}
                                label='First Name'
                                placeholder='First Name'
                                fullWidth
                            />
                            <TextField
                                value={lastName}
                                onChange={(e) => setLastname(e.target.value)}
                                label='Last Name'
                                placeholder='Last Name'
                                fullWidth
                            />
                            <div style={{ display: 'flex' }}>
                                <TextField
                                    type={'number'}
                                    value={hourlyRate}
                                    onChange={(e) =>
                                        setHourlyRate(e.target.value)
                                    }
                                    label=' Hourly Rate'
                                    placeholder='Hourly Rate'
                                    fullWidth
                                    sx={{ mr: '0.9rem' }}
                                />
                                <TextField
                                    type={'number'}
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    label='Tax Rate'
                                    placeholder='Tax Rate'
                                    fullWidth
                                />
                            </div>
                            <Errors errors={errors} />
                            <Button
                                sx={{
                                    mr: '1rem',
                                }}
                                variant='contained'
                                type='submit'
                            >
                                Save
                            </Button>
                            <Button
                                variant='outlined'
                                onClick={() => SetOpenEditUser(false)}
                            >
                                Cancel
                            </Button>
                        </form>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};
