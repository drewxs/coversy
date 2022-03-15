import React, { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { GetShifts } from 'redux/shift';
import { FetchSites } from 'redux/user';
import {
    Box,
    Typography,
    Modal,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from '@mui/material';
const localizer = momentLocalizer(moment);

const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
];

export const Shifts = () => {
    const shifts = useSelector((state) => state.shift.shifts);
    const [description, setDescription] = useState('');
    const [openpost, setOpenPost] = useState(false);
    const [openview, setOpenView] = useState(false);
    const [openbook, setOpenBook] = useState(false);
    const sites = useSelector((state) => state.user.sites);
    const [site, setSite] = useState('');
    const [file, setFile] = useState();
    useEffect(() => {
        GetShifts();
        FetchSites();
    }, []);

    return (
        <section className='dashboard shifts'>
            <div className='container'>
                <div className='mainDash-container'>
                    {/* My Shift / Post Shift */}

                    <div className='left-container'>
                        <div className='myShiftBox'>
                            <div className='shiftBox-container'>
                                <Button variant='contained' id='shift-box'>
                                    Shift Box
                                </Button>
                            </div>

                            <div className='postBox-container'>
                                <Button
                                    className='btn btn-select'
                                    variant='text'
                                    id='post-box'
                                    onClick={() => setOpenPost(true)}
                                >
                                    Post Shift
                                </Button>
                                <Button
                                    sx={{ mb: 2 }}
                                    variant='contained'
                                    onClick={() => setOpenView(true)}
                                >
                                    View Shift
                                </Button>
                                <Button
                                    sx={{ mb: 2 }}
                                    variant='contained'
                                    onClick={() => setOpenBook(true)}
                                >
                                    Book time off
                                </Button>
                            </div>

                        </div>
                        <div className='displayText'>
                            <div className='btn-container'>
                                {/* <div className='text'>Hi there</div> */}
                                <button className='btn'>Book Time-Off</button>
                            </div>
                            <div className='cards'>
                                {shifts.map((shift, k) => (
                                    <div className='user'>
                                        {shift.teacher.firstName}
                                        {shift.teacher.lastName}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Calendar View */}
                    <div className='calendar'>
                        <Calendar
                            localizer={localizer}
                            events={myEventsList}
                            startAccessor='start'
                            endAccessor='end'
                            onSelectEvent={(event) =>
                                alert(event.title, event.description)
                            }
                            style={{ height: 500, width: 850 }}
                        />
                    </div>
                    

                <Modal open={openpost} onClose={() => setOpenPost(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant='h6'>Post Shift</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Preferred Sub</InputLabel>
                            <Select
                                className='input-form'
                                value={site}
                                label='Age'
                                onChange={(e) => setSite(e.target.value)}
                            >
                                {sites?.map((site, k) => (
                                    <MenuItem value={site._id} key={k}>
                                        {site.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            className='input-form'
                            variant="outlined" 
                            label='Description'
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                       
                        <input
                                type='file'
                                className='input-form'
                                accept='.csv'
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{ mt: 3 }}
                            onClick={(e)=>setOpenPost(false)}
                        >
                            Post
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{ mt: 3 }}
                            onClick={(e)=>setOpenPost(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Modal>

                <Modal open={openview} onClose={() => setOpenView(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant='h6'>View Shift</Typography>
                        Name: John
                        Class: Gym
                        Date:  Date
                        Time: 11 AM - 11:45 AM
                        Description: Description
                        Attached files:
                        <a href='#'>File name</a>
                           
                    </Box>
                </Modal>
                <Modal open={openbook} onClose={() => setOpenBook(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <Typography variant='h6'>Book Time Off</Typography>
                        <FormControl fullWidth>
                            <InputLabel>Preferred Sub</InputLabel>
                            <Select
                                className='input-form'
                                value={site}
                                label='Age'
                                onChange={(e) => setOpenView(e.target.value)}
                            >
                                {sites?.map((site, k) => (
                                    <MenuItem value={site._id} key={k}>
                                        {site.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            className='input-form'
                            variant="outlined" 
                            label='Description'
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{ mt: 3 }}
                            onClick={(e)=>setOpenBook(false)}
                        >
                            Book
                        </Button>
                        <Button
                            variant='contained'
                            color='primary'
                            sx={{ mt: 3 }}
                            onClick={(e)=>setOpenBook(false)}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Modal>
                </div>
            </div>
        </section>
    );
};
