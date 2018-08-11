import * as React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import * as parser from 'xml-js';

import './index.css';

// const sizeIds = 'mstzb';
// const sizeConfig = {
//   s: 'small square 75x75',
//   q: 'large square 150x150',
//   t: 'thumbnail, 100 on longest side',
//   m: 'small, 240 on longest side',
//   n: 'small, 320 on longest side',
//   '-': 'medium, 500 on longest side',
//   z: 'medium 640, 640 on longest side',
//   c: 'medium 800, 800 on longest side',
//   b: 'large, 1024 on longest side'
// };

const getApiFlickrPhotosSearch = (keyword: String) => {
  const apiKey = '26e63ab8d2aa9c5f19f569c980d892bb';
  const method = 'flickr.photos.search';
  return `https://api.flickr.com/services/rest/?method=${method}&api_key=${apiKey}&tags=${keyword}`;
};

interface PhotoSearcherProps {
  updateKeyword(keyword: any): void;
}

class PhotoSearcher extends React.Component<PhotoSearcherProps, any> {
  public state = { keyword: String };

  constructor(public props: PhotoSearcherProps) {
    super(props);
  }
  
  public render() {
    return (
      <form onSubmit={this.handleEventOfSubmit}>
      <input type="text" onChange={this.handleEventOfTextKeyword} />
      <input type="submit" value="検索！" />
    </form>);
  }

  private handleEventOfSubmit = (event: any) => {
    this.props.updateKeyword(this.state.keyword);
    console.log(this.state.keyword);
    event.preventDefault();
  }
  
  private handleEventOfTextKeyword = (event: any) => {
    this.setState({ keyword: event.target.value });
  }
}

class ListImages extends React.Component<any, any> {
  constructor(public props: any) {
    super(props);
  }

  public render() {
    return (
      <ul className="listNoPoint" />);
  }
}

class PhotoTiler extends React.Component<any, any> {
  public state = {
    keyword: String,
    imageList: []
  };

  constructor(props: any) {
    super(props);
  }

  public render() {
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

  private updateKeyword = (keyword: String) => {
    axios.get(getApiFlickrPhotosSearch(keyword))
    .then(res => {
      const data = parser.xml2js(res.data); 
      const urls = data['elements'][0].elements[0].elements.map((e: Element) => {
        const id = e.attributes['id'];
        const farm = e.attributes['farm'];
        const server = e.attributes['server'];
        const secret = e.attributes['secret'];
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
}

render(<PhotoTiler />, document.getElementById('root'));
