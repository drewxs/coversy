import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import { GetUserPayrolls } from 'redux/payroll';

export const UserPayrollTable = () => {
    const payrolls = useSelector((state) => state.payroll.payrolls);

    useEffect(() => {
        GetUserPayrolls();
    }, []);

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
        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
            <TableContainer id='table-container' sx={{ maxHeight: 700 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Period</TableCell>
                            <TableCell>Hours</TableCell>
                            <TableCell>Pay</TableCell>
                            <TableCell>Deductions</TableCell>
                            <TableCell>View</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {payrolls
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
                                        {payrolls.map((payroll) => {
                                            const value = row[payroll.id];
                                            return (
                                                <TableCell
                                                    key={payroll.id}
                                                    align={payroll.align}
                                                >
                                                    {payroll.format &&
                                                    typeof value === 'number'
                                                        ? payroll.format(value)
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
                count={payrolls.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};
