import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {ListGroup, Spinner} from "react-bootstrap";
import {slide as Menu} from "react-burger-menu";
import axios from "axios";
import {Helmet} from "react-helmet";
import constants from "../../Constants";
import "./Blog.css";
import BlogPageContainer from "../BlogPageContainer/BlogPageContainer";

class Blog extends Component {
    constructor(props) {
        super(props);
        this.blogContentRef = React.createRef();
    }

    state={
        blogsList: [],
        blogContent: "",
        selectedBlogIndex: -1,
        error: ""
    };

    componentDidMount() {
        if(this.state.blogsList.length <= 0) {
            const coursePermaLink = this.props.match.params.course;
            const subjectPermaLink = this.props.match.params.subject;
            const URL = `${constants.serverURL}/${coursePermaLink}/${subjectPermaLink}/blog`;
            axios.get(URL)
                .then(data => {
                    if(!this.props.match.params.blog) {
                        if(data.data && data.data.length <= 0) {
                            this.setState({error: "Oops! Something went wrong..."})
                        }
                        this.setState({
                            blogsList: data.data,
                            blogContent: data.data[0].content,
                            selectedBlogIndex: 0
                        }, () => {
                            this.props.history.replace(`/${coursePermaLink}/${subjectPermaLink}/${data.data[0].permaLink}`);
                        });

                    } else {
                        let blog = data.data.filter(b => {
                            return b.permaLink === this.props.match.params.blog;
                        });
                        if(!blog[0]) {
                            this.setState({error: "Oops! Something went wrong..."});
                        } else {
                            this.setState({ blogContent: blog.content, selectedBlogIndex: blog.blogNumber - 1});
                        }
                        this.setState({
                            blogsList: data.data,
                            blogContent: blog[0].content,
                            selectedBlogIndex: blog[0].blogNumber - 1
                        })
                    }
                })
                .catch(console.log)
        }
    }

    generateBlogsList = () => {
        return this.state.blogsList.map((b, i) => {
            if(this.state.selectedBlogIndex === i) {
                return <ListGroup.Item className="blogListItem" style={{borderRadius: 0}} key={b._id} as="li" active>{b.title}</ListGroup.Item>;
            }
            return <ListGroup.Item
                key={b._id}
                className="blogListItem"
                style={{borderRadius: 0}}
                as="li"
                onClick={() => {
                    this.setState({selectedBlogIndex: i, blogContent: this.state.blogsList[i].content});
                    this.props.history.push(`./${this.state.blogsList[i].permaLink}`);
                }}
            >{b.title}</ListGroup.Item>;
        });
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.blogContent();
        if(this.state.blogsList.length > 0) {
            let selectedBlog = this.state.blogsList[0];
            if(this.props.match.params.blog && (this.props.match.params.blog !== this.state.blogsList[this.state.selectedBlogIndex].permaLink)) {
                selectedBlog = this.state.blogsList.filter(b => {
                    return b.permaLink === this.props.match.params.blog;
                })[0];
                if(!selectedBlog) {
                    this.setState({error: "Oops! Something went wrong..."});
                } else {
                    this.setState({ blogContent: selectedBlog.content, selectedBlogIndex: selectedBlog.blogNumber - 1});
                }
            }
        }

    }

    blogContent = () => {
        if(this.blogContentRef.current) {
            this.blogContentRef.current.innerHTML = this.state.blogContent;
        }
    };

    render() {
        if(!this.state.error && this.state.blogsList && this.state.blogsList.length > 0) {
            return (
                <div style={{marginBottom: "50px"}}>
                    <Helmet>
                        <title>{this.state.blogsList[this.state.selectedBlogIndex].title}</title>
                        <meta name="description" content={this.state.blogsList[this.state.selectedBlogIndex].description}/>
                    </Helmet>
                    <div style={{padding: 0}}>
                        <Menu noOverlay>
                            <ListGroup>
                                {this.generateBlogsList()}
                            </ListGroup>
                        </Menu>
                    </div>
                    <div className="container blogContent col-lg-5" ref={this.blogContentRef} />
                    <div>
                        <BlogPageContainer blogs={this.state.blogsList} currentBlogIndex={this.state.selectedBlogIndex} history={this.props.history}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{marginBottom: "50px"}}>
                    {
                        this.state.error ? <h4 style={{textAlign: "center"}}>{this.state.error}</h4> : null
                    }
                    <Spinner animation="border"/>
                </div>
            );
        }
    }
}

export default withRouter(Blog);
