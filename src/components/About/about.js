import React, { Component } from "react";
import {Card} from "react-bootstrap";

class About extends Component {
    render() {
        return (
            <div className="container" style={{marginBottom: "100px"}}>
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
                            My name is Abhishek Sharma. Currently, I am pursuing undergraduate course in Computer Science and Engineering.
                            I spend most of my time watching football (soccer) and developing this website and obviously my college studies. I am an AWS Certified Solutions Architect - Associate.
                            And through this website I share my knowledge with you people. You can expect the blogs related to Cloud, Kubernetes and general Computer Science stuff on this website.
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
