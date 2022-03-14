import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '@mui/material/Button';

const localizer = momentLocalizer(moment);

const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
];

export const Shifts = () => {
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
                                >
                                    Post Shift
                                </Button>
                            </div>
                        </div>
                        <div className='displayText'>
                            <div className='btn-container'>
                                {/* <div className='text'>Hi there</div> */}
                                <button className='btn'>Book Time-Off</button>
                            </div>
                            <div className='btn-container'></div>
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
                </div>
            </div>
        </section>
    );
};
