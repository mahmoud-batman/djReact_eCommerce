import React, { Component } from "react";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";

import { withRouter } from "react-router-dom";

import CustomLayout from "./containers/Layout";
import Routes from "./routes";
import { connect } from "react-redux";
import { checkAuth } from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuth();
  }
  render() {
    return (
      <div>
        <CustomLayout {...this.props}>
          <Routes />
        </CustomLayout>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.AuthReducer.user !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onCheckAuth: () => dispatch(checkAuth()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
