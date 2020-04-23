import React, {Component} from "react";
import {Card} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./BlogPageContainer.css";
import {Link} from "react-router-dom";

class BlogPageContainer extends Component {

    carouselItems = () => {
        if(!this.props.blogs && this.props.blogs.length <= 0) {
            return [];
        }
        let a = [];
            this.props.blogs.forEach(b => {
            if(!(this.props.currentBlogIndex === b.blogNumber - 1)) {
                a.push((
                    <Card key={b._id} style={{ width: '250px',
                        borderRadius: "5px",
                        border: "0px",
                        padding: "unset",
                        margin: "5px",
                        boxShadow: "0px 0px 11px -1px rgba(43,43,43,0.5)"}}>
                        <Card.Img variant="top" style={{width: "250px", height: "250px"}} alt={b.permaLink} src={b.posterPicture} />
                        <Card.Body>
                            <Card.Title>{b.title.substring(0,50)}...</Card.Title>
                            <Card.Text>{b.description.substring(0,100)}...</Card.Text>
                            <Link to={`/${b.coursePermaLink}/${b.subjectPermaLink}/${b.permaLink}`} style={{position: "absolute", bottom: "10px", right: "25px"}} onClick={() => {
                             window.scrollTo(0, 0)
                            }}>Read More</Link>
                        </Card.Body>
                </Card>
                ));
            }
        });
        return a;
    };

    render() {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 2,
                slidesToSlide: 3, // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2, // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1, // optional, default to 1.
            },
        };
        return (
            <div>
                <h3 style={{textAlign: "center"}}>Posts you may like</h3>
                <Carousel
                    swipeable={false}
                    responsive={responsive}
                    keyBoardControl={true}
                    containerClass="carousel-container container"
                    itemClass="carousel-item-padding-40-px"
                >
                    {this.carouselItems()}
                </Carousel>
            </div>
        );
    }
}

export default BlogPageContainer;
