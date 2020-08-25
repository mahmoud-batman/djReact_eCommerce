import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ProductList from "./containers/ProductList";
import ProductDetail from "./containers/ProductDetails";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/products/:slug" component={ProductDetail} />
      <Route exact path="/products" component={ProductList} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
    </Switch>
  );
}
