import React, { Component } from "react";
import {Card} from "react-bootstrap";
import {Helmet} from "react-helmet";
import ReactGA from "react-ga";

class About extends Component {
    componentDidMount() {
        ReactGA.pageview(window.location.pathname  + window.location.search);
    }
    render() {
        return (
            <div className="container" style={{marginBottom: "100px"}}>
                <Helmet>
                    <title>About Me</title>
                    <meta name="description" content="My name is Abhishek Sharma. Currently, I am pursuing undergraduate course in Computer Science and Engineering. I am an AWS Certified Solutions Architect - Associate."/>
                </Helmet>
                <Card className="row" style={{
                    borderRadius: "5px",
                    border: "0px",
                    padding: "5px",
                    display: "flex",
                    flexDirection: "row",
                    margin: "10px",
                    justifyContent: "center",
                    boxShadow: "0px 0px 11px -1px rgba(43,43,43,0.5)"}}>
                    <Card.Img
                        style={{
                            width: "250px",
                            height: "250px"
                        }}
                        src={"https://explainexampleimages.s3.ap-south-1.amazonaws.com/posterPictures/about-me.jpg"}/>
                    <Card.Body>
                        <Card.Title>About Me</Card.Title>
                        <Card.Text>{
                            <div>
                            My name is Abhishek Sharma. Currently, I am pursuing undergraduate course in Computer Science and Engineering. I am an AWS Certified Solutions Architect - Associate.
                            I have developed this website with my goal to make AWS and Cloud Computing easy to learn. On this website, you can expect the blog posts related to Amazon Web Services, Cloud Computing and general Software Development stuff.
                            <br/>
                            <strong>AWS Credential: GZ6H4Q1CPF1EQZGJ</strong>
                            </div>
                        }</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default About;
