import React, { Component } from "react";

class Signoff extends Component {
    render() {
        return (
            <div className="p-2" style={{boxShadow: "rgba(43, 43, 43, 0.5) 0px 0px 11px -1px"}}>
                <div className="d-flex justify-content-between">
                    <div>
                        <small className="text-muted d-block">
                            <em>
                                Post written by
                            </em>
                        </small>
                        <p><strong>Abhishek Sharma</strong></p>
                    </div>
                    <div className="d-flex flex-column justify-content-center">
                        <img
                            src="https://explainexampleimages.s3.ap-south-1.amazonaws.com/aws-certified-solutions-architect/aws-certified-logo.jpg"
                            alt="aws-certified-logo"
                        />
                    </div>
                </div>
                <small className="text-muted">For more information about me <a target="_blank" href="/about">click here.</a></small>
            </div>
        );
    }
}

export default Signoff;
