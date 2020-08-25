import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { productDetailURL } from "../constants";

import {
  Button,
  Card,
  Container,
  // Dimmer,
  // Form,
  Grid,
  Header,
  Icon,
  // Image,
  // Item,
  Label,
  // Loader,
  Message,
  // Segment,
  // Select,
  // Divider,
} from "semantic-ui-react";

class ProductDetail extends React.Component {
  state = {
    loading: false,
    error: null,
    formVisible: false,
    data: [],
    formData: {},
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    axios
      .get(productDetailURL(params.slug))
      .then((res) => this.setState({ data: res.data }))
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { data, error, formData, formVisible, loading } = this.state;
    const item = data;
    return (
      <Container>
        {/* {error && (
          <Message
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )} */}
        {/* {loading && (
          <Segment>
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
            <Image src="/images/wireframe/short-paragraph.png" />
          </Segment>
        )} */}
        <Grid columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Card
                fluid
                image={item.image}
                header={item.title}
                meta={
                  <React.Fragment>
                    {item.category}
                    {item.discount_price && (
                      <Label
                        color={
                          item.label === "primary"
                            ? "blue"
                            : item.label === "secondary"
                            ? "green"
                            : "olive"
                        }
                      >
                        {item.label}
                      </Label>
                    )}
                  </React.Fragment>
                }
                description={item.description}
                extra={
                  <React.Fragment>
                    <Button
                      fluid
                      color="yellow"
                      floated="right"
                      icon
                      labelPosition="right"
                      onClick={this.handleToggleForm}
                    >
                      Add to cart
                      <Icon name="cart plus" />
                    </Button>
                  </React.Fragment>
                }
              />
            </Grid.Column>
            <Grid.Column>
              <Header as="h2">Try different variations</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    );
  }
}

export default ProductDetail;
