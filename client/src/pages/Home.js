import React from "react";
import { Button } from "@mui/material";
import HeroImg from "assets/hero.jpg";

export const Home = () => {
    return (
        <div className="home">
            <section className="nav">
                <div className="container">
                    <h2>Coversy</h2>
                    <div className="button-cont">
                        <Button
                            variant="outlined"
                            color="secondary"
                            href="/register"
                            className="button"
                        >
                            Register
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            href="/PayrollAdmin"
                            className="button"
                        >
                            Payroll
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
                            color="secondary"
                            href="/login"
                            className="button"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </section>
            <section className="hero">
                <div className="container">
                    <div className="col left">
                        <h3>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Est quos obcaecati unde officia voluptatem eos
                            nesciunt voluptatum libero laboriosam numquam?
                        </h3>
                        <Button
                            className="button"
                            variant="contained"
                            color="primary"
                            href="/register/site"
                            size="large"
                        >
                            Register New Site
                        </Button>
                    </div>
                    <div className="col">
                        <img src={HeroImg} alt="Woman looking at clock." />
                    </div>
                </div>
            </section>
        </div>
    );
};
