import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import _ from "lodash";
import {Jumbotron, ListGroup, Badge, Collapse, Spinner} from "react-bootstrap";
import "./Jumbo.css";

class Jumbo extends Component {
    state= {
        subjects: [],
        heading: "",
        showMore: false
    };

    listItemClick = (item) => {
        this.props.history.push({
            pathname: `/${_.kebabCase(item.course.permaLink)}/${_.kebabCase(item.permaLink)}`
        })
    };

    subjectList = (start, end) => {
        if(this.state.subjects == null) return [];
        let subjs = [];
        if(_.isUndefined(end) || end > this.state.subjects.length) {
            let subjects = this.state.subjects;
            for(let i = start; i < subjects.length; i++) {
                subjs.push(
                    <ListGroup.Item
                        className="subjectName"
                        key={i}
                        style={{cursor: "pointer"}}
                        onClick={() => {this.listItemClick(subjects[i])}}
                    >{_.startCase(subjects[i].name)}
                    </ListGroup.Item>
                );
            }
            return subjs;
        } else {
            let subjects = this.state.subjects;
            for(let i = start; i < end; i++) {
                subjs.push(
                    <ListGroup.Item
                        className="subjectName"
                        key={i}
                        style={{cursor: "pointer"}}
                        onClick={() => {this.listItemClick(subjects[i])}}
                    >{_.startCase(subjects[i].name)}
                    </ListGroup.Item>);
            }
            return subjs;
        }
    };

    componentDidMount() {
        this.setState({subjects: this.props.subjects, heading: this.props.heading});
    }

    jumboContainer = () => {
        return (
            <div className="jumboContainer">
                <Jumbotron style={{paddingTop: "10px", paddingBottom: "10px"}}>
                    <h3>{_.startCase(this.state.heading)}</h3>
                    <ListGroup>
                        {this.subjectList(0, 3)}
                        <Collapse in={this.state.showMore}>
                            <span>
                                {this.subjectList(3)}
                            </span>
                        </Collapse>
                    </ListGroup>
                    {
                        this.state.subjects.length > 3 ? (
                            <div id="showMore">
                                <h5>
                                    <Badge
                                        variant="secondary"
                                        style={{cursor: "pointer"}}
                                        onClick={() => {this.setState({showMore: !this.state.showMore})}}>
                                        {this.state.showMore ? "Show Less" : "Show More"}
                                    </Badge>
                                </h5>
                            </div>
                        ) : null
                    }
                </Jumbotron>
            </div>
        );
    };

    render() {
        if(this.state.subjects && this.state.subjects.length > 0) {
            return this.jumboContainer();
        } else {
            return (
                <Spinner animation="border" />
            );
        }
    }
}

export default withRouter(Jumbo);
