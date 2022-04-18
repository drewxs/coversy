import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Modal,
    TextareaAutosize,
} from '@mui/material';

export const UserPayrollReportForm = () => {
    const [open, setOpen] = useState(false);

    return (
        <div style={{ marginTop: '2em' }}>
            <Button variant='outlined' onClick={() => setOpen(true)}>
                Report Issues
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box className='modal-container' sx={{ width: 400 }}>
                    <Typography id='modal-modal-description'>
                        <section className='report-container'>
                            <form action=''>
                                <h3 style={{ marginBottom: '1rem' }}>
                                    Report Issues
                                </h3>
                                <div className='report-body'>
                                    <div className='report-content'>
                                        <TextareaAutosize
                                            placeholder='Descriptions'
                                            style={{
                                                padding: '1rem',
                                                width: 300,
                                                height: 200,
                                            }}
                                        />
                                    </div>
                                    <br></br>
                                    <Button
                                        onClick={() => setOpen(false)}
                                        variant='contained'
                                    >
                                        Submit
                                    </Button>

                                    <Button
                                        style={{ marginLeft: '1.5em' }}
                                        onClick={() => setOpen(false)}
                                        variant='outlined'
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </section>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};
