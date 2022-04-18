import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import {
    GetMyShifts,
    GetPostedShifts,
    TakeShift,
    UploadShiftMaterials,
    DeleteShiftMaterials,
} from 'redux/shift';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from 'react-redux';
import { UserShift } from 'components';
import { CloseRounded } from '@mui/icons-material';
import {
    Box,
    Typography,
    Modal,
    Button,
    TextField,
    Tabs,
    Tab,
    IconButton,
} from '@mui/material';
const localizer = momentLocalizer(moment);

export const Shifts = () => {
    const user = useSelector((state) => state.user.user);
    const shifts = useSelector((state) => state.shift.shifts);
    const myShifts = useSelector((state) => state.shift.myShifts);
    const myPostedShifts = useSelector((state) => state.shift.myPostedShifts);

    const [description, setDescription] = useState(null);
    const [openbook, setOpenBook] = useState(false);
    const [openview, setOpenView] = useState(false);
    const [current, setCurrent] = useState(0);
    const [tab, setTab] = useState(0);

    const getFile = (shift, file) => {
        let createURL = `${process.env.REACT_APP_API_URL}/shift/${shift._id}/files/${file.fileKey}`;
        axios({
            url: createURL,
            method: 'GET',
            headers: { 'auth-token': localStorage.getItem('auth-token') },
            responseType: 'blob',
        })
            .then((res) => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', file.fileName);
                console.log(url, link);
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        GetPostedShifts();
        GetMyShifts();
    }, []);

    return (
        <>
            <section className='dashboard shifts'>
                <div className='container'>
                    <div className='shift-col card'>
                        <div className='tab-container'>
                            <Tabs
                                value={tab}
                                onChange={(e, v) => setTab(v)}
                                textColor='primary'
                                indicatorColor='primary'
                                className='tab-header'
                            >
                                <Tab value={0} label='My Shifts' />
                                <Tab value={1} label='Posted Shifts' />
                                <Tab value={2} label='Take Shifts' />
                            </Tabs>

                            {/* Tab - My Shifts */}
                            {tab === 0 && (
                                <>
                                    {/* Book Time Off Button */}
                                    <div className='timeoff-button'>
                                        <Button
                                            sx={{
                                                marginLeft: '1rem',
                                                marginTop: '1rem',
                                            }}
                                            variant='contained'
                                            onClick={() => {
                                                setDescription(
                                                    user.description
                                                );
                                                setOpenBook(true);
                                            }}
                                        >
                                            Book time off{' '}
                                        </Button>
                                    </div>
                                    <div className='shift-container'>
                                        {myShifts.map((shift, k) => (
                                            <UserShift
                                                key={k}
                                                idx={k}
                                                shift={shift}
                                                setCurrent={setCurrent}
                                                setOpenView={setOpenView}
                                                btnText={'Post'}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}

                            {/* Tab - Posted Shifts */}
                            {tab === 1 && (
                                <div className='shift-container'>
                                    {myPostedShifts.map((shift, k) => (
                                        <UserShift
                                            key={k}
                                            idx={k}
                                            shift={shift}
                                            setCurrent={setCurrent}
                                            setOpenView={setOpenView}
                                            btnText={'Unpost'}
                                        />
                                    ))}
                                </div>
                            )}

                            {/* Tab - Take Shifts */}
                            {tab === 2 && (
                                <div className='shift-container'>
                                    {shifts.map((shift, k) => (
                                        <UserShift
                                            key={k}
                                            idx={k}
                                            shift={shift}
                                            setCurrent={setCurrent}
                                            setOpenView={setOpenView}
                                            btnText={'Take'}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Calendar View */}
                    <div className='calendar card'>
                        <Calendar
                            localizer={localizer}
                            events={
                                tab === 0
                                    ? myShifts
                                    : tab === 1
                                    ? myPostedShifts
                                    : shifts
                            }
                            titleAccessor='subject'
                            startAccessor='startTime'
                            endAccessor='endTime'
                            views={['month', 'agenda']}
                            onSelectEvent={(event) => {
                                tab === 0
                                    ? setCurrent(
                                          myShifts.findIndex(
                                              (e) => e._id === event._id
                                          )
                                      )
                                    : tab === 1
                                    ? setCurrent(
                                          myPostedShifts.findIndex(
                                              (e) => e._id === event._id
                                          )
                                      )
                                    : setCurrent(
                                          shifts.findIndex(
                                              (e) => e._id === event._id
                                          )
                                      );
                                console.log(event);
                                setDescription(user.description);
                                setOpenView(true);
                            }}
                            style={{ height: '100%', width: '100%' }}
                        />
                    </div>
                </div>
            </section>

            {/* Modal - View Shift */}
            <Modal open={openview} onClose={() => setOpenView(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography sx={{ mb: '1rem' }} variant='h5'>
                        {tab === 0 && (
                            <>
                                {myShifts[current]?.subject}
                                {' - '}
                                {myShifts[current]?.teacher.firstName}
                            </>
                        )}
                        {tab === 1 && (
                            <>
                                {myPostedShifts[current]?.subject}
                                {' - '}
                                {myPostedShifts[current]?.teacher.firstName}
                            </>
                        )}
                        {tab === 2 && (
                            <>
                                {shifts[current]?.subject}
                                {' - '}
                                {shifts[current]?.teacher.firstName}
                            </>
                        )}
                    </Typography>

                    {/* Shift Info */}
                    <div className='shift-info'>
                        <p>
                            <strong>Date: </strong>
                            {moment(
                                tab === 0
                                    ? myShifts[current]?.startTime
                                    : tab === 1
                                    ? myPostedShifts[current]?.startTime
                                    : shifts[current]?.startTime
                            ).format('MMMM DD, YYYY')}
                        </p>
                        <p>
                            <strong>Time: </strong>
                            {moment(
                                tab === 0
                                    ? myShifts[current]?.startTime
                                    : tab === 1
                                    ? myPostedShifts[current]?.startTime
                                    : shifts[current]?.startTime
                            ).format('h:mm a')}{' '}
                            -{' '}
                            {moment(
                                tab === 0
                                    ? myShifts[current]?.endTime
                                    : tab === 1
                                    ? myPostedShifts[current]?.endTime
                                    : shifts[current]?.endTime
                            ).format('h:mm a')}
                        </p>
                        <p className='shift-description'>
                            {tab === 0
                                ? myShifts[current]?.details
                                : tab === 1
                                ? myPostedShifts[current]?.details
                                : shifts[current]?.details}
                        </p>

                        {/* Shift Materials Upload/Download/Delete */}
                        <p>Class Materials</p>
                        {tab === 0 && (
                            <>
                                {myShifts[current]?.materials.map((file, k) => (
                                    <div key={k}>
                                        <button
                                            onClick={() =>
                                                getFile(current, file)
                                            }
                                        >
                                            {file.fileName}
                                        </button>
                                        {myShifts[current]?.teacher._id ===
                                            user._id && (
                                            <IconButton
                                                color='primary'
                                                onClick={() => {
                                                    DeleteShiftMaterials(
                                                        myShifts[current]?._id,
                                                        file.fileKey
                                                    );
                                                }}
                                            >
                                                <CloseRounded fontSize='small'></CloseRounded>
                                            </IconButton>
                                        )}
                                    </div>
                                ))}
                                {myShifts[current]?.teacher._id ===
                                    user._id && (
                                    <FileUploader
                                        classes='file-uploader'
                                        name='file'
                                        multiple={false}
                                        maxSize={60}
                                        handleChange={(file) => {
                                            UploadShiftMaterials(
                                                myShifts[current]?._id,
                                                file
                                            );
                                        }}
                                    />
                                )}
                            </>
                        )}
                        {tab === 1 && (
                            <>
                                {myPostedShifts[current]?.materials.map(
                                    (file, k) => (
                                        <div key={k}>
                                            <button
                                                onClick={() =>
                                                    getFile(current, file)
                                                }
                                            >
                                                {file.fileName}
                                            </button>
                                            {myPostedShifts[current]?.teacher
                                                ._id === user._id && (
                                                <IconButton
                                                    color='primary'
                                                    onClick={() => {
                                                        DeleteShiftMaterials(
                                                            myPostedShifts[
                                                                current
                                                            ]?._id,
                                                            file.fileKey
                                                        );
                                                    }}
                                                >
                                                    <CloseRounded fontSize='small'></CloseRounded>
                                                </IconButton>
                                            )}
                                        </div>
                                    )
                                )}
                                {myPostedShifts[current]?.teacher._id ===
                                    user._id && (
                                    <FileUploader
                                        classes='file-uploader'
                                        name='file'
                                        multiple={false}
                                        maxSize={60}
                                        handleChange={(file) => {
                                            UploadShiftMaterials(
                                                myPostedShifts[current]?._id,
                                                file
                                            );
                                        }}
                                    />
                                )}
                            </>
                        )}
                        {tab === 2 && (
                            <>
                                {shifts[current]?.materials.map((file, k) => (
                                    <div key={k}>
                                        <button
                                            onClick={() =>
                                                getFile(current, file)
                                            }
                                        >
                                            {file.fileName}
                                        </button>
                                        {shifts[current]?.teacher._id ===
                                            user._id && (
                                            <IconButton
                                                color='primary'
                                                onClick={() => {
                                                    DeleteShiftMaterials(
                                                        shifts[current]?._id,
                                                        file.fileKey
                                                    );
                                                }}
                                            >
                                                <CloseRounded fontSize='small'></CloseRounded>
                                            </IconButton>
                                        )}
                                    </div>
                                ))}
                                {shifts[current]?.teacher._id === user._id && (
                                    <FileUploader
                                        classes='file-uploader'
                                        name='file'
                                        multiple={false}
                                        maxSize={60}
                                        handleChange={(file) => {
                                            UploadShiftMaterials(
                                                shifts[current]?._id,
                                                file
                                            );
                                        }}
                                    />
                                )}
                            </>
                        )}

                        {/* Taking Shifts Handler */}
                        {tab === 0 && (
                            <>
                                {myShifts[current]?.teacher._id !==
                                    user._id && (
                                    <Button
                                        sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        onClick={() => {
                                            TakeShift(myShifts[current]?._id);
                                            setOpenView(false);
                                        }}
                                    >
                                        Take Shift
                                    </Button>
                                )}
                            </>
                        )}
                        {tab === 1 && (
                            <>
                                {myPostedShifts[current]?.teacher._id !==
                                    user._id && (
                                    <Button
                                        sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        onClick={() => {
                                            TakeShift(
                                                myPostedShifts[current]?._id
                                            );
                                            setOpenView(false);
                                        }}
                                    >
                                        Take Shift
                                    </Button>
                                )}
                            </>
                        )}
                        {tab === 2 && (
                            <>
                                {shifts[current]?.teacher._id !== user._id && (
                                    <Button
                                        sx={{ marginTop: '1rem' }}
                                        variant='contained'
                                        onClick={() => {
                                            TakeShift(shifts[current]?._id);
                                            setOpenView(false);
                                        }}
                                    >
                                        Take Shift
                                    </Button>
                                )}
                            </>
                        )}
                    </div>
                </Box>
            </Modal>

            {/* Modal - Book Time Off */}
            <Modal open={openbook} onClose={() => setOpenBook(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography variant='h5'>Book Time Off</Typography>
                    <TextField
                        className='input-form'
                        variant='outlined'
                        label='Description'
                        fullWidth
                        multiline
                        rows={4}
                        sx={{ mt: '1rem' }}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ mt: '1rem' }}
                        onClick={() => setOpenBook(false)}
                    >
                        Book
                    </Button>
                    <Button
                        variant='outlined'
                        color='primary'
                        sx={{ mt: '1rem', ml: '1rem' }}
                        onClick={() => setOpenBook(false)}
                    >
                        Cancel
                    </Button>
                </Box>
            </Modal>
        </>
    );
};
