import React, {Component} from "react";
import {Navbar, Nav} from "react-bootstrap";
import "./MainNavbar.css";

class MainNavBar extends Component {
    render() {
        return (
            <Navbar className="justify-content-between" bg="dark" expand="lg" variant="dark" style={{height: "50px"}}>
                <Navbar.Brand href="/"><img alt="explainexample-banner" className="brand-image" src={require("../../assets/logo.png")}/></Navbar.Brand>
                <Nav>
                    <Nav.Link href="/about" style={{padding: 0}}>About Me</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}

export default MainNavBar;
