import React from "react";
import { Button } from "@mui/material";

export const UserProfile = () => {
    return (
        <div>
            <h4>User Activation</h4>
            <h2>Password</h2>
            <p>Current Password</p>
            <input type="password" />
            <Button className="change_password">Change Password</Button>
        </div>
    );
};
