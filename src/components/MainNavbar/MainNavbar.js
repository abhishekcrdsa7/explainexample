import React, {Component} from "react";
import {Navbar} from "react-bootstrap";
import "./MainNavbar.css";

class MainNavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark" style={{height: "50px"}}>
                <Navbar.Brand href="/"><img alt="explainexample-banner" className="brand-image" src={require("../../assets/logo.png")}/></Navbar.Brand>
            </Navbar>
        );
    }
}

export default MainNavBar;
