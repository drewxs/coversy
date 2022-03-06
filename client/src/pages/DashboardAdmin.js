import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {  Button } from "@mui/material";
import 'react-calendar/dist/Calendar.css';
import { LogoutUser } from "redux/user";
import {Calendar} from 'react-calendar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
function createData(name, shiftdate, shifttime, classname) {
    return { name, shiftdate, shifttime, classname };
  }
  
  const rows = [
    createData("John doe", "Jan 25,2022", "11AM 11:45 AM", "Gym"),
    createData("Jane Doe", "Jan 25,2022", "11AM 11:45 AM", "Math")
  ];

export const DashboardAdmin = () => {
    const user = useSelector((state) => state.userSlice.user);
    const [value, onChange] = useState(new Date());
    
    return (
        <section className="profile">
            <section className="nav">
                <div className="container">
                    <h2>Coversy</h2>
                    <div className="button-cont">
                        <Button
                            variant="outlined"
                            className="button logout-btn"
                            onClick={() => {
                                <Navigate to="/login" />;
                                LogoutUser();
                            }}
                        >
                            Logout
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            href="/DashboardAdmin"
                            className="button"
                        >
                            Dashboard
                        </Button>
                        <Button
                            variant="outlined"
                            className="button logout-btn"
                            onClick={() => {
                                <Navigate to="/PayrollAdmin" />;
                            }}
                        >
                            Payroll
                        </Button>
                    </div>
                </div>
            </section>
            <div className="card container">
               
                <div className="col left">
                    <Calendar onChange={onChange} value={value} />
                    <div className="upload_btn">
                    <Button variant="contained"  className="button btn-Upload"  >
                        Upload Schedule
                    </Button>
                    </div>
                   
                </div>
                <div className="col right">
                <div className="shift_table">
                    <h2>Shift</h2>
                </div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Shift Date</TableCell>
                            <TableCell align="right">Shift Time</TableCell>
                            <TableCell align="right">Class</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.shiftdate}</TableCell>
                            <TableCell align="right">{row.shifttime}</TableCell>
                            <TableCell align="right">{row.classname}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </section>
    );
};
