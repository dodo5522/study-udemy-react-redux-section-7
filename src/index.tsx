import * as React from "react";
import { render } from "react-dom";
import * as axios from 'axios';
import * as parser from 'xml-js';
import Hello from "./Hello";

import './index.css';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

interface IFlickrPhotosSearchResult = {
  photoId: Number;
  owner: String;
  secret: String;
  serverId: Number;
  farm: Number;
  title: String;
  ispublic: Boolean;
  isfriend: Boolean;
  isfamily: Boolean;
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

const getApiFlickrPhotosSearch = (keyword: String) => {
  const apiKey = '26e63ab8d2aa9c5f19f569c980d892bb';
  const method = 'flickr.photos.search';
  return `https://api.flickr.com/services/rest/?method=${method}&api_key=${apiKey}&tags=${keyword}`;
}

class PhotoSearcher extends React.Component {
  private state = { keyword: String };
  private updaterKeyword: undefined | (key: String) => void = undefined;

  constructor(props) {
    super(props);
    this.updaterKeyword = props.updateKeyword;
  }

  private handleEventOfSubmit = (event) => {
    this.updaterKeyword(this.state.keyword);
    event.preventDefault();
  }
  
  private handleEventOfTextKeyword = (event) => {
    this.setState({ keyword: event.target.value });
  }
  
  private render() {
    return (<form onSubmit={this.handleEventOfSubmit}>
      <input type="text" onChange={this.handleEventOfTextKeyword} />
      <input type="submit" value="検索！" />
    </form>);
  }
}

class ListImages extends React.Component {
  constructor(props) {
    super(props);
    this.images = props.imageList;
  }

  private render() {
    return <ul className='listNoPoint'>
      </ul>;
  }
}

class PhotoTiler extends React.Component {
  private state = {
    keyword: String,
    imageList: []
  };

  constructor(props) {
    super(props);
  }

  private updateKeyword = (keyword: String) => {
    axios.get(getApiFlickrPhotosSearch(keyword))
    .then(res => {
      const data = parser.xml2js(res.data); 
      const urls = data.elements[0].elements[0].elements.map((e) => {
        const { id, farm, server, secret } = e.attributes;
        const size = 'b';
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
      });

      this.setState({
        keyword: keyword,
        imageList: urls
      });
    })
    .catch(error => {
      console.log(JSON.stringify(error));
    });
  }

  private render() {
    return (
      <div>
        <h1>Photo search app</h1>
        <hr />
        <PhotoSearcher updateKeyword={this.updateKeyword}/>
        <hr />
        <ListImages imageList={this.state.imageList}/>
      </div>
    );
  }
}

render(<PhotoTiler />, document.getElementById("root"));
