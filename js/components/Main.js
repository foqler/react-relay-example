import React from "react";
import Relay from "react-relay";
import News from "./News";

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.setVariables = (vars) => {
      this.state = vars;
      this.props.relay.setVariables(vars);
    }
  }

  state = {
    sort: false,
  }

  render() {
    let content = this.props.store.news.edges.map(edge => {
      return <News key={edge.node.id} news={edge.node} />;
    });
    return (
      <div>
        <button onClick={() => this.setVariables({sort: !this.state.sort})}> Change sort </button>
        <ul>
          {content}
        </ul>
      </div>
    );
  }
}

Main = Relay.createContainer(Main, {
  initialVariables: {
    sort: false
  },
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        id,
        news(first: 100, sort: $sort) {
          edges {
            node {
              id,
              ${News.getFragment('news')}
            }
          }
        }
      }
    `
  }
});

export default Main;
