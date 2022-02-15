import React from "react";
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
        <Paper
            sx={{
                p: 10,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
            }}
        >
            <Grid container spacing={12}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Avatar alt="profileimg" src="/userImage" />
                    </ButtonBase>
                    <div className="header">
                        <h2>
                            {user.firstName} {user.middleInitial}{" "}
                            {user.lastName}{" "}
                        </h2>
                    </div>
                    <Divider variant="large" />

                    <h3>Institute:</h3>
                    <div className="info">
                        {" "}
                        <p>{user.site}</p>
                    </div>
                    <div className="info">
                        <p>{user.location}</p>

                        <p>{user.phone}</p>

                        <p>{user.Email}</p>
                    </div>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <ToggleButtonGroup aria-label="text formatting">
                                <ToggleButton
                                    value="Notifications"
                                    label="Notifications"
                                >
                                    Notifications
                                </ToggleButton>
                                <ToggleButton value="EditProfile" label="Edit">
                                    Edit Profile
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid item>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Reveive notification to your email"
                                />
                                <FormControlLabel
                                    control={<Checkbox />}
                                    label="Send me text message notifaction"
                                />
                            </FormGroup>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};
