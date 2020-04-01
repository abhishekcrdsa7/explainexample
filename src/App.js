import React, {Component} from 'react';
import MainNavbar from "./components/MainNavbar/MainNavbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Blog from "./components/Blog/Blog";
import constants from "./Constants";
import {Spinner} from "react-bootstrap";
import {Helmet} from "react-helmet";

class App extends Component {
    render() {
        if(constants.serverURL === "") {
            return (
                <div>
                    <Helmet>
                        <title>Mechanical Eng and Computer Science and Eng</title>
                        <meta name="description" content="An engaging, well written, uncomplicated and accurate source of knowledge in Mechanical Engineering and Computer Science and Engineering"/>
                    </Helmet>
                    <Spinner animation={"border"}/>
                </div>
            )
        }
        return (
            <div className="App">
                <Helmet>
                    <title>Mechanical Eng and Computer Science and Eng</title>
                    <meta name="description" content="An engaging, well written, uncomplicated and accurate source of knowledge in Mechanical Engineering and Computer Science and Engineering"/>
                </Helmet>
                <BrowserRouter>
                    <MainNavbar/>
                    <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/:course/:subject" component={Blog}/>
                    <Route exact path="/:course/:subject/:blog" component={Blog}/>
                    <Redirect to={"/"} from="*"/>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
