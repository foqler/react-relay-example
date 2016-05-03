import React from "react";
import Relay from "react-relay";
import {Link} from 'react-router';

class News extends React.Component {

  render() {
    let {news} = this.props;
    return (
      <li style={{margin: '10px'}}>
        <Link to={`/user/${news.id}`}>{news.id}</Link>
        <span style={{
          margin: '10px'
        }}>{news.type}: {news.content}</span>
      </li>
    );
  }
}

News = Relay.createContainer(News, {
  fragments: {
    news: () => Relay.QL`
      fragment on News {
        id,
        title,
        type,
        content
      }
    `
  }
});

export default News;
