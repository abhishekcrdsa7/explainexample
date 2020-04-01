import React, { Component } from "react";
import axios from "axios";
import constants from "../../Constants";
import Jumbo from "../Jumbo/Jumbo";
import {Spinner} from "react-bootstrap";
import LandingPageContainer from "../LandingPageContainer/LandingPageContainer";

class Home extends Component {
    // state = {
    //     courses: [],
    //     subjects: {}
    // };
    //
    // componentDidMount = () => {
    //     const serverURL = constants.serverURL;
    //     axios.get(`${serverURL}/course`)
    //         .then(({data}) => {
    //             const courses = data;
    //             axios.get(`${serverURL}/subject`)
    //                 .then(({data}) => {
    //                     this.setState({subjects: data, courses});
    //                 })
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // };
    //
    // renderJumboBoxes = () => {
    //   return this.state.courses.map(c => {
    //       return <Jumbo key={c._id} subjects={this.state.subjects[c.name]} heading={c.name}/>;
    //   })
    // };

    render = () => {
        // if(this.state.courses.length <= 0) {
        //     return <Spinner animation={"border"}/>
        // }
        // return (
        //     <div className="container">
        //         <div>
        //             {this.renderJumboBoxes()}
        //         </div>
        //     </div>
        // );

        return <LandingPageContainer/>;
    }
}

export default Home;
