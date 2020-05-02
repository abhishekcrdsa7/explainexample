import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {FormControl, InputGroup, Button} from "react-bootstrap";

class SearchBar extends Component{
    state={
        s: ""
    };

    submitSearch = () => {
        this.props.history.push({
            pathname: "/",
            search: `?s=${this.state.s}`
        });
    };

    render() {
        return (
            <div className="container col-lg-5">
                <InputGroup style={{padding: "20px 0"}}>
                    <FormControl
                        placeholder="Try searching 'Best AWS Courses'"
                        required={true}
                        onChange={(e) => {
                            this.setState({s: e.target.value});
                        }}
                        value={this.state.s}
                    />
                    <InputGroup.Append>
                        <Button variant="primary" onClick={(e) => {
                            this.submitSearch()
                        }}>Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
        );
    }
}

export default withRouter(SearchBar);
