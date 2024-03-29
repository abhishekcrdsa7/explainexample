import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import "./MainNavbar.css";

class MainNavBar extends Component {
    render() {
        return (
            <Navbar bg="dark" className="justify-content-center" expand="lg" variant="dark">
                <Navbar.Brand href="/"><img alt="explainexample-banner" className="brand-image" src={require("../../assets/logo.png")}/></Navbar.Brand>
                <Nav className="position-absolute" style={{right: 15, top: 20}}>
                    <Nav.Link href="/about" style={{padding: 0}}>About Me</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default MainNavBar;
