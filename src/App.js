import React, {Component} from 'react';
import MainNavbar from "./components/MainNavbar/MainNavbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Blog from "./components/Blog/Blog";
import constants from "./Constants";
import {Spinner} from "react-bootstrap";
import {Helmet} from "react-helmet";
import SearchBar from "./components/SearchBar/SearchBar";
import About from "./components/About/about";

class App extends Component {
    render() {
        if(constants.serverURL === "") {
            return (
                <div>
                    <Helmet>
                        <title>Amazon Web Services, Golang/Go and Software Development</title>
                        <meta name="description" content="This site has posts which discusses general topics and solves problems related to Amazon Web Services, Golang/Go and Software Development. Come on in!"/>
                    </Helmet>
                    <Spinner animation={"border"}/>
                </div>
            )
        }
        return (
            <div className="App">
                <Helmet>
                    <title>Amazon Web Services, Golang/Go and Software Development</title>
                    <meta name="description" content="This site has posts which discusses general topics and solves problems related to Amazon Web Services, Golang/Go and Software Development. Come on in!"/>
                </Helmet>
                <BrowserRouter>
                    <MainNavbar/>
                    <SearchBar/>
                    <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/about" component={About} />
                    <Route exact path="/:course/:subject" component={Blog}/>
                    <Route exact path="/:course/:subject/:blog" component={Blog}/>
                    <Route path="*" component={() => {
                        return (
                            <div>
                                <h1>404 Page Not Found</h1>
                            </div>
                        );
                    }}/>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
