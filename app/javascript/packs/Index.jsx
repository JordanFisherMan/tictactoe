import React from "react";
import ReactDOM from 'react-dom'
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import App from "../components/App";
import Game from "../components/Game";

document.addEventListener("DOMContentLoaded", function(event) {
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
})