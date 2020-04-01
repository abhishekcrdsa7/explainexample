import React, {Component} from "react";
import {Navbar, Container} from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <Navbar expand="lg" variant="dark" bg="dark" fixed="bottom" style={{paddingTop: 0, paddingBottom: 0}}>
                <Container style={{display: "flex", justifyContent: "center"}}>
                    <Navbar.Brand href="#"><img alt="explainexample-banner" src={require("../../assets/logo.png")} style={{height: "40px"}}/></Navbar.Brand>
                </Container>
            </Navbar>
        );
    }
}

export default Footer;
