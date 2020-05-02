import React, { Component } from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import axios from "axios";
import constants from "../../Constants";
class Subscribe extends Component {

    state = {
        email: "",
        subscribeMsg: ""
    };

    submitEmail = (e) => {
        e.preventDefault();
        this.setState({subscribeMsg: ""});
        axios.post(`${constants.serverURL}/subscribe`, {
            email: this.state.email
        })
            .then((data) => {
                if(data.data.code === 11000) {
                    this.setState({subscribeMsg: "You are already registered!"})
                } else {
                    this.setState({subscribeMsg: "Thank you for subscribing!"})
                }
            })
            .catch(() => {
                this.setState({subscribeMsg: "Sorry, an error occurred. Please try again :)"})
            });
    };

    render() {
        return (
            <div className="d-flex justify-content-center">
                <div className="p-2"
                     style={{
                         border: "1px solid #ddd",
                         borderRadius: "5px"}}>
                    <h5 className="text-center">
                        Let's make a deal
                    </h5>
                    <small className="text-muted">{this.state.subscribeMsg}</small>
                    <Form onSubmit={this.submitEmail}>
                        <InputGroup>
                            <FormControl
                                placeholder="Enter your email"
                                type="email"
                                required
                                onChange={(e) => {
                                    this.setState({email: e.target.value});
                                }}
                                value={this.state.email}
                            />
                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Deal</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        <small className="text-primary"><strong>Subscribe to my newsletter and when I release my AWS course, you will get it for free!</strong></small>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Subscribe;
