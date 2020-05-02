import React, {Component} from 'react';
import MainNavbar from "./components/MainNavbar/MainNavbar";
import Home from "./components/Home/Home";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Blog from "./components/Blog/Blog";
import constants from "./Constants";
import {Spinner} from "react-bootstrap";
import {Helmet} from "react-helmet";
import { createBrowserHistory } from 'history';
import ReactGA from "react-ga";
import About from "./components/About/about";
import NoIndex from "./components/NoIndex";

const trackingId = "UA-161844295-1";
ReactGA.initialize(trackingId);
const history = createBrowserHistory();
history.listen(location => {
    ReactGA.set({page: location.pathname});
    ReactGA.pageview(location.pathname  + location.search);
});

class App extends Component {

    redirectRoutes = () => {
      let routes = [
          <Route key={0} exact path="/computers/golang/golang-slice-remove-element-by-value-all-in-one-guide" component={NoIndex}/>,
          <Route key={1} exact path="/golang/golang-slice-remove-element-by-value-all-in-one-guide" component={NoIndex}/>,
          <Route key={2} exact path="/mech-eng/thermodynamics/basic-thermodynamics-mechanical-engineers-point-of-view" component={NoIndex}/>
      ];
      return routes;
    };

    render() {
        if(constants.serverURL === "") {
            return (
                <div>
                    <Helmet>
                        <title>Explain Example</title>
                        <meta name="description" content="The mission of this website is to make AWS easy to learn by providing various resources and solutions to all the people around the world whose goals align with the ambitions of this website"/>
                    </Helmet>
                    <Spinner animation={"border"}/>
                </div>
            )
        }
        return (
            <div className="App">
                <Helmet>
                    <title>Explain Example</title>
                    <meta name="description" content="The mission of this website is to make AWS easy to learn by providing various resources and solutions to all the people around the world whose goals align with the ambitions of this website"/>
                </Helmet>
                <BrowserRouter history={history}>
                    <MainNavbar/>
                    <Switch>
                        {this.redirectRoutes()}
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
