import React, {Component} from "react";
import {Card} from "react-bootstrap";

class BlogPageContainer extends Component {

    carouselItems = () => {
        if(!this.props.blogs && this.props.blogs.length <= 0) {
            return [];
        }
        let a = [];
            this.props.blogs.forEach(b => {
            if(this.props.currentBlogIndex !== b.blogNumber - 1 && b.publish) {
                a.push((
                    <div className="col-lg-12">
                        <Card className="mt-2" key={b._id} style={{
                            borderRadius: "5px",
                            padding: "unset"
                            }}>
                            <Card.Body>
                                <Card.Title>{b.title.substring(0,70)}...</Card.Title>
                                <Card.Text>{b.description.substring(0,100)}...</Card.Text>
                                <a href={`/${b.coursePermaLink}/${b.subjectPermaLink}/${b.permaLink}`} style={{position: "absolute", bottom: "10px", right: "25px"}}>Read More</a>
                            </Card.Body>
                        </Card>
                    </div>
                ));
            }
        });
        return a;
    };

    render() {
        const blogsList = this.carouselItems();
        if(blogsList && blogsList.length > 0) {
            return (
                <div className="col-lg-5 col-md-8">
                    <h3 className="text-center">Meanwhile, checkout these posts</h3>
                    <div className="row">
                        {blogsList}
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default BlogPageContainer;
