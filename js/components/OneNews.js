import React from "react";
import Relay from "react-relay";
import News from "./News";

class OneNews extends React.Component {
  render() {
    const {oneNews} = this.props.store;

    return (
      <div>
        <News news={oneNews} />
      </div>
    );
  }
}

OneNews = Relay.createContainer(OneNews, {
  initialVariables: {
    id: false
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        oneNews(id: $id) {
          ${News.getFragment('news')}
        }
      }
    `
  }
});

export default OneNews;
