import * as React from "react";
import { render } from "react-dom";
import Hello from "./Hello";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const sizeIds = "mstzb";

const sizeConfig = {
  s: "small square 75x75",
  q: "large square 150x150",
  t: "thumbnail, 100 on longest side",
  m: "small, 240 on longest side",
  n: "small, 320 on longest side",
  "-": "medium, 500 on longest side",
  z: "medium 640, 640 on longest side",
  c: "medium 800, 800 on longest side",
  b: "large, 1024 on longest side"
};

const farmId;
const serverId;
const id;
const secret;
const size;
const url = `https://farm${farmId}.staticflickr.com/${serverId}/${id}_${secret}_${size}.jpg`;

class PhotoTiler extends React.Component {
  constructor(props) {
    super(props);
  }

  private render() {
    return (
      <div>
        <h1>aaa</h1>
      </div>
    );
  }
}

render(<PhotoTiler />, document.getElementById("root"));
