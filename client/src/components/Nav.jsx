import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { LogoutUser } from 'redux/user';
import logo from 'assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import { NotificationDropdown } from './NotificationDropdown';

export const Nav = () => {
    const authenticated = useSelector((state) => state.user.authenticated);
    const user = useSelector((state) => state.user.user);
    const [openNav, setOpenNav] = useState(false);
    const [open, setOpen] = useState(false);

    const notifications = useSelector(
        (state) => state.notification.notifications
    );

    const handleOpen = () => {
        ReadNotifications();
        setOpen(!open);
    };
    useEffect(() => {
        if (authenticated) {
            GetNotifications();
        }
    }, [authenticated]);

    const hasUnread = () => {
        let total = 0;
        notifications.forEach((notif) => {
            total += notif.read;
        });
        return total === notifications.length;
    };

    return (
        <section className='nav'>
            <div className='container'>
                <div className='logo-cont'>
                    <a href='/'>
                        <img
                            className='logo'
                            src={logo}
                            alt='Coversy logo'
                        ></img>
                    </a>

                    {authenticated && (
                        <p className='hello'>
                            Hi, {user.firstName} {user.lastName}
                        </p>
                    )}
                </div>
                <MenuIcon
                    className='hamburger-icon'
                    fontSize='large'
                    onClick={() => setOpenNav(!openNav)}
                ></MenuIcon>

                <div className={`nav-links ${openNav ? '' : 'closed'}`}>
                    {/* Unauthenticated links */}
                    {!authenticated && (
                        <>
                            <Button
                                href='/register'
                                className={`button ${
                                    window.location.pathname === '/register'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                User Registration
                            </Button>
                            <Button
                                href='/login'
                                className={`button ${
                                    window.location.pathname === '/login'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Login
                            </Button>
                        </>
                    )}

                    {/* Admin links */}
                    {authenticated && user.type === 1 && (
                        <>
                            <Button
                                href='/dashboard/shifts'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/shifts'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Shifts
                            </Button>
                            <Button
                                href='/dashboard/payroll'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/payroll'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Payroll
                            </Button>
                            <Button
                                href='/dashboard/users'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/users'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Users
                            </Button>
                            <Button
                                href='/dashboard/tickets'
                                className={`button ${
                                    window.location.pathname ===
                                    '/dashboard/tickets'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Tickets
                            </Button>
                            <Button
                                href='/profile'
                                className={`button ${
                                    window.location.pathname === '/profile'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Profile
                            </Button>
                        </>
                    )}

                    {/* User links */}
                    {authenticated && user.type === 2 && (
                        <>
                            <Button
                                href='/shifts'
                                className={`button ${
                                    window.location.pathname === '/shifts'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Shifts
                            </Button>
                            <Button
                                href='/payroll'
                                className={`button ${
                                    window.location.pathname === '/payroll'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Payroll
                            </Button>
                            <Button
                                href='/profile'
                                className={`button ${
                                    window.location.pathname === '/profile'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                Profile
                            </Button>
                        </>
                    )}
                    <div className='notif-container'>
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
                                        <h4>{notif.title}</h4>
                                        <p>{notif.message}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {/* Authenticated links */}
                    {authenticated && (
                        <>
                            <NotificationDropdown />
                            <Button
                                color='primary'
                                className='button logout-btn'
                                onClick={() => {
                                    <Navigate to='/login' />;
                                    LogoutUser();
                                }}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};
