import React, { Component } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import constants from "../../Constants";
import {Card, Spinner} from "react-bootstrap";
import _ from "lodash";
import "./LandingPageContainer.css";

class LandingPageContainer extends Component {

    state = {
        blogsList: null
    };

    componentDidMount() {
        axios.get(`${constants.serverURL}/blog`)
            .then(data => {
                this.setState({blogsList: data.data})
            })
    }

    createSubContainer = (blogs) => {
        let cards = blogs.map(b => {
            return (
                <Card key={b._id} style={{ width: '15rem', margin: '15px', borderRadius: "5px"}} className="col-lg-3 col-sm-5">
                    <Card.Img variant="top" style={{width: "auto", height: "200px"}} alt={b.permaLink} src={b.posterPicture} />
                    <Card.Body>
                        <Card.Title>{b.title.substring(0,50)}...</Card.Title>
                        <Card.Text>{b.description.substring(0,100)}...</Card.Text>
                        <Link to={`/${b.coursePermaLink}/${b.subjectPermaLink}/${b.permaLink}`} style={{position: "absolute", bottom: "10px", right: "25px"}}>Read More</Link>
                    </Card.Body>
                </Card>
            );
        });
        return (
            <div className="blogsContainer container">
                <h1>{_.startCase(blogs[0].subject.name)}</h1>
                <div className="row justify-content-lg-between justify-content-sm-center justify-content-center">
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
