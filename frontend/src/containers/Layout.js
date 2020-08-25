import React, { Component } from "react";
import { Layout, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store/actions/auth";
import logo from "../logo.png";
import avatar from "../elliot.jpg";
import { Icon, Dropdown, Input } from "semantic-ui-react";
const { Content, Footer } = Layout;
const { Text } = Typography;

class CustomLayout extends Component {
  render() {
    const { user, isAuthenticated } = this.props;

    return (
      <div>
        <Layout className="layout">
          <div class="ui inverted menu">
            <div class="item">
              <NavLink to="/">
                <img src={logo} alt="logo" style={{ height: "3rem" }} />
              </NavLink>
            </div>
            <div class="active item">
              <NavLink to="/products">Products</NavLink>
            </div>
            <div class="right menu">
              {isAuthenticated ? (
                <>
                  <div class="item ">
                    <NavLink to="/">
                      <div class="ui blue circular label">2</div>
                      <Icon circular name="cart plus" />
                    </NavLink>
                  </div>
                  <div class="item">
                    <div>
                      <NavLink to="/">
                        <div class="ui avatar right spaced  image">
                          <img src={avatar} />
                        </div>
                        <Text code style={{ color: "lightgrey" }}>
                          {user}
                        </Text>
                      </NavLink>
                    </div>
                  </div>
                  <NavLink
                    class="item"
                    to="/"
                    onClick={(_) => this.props.logout()}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <div class="item">
                  <NavLink to="/login/">Login</NavLink>
                </div>
              )}
            </div>
          </div>

          <Content style={{ padding: "0 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.AuthReducer.user,
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomLayout);
