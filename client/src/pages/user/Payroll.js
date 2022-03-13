import React, { useState } from 'react';
import { Button, TextareaAutosize } from '@mui/material';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';

export const Payroll = () => {
    const [show, setShow] = useState(false);
    const handleButton = () => {
        setShow(!show);
    };

    const ReportBox = () => {
        return (
            <div className='issue-container'>
                <div className='report-container'>
                    <div className='report-nav'>
                        <h3>Report Issues</h3>
                    </div>
                    <div className='line-spacing'></div>
                    <div className='report-body'>
                        <div className='issue-text-container'>
                            <h3>Issues</h3>
                            <form className='report-form'>
                                <TextareaAutosize
                                    aria-label='empty textarea'
                                    placeholder='Description...'
                                    style={{ width: 270, height: 200 }}
                                />
                                <div className='issue-btn'>
                                    <Button
                                        id='submit-issue-btn'
                                        variant='contained'
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        onClick={() => handleButton(show)}
                                        id='cancel-issue-btn'
                                        variant='outlined'
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const user = {
        name: 'John',
        annualTotal: '$38,400',
        wage: '20$/hr',
        hoursWorked: '1000 hours',
    };

    const columns = [
        {
            id: 'payPeriod',
            label: 'Pay Period',
            minWidth: 90,
        },
        {
            id: 'payDate',
            label: 'Pay Date',
            minWidth: 70,
        },
        {
            id: 'amount',
            label: 'Amounts',
            minWidth: 70,
            align: 'center',
        },
        {
            id: 'reportStatus',
            label: 'Report Status',
            minWidth: 70,
            align: 'center',
        },
    ];

    function createData(payPeriod, payDate, hours, amount, reportStatus) {
        return { payPeriod, payDate, hours, amount, reportStatus };
    }

    const rows = [
        createData(
            'Feb 12 - Mar 12 (2022)',
            'Mar 12, 2022',
            50,
            2500,
            'Pending'
        ),
        createData(
            'Feb 12 - Mar 12 (2022)',
            'Mar 12, 2022',
            50,
            2500,
            'Received'
        ),
        createData(
            'Feb 12 - Mar 12 (2022)',
            'Mar 12, 2022',
            50,
            2500,
            'Pending'
        ),
        createData(),
        createData(),
        createData(),
        createData(),
        createData(),
        createData(),
        createData(),
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <section className='dashboard payroll'>
            <div>{show && <ReportBox />}</div>
            <div className='container'>
                <div className='payroll-info'>
                    <h1>My Payroll</h1>
                    <h3 id='userName'>Name: {user.name}</h3>
                    <h3 id='userAnnualTotal'>
                        Annual Total: {user.annualTotal}
                    </h3>
                    <h3 id='userWage'>Wage: {user.wage}</h3>
                    <h3 id='userWorkedHours'>
                        Hours Worked: {user.hoursWorked}
                    </h3>
                    <Button
                        onClick={() => handleButton(!show)}
                        id='reportIssue'
                        variant='contained'
                    >
                        Report an issue
                    </Button>
                </div>
                <div className='card'>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{
                                                minWidth: column.minWidth,
                                            }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    .map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                role='checkbox'
                                                tabIndex={-1}
                                                key={row.code}
                                            >
                                                {columns.map((column) => {
                                                    const value =
                                                        row[column.id];
                                                    return (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                        >
                                                            {column.format &&
                                                            typeof value ===
                                                                'number'
                                                                ? column.format(
                                                                      value
                                                                  )
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25]}
                        component='div'
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
            </div>
        </section>
    );
};
