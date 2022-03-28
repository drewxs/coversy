import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetUserPayroll } from 'redux/payroll';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export const PayrollReport = () => {
    const params = useParams();
    const user = useSelector((state) => state.user.user);
    const payroll = useSelector((state) => state.payroll.payroll);
    useEffect(() => {
        GetUserPayroll(params.date);
    }, [params.date]);

    return (
        <section className='report'>
            <div className='container'>
                <div className='top-info'>
                    <div className='titles'>
                        <h1>PAYSLIP</h1>
                        <h3>
                            {user?.firstName} {user?.lastName}
                        </h3>
                    </div>
                    <div className='site'>
                        <p id='bold'>Site: Name</p>
                        <p>{user?.site.address.street}</p>
                        <p>
                            {user?.site.address.city},{' '}
                            {user?.site.address.province}{' '}
                            {user?.site.address.zip}
                        </p>
                        <p>Canada</p>
                    </div>
                    <div className='pay-info'>
                        <div className='period'>
                            <p id='bold'>Pay Period:</p>
                            <p>{moment(payroll?.period).format('MMMM Y')}</p>
                        </div>
                    </div>
                </div>
                <div className='earnings'>
                    <p id='bold'>Earnings</p>
                    <p id='amount-header'>Amount: CAD</p>
                    <hr />
                    <p>
                        {user.firstName} {user.lastName}'s Salary - Hourly ( $
                        {user.hourlyRate} )
                    </p>
                    <p id='amount'>${payroll?.pay?.toFixed(2)}</p>
                    <hr />
                    <p id='bold'>Total Earnings</p>
                    <p id='amount'>${payroll?.pay?.toFixed(2)}</p>
                </div>
                <div className='deductions'>
                    <p id='bold'>Deductions</p>
                    <p id='amount-header'>Amount: CAD</p>
                    <hr />
                    <p>Employee Taxes</p>
                    <p id='amount'>${payroll?.deductions?.toFixed(2)}</p>
                    <hr />
                    <p id='bold'>Total Deductions</p>
                    <p id='amount'>${payroll?.deductions?.toFixed(2)}</p>
                </div>
                <div className='payout'>
                    <hr />
                    <p>Take Home Pay</p>
                    <p id='amount'>${payroll?.netPay?.toFixed(2)}</p>
                    <hr />
                </div>
            </div>
        </section>
    );
};
