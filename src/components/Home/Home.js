import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import LandingPageContainer from "../LandingPageContainer/LandingPageContainer";
import HeroContainer from "../HeroContainer/HeroContainer";

class Home extends Component {

    render = () => {
        let query = "";
        if(this.props.location.search.substring(1,2) === "s") {
            query = this.props.location.search.substring(3);
        }
        return (
            <div>
                <HeroContainer/>
                <LandingPageContainer key={query} query={query}/>
            </div>
        );
    }
}

export default withRouter(Home);
