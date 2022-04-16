import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
    DeleteNotification,
    GetNotifications,
    ReadNotifications,
} from 'redux/notif';
import { IconButton, Badge } from '@mui/material';
import { NotificationsNone, CloseRounded } from '@mui/icons-material';

export const NotificationDropdown = () => {
    const notifications = useSelector(
        (state) => state.notification.notifications
    );
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        if (!open) {
            ReadNotifications();
        }
        setOpen(!open);
    };
    const hasUnread = () => {
        let total = 0;
        notifications.forEach((notif) => {
            total += notif.read;
        });
        return total === notifications.length;
    };

    useEffect(() => {
        GetNotifications();
    }, []);

    return (
        <>
            <Badge
                variant='dot'
                color='primary'
                overlap='circular'
                invisible={hasUnread()}
            >
                <IconButton
                    color='primary'
                    className='button notif-btn'
                    onClick={() => {
                        handleOpen();
                    }}
                >
                    <NotificationsNone />
                </IconButton>
            </Badge>
            {open && (
                <div className='notif-dropdown card'>
                    {notifications.map((notif, k) => (
                        <div className='notif-item' key={k}>
                            {notif.type === 'Shift' && (
                                <>
                                    <p>
                                        {`${notif.sender.firstName} has taken your shift on `}
                                        {moment(
                                            notif.referenceObject.startTime
                                        ).format(`MMM D`)}
                                        {` at `}
                                        {moment(
                                            notif.referenceObject.startTime
                                        ).format(`h:mm`)}
                                    </p>
                                    <small>
                                        {moment(notif.createdAt).format(
                                            `MMM D`
                                        )}
                                        {` - `}
                                        {moment(notif.createdAt).format(`h:mm`)}
                                    </small>
                                </>
                            )}
                            {notif.type === 'Payroll' && (
                                <>
                                    <p>
                                        {`Your payroll issue has been marked as resolved`}
                                    </p>
                                    <small>
                                        {moment(notif.createdAt).format(
                                            `MMM D`
                                        )}
                                        {` - `}
                                        {moment(notif.createdAt).format(`h:mm`)}
                                    </small>
                                </>
                            )}
                            {notif.type === 'TimeOff' && (
                                <>
                                    <p>
                                        {`Your Time-off request has been marked as resolved`}
                                    </p>
                                    <small>
                                        {moment(notif.createdAt).format(
                                            `MMM D`
                                        )}
                                        {` - `}
                                        {moment(notif.createdAt).format(`h:mm`)}
                                    </small>
                                </>
                            )}
                            <IconButton
                                color='primary'
                                onClick={() => {
                                    DeleteNotification(notif._id);
                                }}
                            >
                                <CloseRounded fontSize='small'></CloseRounded>
                            </IconButton>
                        </div>
                    ))}
                    {notifications.length === 0 && (
                        <div className='notif-item'>
                            <p>No Notifications</p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
