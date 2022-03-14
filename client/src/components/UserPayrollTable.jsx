import React, { useState } from 'react';
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

export const USerPayrollTable = () => {
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
            type: 'number',
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
        createData(),
        createData(),
        createData(),
        createData(),
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
        <Paper sx={{ width: '80%', overflow: 'hidden' }}>
            <TableContainer id='table-container' sx={{ maxHeight: 700 }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
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
                                            const value = row[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                >
                                                    {column.format &&
                                                    typeof value === 'number'
                                                        ? column.format(value)
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
        </Paper>
    );
};
