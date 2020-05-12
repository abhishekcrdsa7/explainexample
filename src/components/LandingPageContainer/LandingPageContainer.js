import React, { Component } from "react";
import axios from "axios";
import constants from "../../Constants";
import {Card, Spinner} from "react-bootstrap";
import _ from "lodash";
import "./LandingPageContainer.css";
import ReactGA from "react-ga";

class LandingPageContainer extends Component {

    state = {
        blogsList: null
    };

    componentDidMount() {
        if(this.props.query.length > 0) {
            ReactGA.pageview(window.location.pathname  + window.location.search);
            axios.get(`${constants.serverURL}/search?s=${this.props.query}`)
                .then(data => {
                    this.setState({blogsList: data.data})
                })
        }else {
            ReactGA.pageview(window.location.pathname  + window.location.search);
            axios.get(`${constants.serverURL}/blog`)
                .then(data => {
                    let blogsList = {};
                    blogsList["amazon web services"] = data.data["amazon web services"];
                    blogsList["golang"] = data.data["golang"];
                    blogsList["miscellaneous"] = data.data["miscellaneous"];
                    this.setState({blogsList})
                })
        }
    }

    createSubContainer = (blogs) => {
        let cards = blogs.map(b => {
            return (
                <Card key={b._id} style={{
                    width: '250px',
                    borderRadius: "5px",
                    border: "0px",
                    padding: "unset",
                    margin: "10px",
                    boxShadow: "0px 0px 11px -1px rgba(43,43,43,0.5)"}}>
                    <Card.Img variant="top" style={{width: "250px", height: "250px"}} alt={b.permaLink} src={b.posterPicture} />
                    <Card.Body>
                        <Card.Title>{b.title.substring(0,50)}...</Card.Title>
                        <Card.Text>{b.description.substring(0,100)}...</Card.Text>
                        <a href={`/${b.coursePermaLink}/${b.subjectPermaLink}/${b.permaLink}`} style={{position: "absolute", bottom: "10px", right: "25px"}}>Read More</a>
                    </Card.Body>
                </Card>
            );
        });

        let containerHeading = "Search Results";
        if(blogs && blogs.length > 0 && this.props.query.length <= 0) {
            containerHeading =  blogs[0].subject.name;
        }
        return (
            <div key={containerHeading} className="blogsContainer container">
                <h1>{_.startCase(containerHeading)}</h1>
                <div className="row justify-content-md-start justify-content-center">
                    {cards}
                </div>
            </div>
        );
    };

    createContainer = () => {
        let subContainers = [];
        for(let sub in this.state.blogsList) {
            let con = this.createSubContainer(this.state.blogsList[sub]);
            subContainers.push(con);
        }
        return subContainers;
    };

    render() {
        if(!this.state.blogsList) {
            return <Spinner animation={"border"}/>;
        }
        return (
            <div className="container" style={{marginBottom: "100px"}}>
                {this.createContainer()}
            </div>
        );
    }
}

export default LandingPageContainer;
