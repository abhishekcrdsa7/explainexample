import React, {Component} from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./HeroContainer.css";
class HeroContainer extends Component {
    render() {
        return (
            <div className="heroContainer" style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
            }}>
                 <div>
                    <p style={{
                        textAlign: "center",
                        fontSize: "2rem",
                        fontWeight: "600"
                    }}>Amazon Web Services Made Simple</p>
                    <SearchBar/>
                </div>
            </div>
        );
    }
}

export default HeroContainer;
