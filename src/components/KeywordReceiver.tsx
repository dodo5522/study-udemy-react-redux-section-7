import * as React from 'react';

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

interface KeywordReceiverProps {
  updateKeyword(keyword: any): void;
}

export default class KeywordReceiver extends React.Component<KeywordReceiverProps, any> {
  public state = { keyword: String };

  constructor(public props: KeywordReceiverProps) {
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
    event.preventDefault();
  }
  
  private handleEventOfTextKeyword = (event: any) => {
    this.setState({ keyword: event.target.value });
  }
}
