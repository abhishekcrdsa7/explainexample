import React, { Component } from "react";
import {withRouter} from "react-router-dom";
import {ListGroup, Spinner, Button} from "react-bootstrap";
import {slide as Menu} from "react-burger-menu";
import axios from "axios";
import {Helmet} from "react-helmet";
import constants from "../../Constants";
import "./Blog.css";
import BlogPageContainer from "../BlogPageContainer/BlogPageContainer";
import SearchBar from "../SearchBar/SearchBar";
import Subscribe from "../Subscribe/Subscribe";
import Signoff from "../Signoff/Signoff";
import ReactGA from "react-ga";
import {
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";

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
                            this.setState({
                                blogsList: data.data,
                                blogContent: blog[0].content,
                                selectedBlogIndex: blog[0].blogNumber - 1
                            });
                        }
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
            if(!b.publish) {
                return null;
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
            ReactGA.pageview(window.location.pathname  + window.location.search);
            this.blogContentRef.current.innerHTML = this.state.blogContent;
        }
    };

    popularPosts = () => {
        let i = Math.floor(Math.random() * this.state.blogsList.length - 5);
        if(i < 0) {
            i = 0;
        }
        let arr = [];
        for(let j = i; j < i+5 && j < this.state.blogsList.length; j++) {
            if(j === this.state.selectedBlogIndex || !this.state.blogsList[j].publish) continue;
            let b = this.state.blogsList[j];
            arr.push((
                <div className="p-2 m-2 d-flex" style={{border: "1px solid #ddd", height: "6rem", borderRadius: "5px" }}>
                    <img src={b.posterPicture} alt={b.title} style={{height: "5rem", width: "5rem", marginRight: "5px"}}/>
                    <a className="d-block mb-2" target="_blank" href={`/${b.coursePermaLink}/${b.subjectPermaLink}/${b.permaLink}`}>{b.title.substring(0, 57)}...</a>
                </div>
            ));
        }
        return (
            <div className="p-2">
                {arr}
            </div>
        );
    };

    render() {
        if(!this.state.error && this.state.blogsList && this.state.blogsList.length > 0) {
            let b = this.state.blogsList[this.state.selectedBlogIndex];
            let shareURL = `${constants.selfURL}/${b.coursePermaLink}/${b.subjectPermaLink}/${b.permaLink}`;
            return (
                <div style={{margin: "50px 0"}}>
                    <Helmet>
                        <title>{this.state.blogsList[this.state.selectedBlogIndex].title}</title>
                        <meta name="description" content={this.state.blogsList[this.state.selectedBlogIndex].description}/>
                    </Helmet>
                    <div style={{padding: 0}}>
                        <Menu
                            noOverlay
                            customBurgerIcon={
                                <Button
                                    size="sm"
                                    variant="dark"
                                >
                                    Posts
                                </Button>
                            }
                        >
                            <ListGroup
                                style={{
                                    height: "80vh",
                                    overflowY: "scroll"
                                }}
                            >
                                {this.generateBlogsList()}
                            </ListGroup>
                        </Menu>
                    </div>
                    <SearchBar/>
                    <div className="d-flex">
                            <div className="d-none d-md-block col-md-2">
                                <div className="position-absolute" style={{top: "35%"}}>
                                    <h5 className="w-100 text-center">Share this post</h5>
                                    <div>
                                        <LinkedinShareButton url={shareURL}>
                                            <LinkedinIcon size={50} round={true}/>
                                        </LinkedinShareButton>
                                        <RedditShareButton url={shareURL}>
                                            <RedditIcon size={50} round={true}/>
                                        </RedditShareButton>
                                        <TwitterShareButton url={shareURL}>
                                            <TwitterIcon size={50} round={true}/>
                                        </TwitterShareButton>
                                    </div>
                                </div>
                            </div>
                        <div className="offset-md-1 col-lg-5 col-md-8 overflow-auto pt-2">
                            <Signoff />
                            <div className="mt-2" ref={this.blogContentRef}/>
                            <div>
                                <h5>Share this post</h5>
                                <div>
                                    <LinkedinShareButton url={shareURL}>
                                        <LinkedinIcon size={32} round={true}/>
                                    </LinkedinShareButton>
                                    <RedditShareButton url={shareURL}>
                                        <RedditIcon size={32} round={true}/>
                                    </RedditShareButton>
                                    <TwitterShareButton url={shareURL}>
                                        <TwitterIcon size={32} round={true}/>
                                    </TwitterShareButton>
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-lg-block col-lg-4 pt-2">
                            <div className="position-absolute" style={{top: "40%"}}>
                                {
                                    this.state.blogsList.length > 1 ?
                                        (
                                            <div className="p-1"  style={{ marginBottom: "4rem"}}>
                                                <h5 className="text-center">Blog Posts Worth Your Attention</h5>
                                                {this.popularPosts()}
                                            </div>
                                        ) : null
                                }
                                <h5 className="text-center">Want to gain more knowledge for free?</h5>
                                <Subscribe />
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h3 className="text-center">Want to gain more knowledge for free?</h3>
                        <div className="p-1">
                            <Subscribe />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center">
                        <BlogPageContainer blogs={this.state.blogsList} currentBlogIndex={this.state.selectedBlogIndex} history={this.props.history}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="mb-5">
                    <SearchBar/>
                    {
                        this.state.error ? <h4 className="text-center">{this.state.error}</h4> : null
                    }
                    <Spinner animation="border"/>
                </div>
            );
        }
    }
}

export default withRouter(Blog);
