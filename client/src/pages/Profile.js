import React from "react";
import logo from "assets/logo.jpg";
import avatar from "assets/logo2.png";
import {
    Grid,
    Paper,
    ButtonBase,
    Avatar,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";

import { useSelector } from "react-redux";

export const Profile = () => {
    const user = useSelector((state) => state.userSlice.user);

    return (
        <section className="profile">
            <div className="card container">
                <div className="row">
                    <div className="col-profile">
                        <Avatar src={avatar} alt="avatar" />
                        <h1>
                            {user.firstName} {user.lastName}
                        </h1>
                        <h3>{user.phone}</h3>
                        <h3>{user.email}</h3>
                    </div>
                    <div className="col"></div>
                </div>
            </div>
        </section>
    );
};
