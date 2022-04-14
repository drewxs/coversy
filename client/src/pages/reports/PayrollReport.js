import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetUserPayroll } from 'redux/payroll';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Box, CircularProgress } from '@mui/material';

export const PayrollReport = () => {
    const params = useParams();

    const user = useSelector((state) => state.user.user);
    const payroll = useSelector((state) => state.payroll.payroll);
    const loading = useSelector((state) => state.payroll.loading);

    useEffect(() => {
        GetUserPayroll(params.date);
    }, [params.date]);

    return (
        <section className='report'>
            <div className='container'>
                {loading ? (
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '30vh',
                        }}
                    >
                        <CircularProgress size={'5rem'} />
                    </Box>
                ) : (
                    <>
                        <div className='top-info'>
                            <div className='titles'>
                                <h1>PAYSLIP</h1>
                                <h3>
                                    Name: {user?.firstName} {user?.lastName}
                                </h3>
                            </div>
                            <div className='site'>
                                <p className='bold'>
                                    Location: {user?.site.name}
                                </p>
                                <p>{user?.site.address.street}</p>
                                <p>
                                    {user?.site.address.city},{' '}
                                    {user?.site.address.province}
                                    {', '}
                                    {user?.site.address.zip}
                                </p>
                                <p>Canada</p>
                            </div>
                            <div className='pay-info'>
                                <div className='period'>
                                    <p className='bold'>Pay Period:</p>
                                    <p>
                                        {moment(payroll?.period).format(
                                            'MMMM Y'
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='earnings'>
                            <p className='bold'>Earnings</p>
                            <p className='amount-header'>Amount: CAD</p>
                            <hr />
                            <p>
                                {user.firstName} {user.lastName}'s Salary -
                                Hourly ( ${user.hourlyRate} )
                            </p>
                            <p className='amount'>
                                ${payroll?.pay?.toFixed(2)}
                            </p>
                            <hr />
                            <p className='bold'>Total Earnings</p>
                            <p className='amount'>
                                ${payroll?.pay?.toFixed(2)}
                            </p>
                        </div>
                        <div className='deductions'>
                            <p className='bold'>Deductions</p>
                            <p className='amount-header'>Amount: CAD</p>
                            <hr />
                            <p>Employee Taxes</p>
                            <p className='amount'>
                                ${payroll?.deductions?.toFixed(2)}
                            </p>
                            <hr />
                            <p className='bold'>Total Deductions</p>
                            <p className='amount'>
                                ${payroll?.deductions?.toFixed(2)}
                            </p>
                        </div>
                        <div className='payout'>
                            <hr />
                            <p>Take Home Pay</p>
                            <p className='amount'>
                                ${payroll?.netPay?.toFixed(2)}
                            </p>
                            <hr />
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};
