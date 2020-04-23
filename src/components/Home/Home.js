import React, { Component } from "react";
import LandingPageContainer from "../LandingPageContainer/LandingPageContainer";

class Home extends Component {

    render = () => {
        let query = "";
        if(this.props.location.search.substring(1,2) === "s") {
            query = this.props.location.search.substring(3);
        }
        return <LandingPageContainer key={query} query={query}/>;
    }
}

export default Home;
