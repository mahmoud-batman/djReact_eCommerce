import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { Card, Icon, Grid, Button, Rating, Loader } from "semantic-ui-react";

import { Link } from "react-router-dom";

import { productListURL } from "../constants";
import { addToCart } from "../store/actions/cart";

class ProductList extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(productListURL)
      .then((res) => this.setState({ data: res.data, loading: false }))
      .catch((error) => console.log(error));
  }

  handleAddToCart(uuid) {
    this.props.addToCart(uuid);
  }

  render() {
    const { loading, data } = this.state;
    return (
      <>
        {loading ? (
          <Loader size="big" active inline="centered">
            Loading
          </Loader>
        ) : (
          <Grid relaxed container stackable columns={4}>
            {data.map((item, i) => (
              <Grid.Column key={i}>
                <Card>
                  <Link to={`/products/` + item.id}>
                    <div className="ui fluid image">
                      <div className="ui ribbon label blue">
                        <i aria-hidden="true" className="dollar icon" />
                        {item.discount_price ? item.discount_price : item.price}
                      </div>
                      {item.discount_price && (
                        <div className="ui yellow right ribbon label">
                          On Sale
                        </div>
                      )}

                      <img
                        src={item.image}
                        // style={{ width: "100vh", height: "50vh" }}
                      />
                    </div>{" "}
                  </Link>{" "}
                  <Card.Content>
                    <Card.Header>{item.title}</Card.Header>

                    <Card.Meta> {item.category}</Card.Meta>
                    <Card.Meta>
                      <Rating
                        maxRating={5}
                        defaultRating={item.rate}
                        icon="star"
                        size="mini"
                        onClick={(_) => console.log()}
                      />{" "}
                      <div className="ui tag label green">Best Seller </div>{" "}
                    </Card.Meta>
                    <Card.Description>
                      {item.description.slice(0, 50)}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <Button
                      fluid
                      color="blue"
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={() => this.handleAddToCart(item.id)}
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button>
                  </Card.Content>
                </Card>
              </Grid.Column>
            ))}
          </Grid>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // refreshCart: () => dispatch(fetchCart()),
    addToCart: (uuid) => dispatch(addToCart(uuid)),
  };
};

export default connect(null, mapDispatchToProps)(ProductList);
