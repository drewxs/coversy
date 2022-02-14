import React from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';





export const Profile = () => {

	const user = useSelector((state) => state.userSlice.user);

	const profileimg = user.profileimg;
	
	const site = user.site;
	const email = user.email;
	const phone = user.phone;

	let name = `${user.firstName} ${user.middleInitial} ${user.lastName}`;


	
	// const user = {
	// 	firstName: 'John',
	// 	lastName: 'Doe',
	// 	middleInitial: 'M',
	// 	email: 'johndoe@gmail.com',
	// 	site: 'Ogden',
	// 	phone: '1231231231',
	// };




	return {
		setData: (user) => {
			

			profileimg.src = user.picture;
			name.textContent = fullname;
			email.textContent = user.email;
			phone.textContent = user.phone;
			site.textContent = user.site;
		}
	}
})






export default function Profile() {
        return (
            <Paper
                sx={{
                    p: 10,
                    margin: "auto",
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === "dark" ? "#1A2027" : "#fff"
                }}
            >
                <Grid container spacing={12}>
                    <Grid item>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Avatar alt="profileimg" src="/userImage" />
                        </ButtonBase>
                        <div class="header">
                            <h2 class="name"></h2>
                        </div>
                        <Divider variant="large" />

                        <h3>Institute:</h3>
                        <div class="info">
                            {" "}
                            <p class="site"></p>
                        </div>
                        <div class="info">
                            <p class="location"></p>

                            <p class="cell"></p>

                            <p class="email"></p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <ToggleButtonGroup

                                    aria-label="text formatting"
                                >
                                    <ToggleButton value="Notifications" label="Notifications">
                                        Notifications
                                    </ToggleButton>
                                    <ToggleButton value="EditProfile" label="Edit">
                                        Edit Profile
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Grid>
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox defaultChecked />} label="Reveive notification to your email" />
                                    <FormControlLabel control={<Checkbox />} label="Send me text message notifaction" />
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        );
    }


