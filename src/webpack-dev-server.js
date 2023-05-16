/**
 * webpack-dev-server entry point for debugging.
 * This file is not bundled with the library during the build process.
 */
import { RemoteComponent } from "@paciolan/remote-component";
import ReactDOM from "react-dom";
import React from "react";

import LocalComponent from "./apps/audio-player";
const comp = "audio-player";

const url = process.env.NODE_ENV === "development"
  ? `/dist/${comp}.js`
  : `./apps/${comp}.js`;

const node = document.getElementById("app");

const Component = props =>
  process.env.NODE_ENV === "development"
    ? <LocalComponent {...props} />
    : <RemoteComponent url={url} {...props} />; // prettier-ignore

const App = () => (
  <>
    <Component name="moon"/>
  </>
);

ReactDOM.render(<App />, node);
