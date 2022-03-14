import React from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextareaAutosize,
} from '@mui/material';

const style = {
    borderRadius: '5px',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 405,
    bgcolor: 'background.paper',
    border: '1px solid #030303',
    boxShadow: 24,
    p: 4,
};

export const UserPayrollReportForm = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div style={{ marginTop: '2em' }}>
            <Button variant='outlined' onClick={handleOpen}>
                Report Issues
            </Button>
            <Modal open={open} onClose={handleClose}>
                <div className='modal'>
                    <Box sx={style}>
                        <Typography id='modal-modal-description'>
                            <section className='report-container'>
                                <form action=''>
                                    <h3 style={{ marginBottom: '1em' }}>
                                        Report Issues
                                    </h3>
                                    <div className='report-body'>
                                        <div className='report-content'>
                                            <TextareaAutosize
                                                placeholder='Description...'
                                                style={{
                                                    padding: '1em',
                                                    width: 300,
                                                    height: 200,
                                                }}
                                            />
                                        </div>
                                        <br></br>
                                        <Button
                                            onClick={handleClose}
                                            variant='contained'
                                        >
                                            Submit
                                        </Button>

                                        <Button
                                            style={{ marginLeft: '1.5em' }}
                                            onClick={handleClose}
                                            variant='outlined'
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </section>
                        </Typography>
                    </Box>
                </div>
            </Modal>
        </div>
    );
};
