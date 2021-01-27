import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

import GoogleMaps from "./GoogleMaps/";
import Contact from "./Contact";

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "React"
    };
  }

  render() {
    return (
      <div>
        <Contact />
        <Hello name={this.state.name} />
        <p>Start editing to see some magic happen :)</p>
        <GoogleMaps />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
