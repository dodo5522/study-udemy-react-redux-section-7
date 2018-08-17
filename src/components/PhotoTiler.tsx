import * as React from 'react';

interface ListImagesProps {
  imageList: String[];
}

export default class PhotoTiler extends React.Component<ListImagesProps, any> {
  constructor(public props: ListImagesProps) {
    super(props);
  }

  public render() {
    let listItems = this.props.imageList.map((img: string) => {
      return (<li key={img.split('/').splice(-1).pop()}><img src={img} /></li>);
    });

    return (
      <ul className="listNoPoint">
        {listItems}
      </ul>);
  }
}