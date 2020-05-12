import React from 'react';
import {hydrate, render} from 'react-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// ReactDOM.render(<App />, document.getElementById('root'));
const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
    hydrate(<App />, rootElement);
} else {
    render(<App />, rootElement);
}




