import React from 'react';
import { UserPayrollReportForm } from 'components/UserPayrollReportForm';
import { USerPayrollTable } from 'components/UserPayrollTable';

export const Payroll = () => {
    return (
        <div className='main-container'>
            <section class='payroll'>
                <div className='payroll-info'>
                    <h1>My Payroll</h1>
                    <h3 id='userName'>Name:</h3>
                    <h3 id='userAnnualTotal'>Annual Total:</h3>
                    <h3 id='userWage'>Wage: </h3>
                    <h3 id='userWorkedHours'>Hours Worked:</h3>

                    <UserPayrollReportForm />
                </div>

                <div className='payroll-table'>
                    <USerPayrollTable />
                </div>
            </section>
        </div>
    );
};

export default Payroll;
