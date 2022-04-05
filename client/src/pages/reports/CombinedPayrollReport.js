import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetSitePayroll } from 'redux/payroll';
import { useParams } from 'react-router-dom';
import moment from 'moment';

export const CombinedPayrollReport = () => {
    const params = useParams();

    const user = useSelector((state) => state.user.user);
    const payroll = useSelector((state) => state.payroll.payroll);

    useEffect(() => {
        GetSitePayroll(params.date);
    }, [params.date]);
    console.log(payroll);

    return (
        <section className='report'>
            <div className='container'>
                <div className='top-info'>
                    <div className='titles'>
                        <h1>REPORT</h1>
                    </div>
                    <div className='site'>
                        <p className='bold'>{user?.site.name}</p>
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
                            <p>{moment(payroll?.period).format('MMMM Y')}</p>
                        </div>
                    </div>
                </div>
                <div className='earnings'>
                    <p className='bold'>Earnings</p>
                    <p className='amount-header'>Amount: CAD</p>
                    <hr />
                    <p>Pay - {payroll?.hours} Hours</p>
                    <p className='amount'>${payroll?.pay?.toFixed(2)}</p>
                    <hr />
                    <p className='bold'>Total Payout</p>
                    <p className='amount'>${payroll?.pay?.toFixed(2)}</p>
                </div>
                <div className='deductions'>
                    <p className='bold'>Deductions</p>
                    <p className='amount-header'>Amount: CAD</p>
                    <hr />
                    <p>Employee Taxes</p>
                    <p className='amount'>${payroll?.deductions?.toFixed(2)}</p>
                    <hr />
                    <p className='bold'>Total Deductions</p>
                    <p className='amount'>${payroll?.deductions?.toFixed(2)}</p>
                </div>
                <div className='payout'>
                    <hr />
                    <p>Net Payout</p>
                    <p className='amount'>${payroll?.netPay?.toFixed(2)}</p>
                    <hr />
                </div>
            </div>
        </section>
    );
};
