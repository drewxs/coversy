import React from 'react';

export const PayrollReport = () => {
    return (
        <div className='payrollReport'>
            <div className='container'>
                <section class='title'>
                    <div className='slipTitles'>
                        <h1>PAYSLIP</h1>
                        <p>username</p>
                    </div>
                </section>
                <br />
                <section class='slipInfo'>
                    <div className='payDate'>
                        <p id='bold'>Pay Date</p>
                        <p>date</p>
                    </div>
                    <div className='payPeriod'>
                        <p id='bold'>Pay Period</p>
                        <p>payPeriod</p>
                    </div>
                    <div className='siteInfo'>
                        <p id='bold'>Site</p>
                        <p>siteAddress</p>
                    </div>
                </section>
                <br />
                <section class='earnings'>
                    <div className='earningsInfo'>
                        <p id='bold'>Earnings</p>
                        <p id='bold'>Amount: CAD</p>
                        <hr />
                        <p>username's Salary - Monthly (amount)</p>
                        <p>amount</p>
                        <hr />
                        <p id='bold'>Total Earnings</p>
                        <p>amount</p>
                    </div>
                </section>
                <br />
                <section class='deductions'>
                    <div className='deductionsInfo'>
                        <p id='bold'>Deductions</p>
                        <p id='bold'>Amount: CAD</p>
                        <hr />
                        <p>Employee Taxes</p>
                        <p>amount</p>
                        <hr />
                        <p id='bold'>Total Deductions</p>
                        <p>amount</p>
                    </div>
                </section>
                <br />
                <section class='payout'>
                    <div className='takeHomePay'>
                        <hr />
                        <p>Take Home Pay</p>
                        <p>amount</p>
                        <hr />
                    </div>
                </section>
            </div>
        </div>
    );
};
