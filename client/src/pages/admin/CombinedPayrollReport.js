import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetUserPayroll } from 'redux/payroll';
import { useParams } from 'react-router-dom';

export const CombinedPayrollReport = () => {
    const params = useParams();
    const payroll = useSelector((state) => state.payroll.payroll);
    useEffect(() => {
        GetUserPayroll(params.date);
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
                        <p id='bold'>Site: Name</p>
                        <p>123 Street SE</p>
                        <p>Calgary, AB T2E S79</p>
                        <p>Canada</p>
                    </div>
                    <div className='pay-info'>
                        <p id='bold'>Pay Date:</p>
                        <p>Feb 12, 2022</p>
                        <div className='period'>
                            <p id='bold'>Pay Period:</p>
                            <p>Feb 12, 2022 - Mar 12, 2022</p>
                        </div>
                    </div>
                </div>
                <div className='earnings'>
                    <p id='bold'>Employe Total</p>
                    <p id='amount-header'>Amount: CAD</p>
                    <hr />
                    <p>John Doe's Salary - Monthly (20000)</p>
                    <p id='amount'>20000</p>
                    <hr />
                    <p>Jane Doe's Salary - Monthly (30000)</p>
                    <p id='amount'>30000</p>
                    <hr />
                    <p id='bold'>Total Earnings</p>
                    <p id='amount'>50000</p>
                </div>
                <div className='deductions'>
                    <p id='bold'>Deductions</p>
                    <p id='amount-header'>Amount: CAD</p>
                    <hr />
                    <p>John Doe</p>
                    <p id='amount'>2000</p>
                    <hr />
                    <p>Jane Doe</p>
                    <p id='amount'>3000</p>
                    <hr />
                    <p id='bold'>Total Deductions</p>
                    <p id='amount'>5000</p>
                </div>
                <div className='payout'>
                    <hr />
                    <p>Total Payout</p>
                    <p id='amount'>45000</p>
                    <hr />
                </div>
            </div>
        </section>
    );
};
