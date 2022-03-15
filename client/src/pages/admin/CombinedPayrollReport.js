import React from 'react';

export const CombinedPayrollReport = () => {
    return (
        <div className='container'>
            <section class='title'>
                <div className='reportTitle'></div>
            </section>

            <section class='slipInfo'>
                <div className='payDate'>
                    <p>Pay Date</p>
                    <p>//date</p>
                </div>
                <div className='payPeriod'>
                    <p>Pay Period</p>
                    <p>//payPeriod</p>
                </div>
                <div className='siteInfo'>
                    <p>Site</p>
                    <p>//siteAddress</p>
                </div>
            </section>

            <section class='employeeTotal'>
                <div className='employeeEarningsInfo'>
                    <p>Employee Total</p> <p>Amount: CAD</p>
                    <p>//user Salary - Monthly()</p>
                    <p>Total Earnings</p> <p>amount</p>
                </div>
            </section>

            <section class='deductions'>
                <div className='employeeDeductionsInfo'>
                    <p>Deductions</p> <p>Amount: CAD</p>
                    <p>//user</p> <p>amount</p>
                    <p>Total Deductions</p> <p>amount</p>
                </div>
            </section>

            <section class='payout'>
                <div className='totalPayout'>
                    <p>Total Payout</p> <p>amount</p>
                </div>
            </section>
        </div>
    );
};
